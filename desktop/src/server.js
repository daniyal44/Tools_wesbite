/**
 * desktop/src/server.js
 * -------------------------------------------------------------
 * Local Server Lifecycle Manager for Zevylo Desktop.
 * -------------------------------------------------------------
 */

const http = require('node:http');
const { spawn } = require('node:child_process');
const path = require('node:path');

let nextProcess = null;

/** Check if local server is already running on a specific port */
function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, () => {
      resolve(true);
    });
    req.on('error', () => {
      resolve(false);
    });
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

/** Wait until the server is responsive */
async function waitForServer(port, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    const isReady = await checkPort(port);
    if (isReady) return true;
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

/** Start or attach to local Next.js server */
async function getAppUrl(isDev = false) {
  const defaultPort = 3000;
  const isAlreadyRunning = await checkPort(defaultPort);

  if (isAlreadyRunning) {
    console.log(`[Desktop] Attached to active server at http://localhost:${defaultPort}`);
    return `http://localhost:${defaultPort}`;
  }

  // If not running, spawn the next server
  const zevyloDir = path.join(__dirname, '..', '..', 'zevylo');
  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const scriptName = isDev ? 'dev' : 'start';

  console.log(`[Desktop] Starting Next.js (${scriptName}) in ${zevyloDir}...`);
  nextProcess = spawn(npmCmd, ['run', scriptName], {
    cwd: zevyloDir,
    stdio: 'inherit',
    shell: true
  });

  const ready = await waitForServer(defaultPort, 45);
  if (!ready) {
    throw new Error(`Timeout waiting for Next.js to start on port ${defaultPort}`);
  }

  return `http://localhost:${defaultPort}`;
}

function stopServer() {
  if (nextProcess) {
    try {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', nextProcess.pid, '/f', '/t']);
      } else {
        nextProcess.kill('SIGTERM');
      }
    } catch {
      // Ignore cleanup error on exit
    }
    nextProcess = null;
  }
}

module.exports = { getAppUrl, stopServer };
