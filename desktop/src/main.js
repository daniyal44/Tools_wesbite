/**
 * desktop/src/main.js
 * -------------------------------------------------------------
 * Main Process for Zevylo Desktop.
 * -------------------------------------------------------------
 */

const { app, BrowserWindow, ipcMain, dialog, Notification, shell } = require('electron');
const path = require('node:path');
const { buildMenu } = require('./menu');
const { createTray } = require('./tray');
const { getAppUrl, stopServer } = require('./server');

// Prevent multiple instances of the desktop application
const gotSingleInstanceLock = app.requestSingleInstanceLock();
if (!gotSingleInstanceLock) {
  app.quit();
  process.exit(0);
}

let mainWindow = null;
const isDev = process.argv.includes('--dev') || process.env.NODE_ENV === 'development';

async function createWindow() {
  const iconPath = path.join(__dirname, '..', 'assets', 'icon.ico');

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 840,
    minWidth: 960,
    minHeight: 640,
    title: 'Zevylo — 206+ In-Browser Privacy Tools',
    icon: iconPath,
    backgroundColor: '#030712', // Matches Dark Theme Gray 950
    show: false, // Prevents white flash before first paint
    webPreferences: {
      // ── SECURITY DEFAULTS (MANDATORY INVARIANTS) ──
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true,
      allowRunningInsecureContent: false,
      experimentalFeatures: false
    }
  });

  // Enable WebAssembly multi-threading headers (COOP + COEP)
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Cross-Origin-Opener-Policy': ['same-origin'],
        'Cross-Origin-Embedder-Policy': ['require-corp']
      }
    });
  });

  // Attach native application menu
  const menu = buildMenu(mainWindow);
  mainWindow.setMenu(menu);

  // Initialize System Tray
  try {
    createTray(mainWindow, iconPath);
  } catch (err) {
    console.warn('[Desktop] Tray creation skipped:', err.message);
  }

  // Graceful show on ready-to-show
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
  });

  // Load the web application
  try {
    const appUrl = await getAppUrl(isDev);
    await mainWindow.loadURL(appUrl);
  } catch (err) {
    console.error('[Desktop] Failed to load URL:', err);
    mainWindow.loadFile(path.join(__dirname, 'fallback.html')).catch(() => {});
    mainWindow.show();
  }

  // Minimize to tray instead of quitting on close (unless explicitly quitting)
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  // Open external HTTP/HTTPS links in system browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:') || url.startsWith('http:')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });
}

// Second instance focus handler
app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
  }
});

// App lifecycle
app.whenReady().then(async () => {
  setupIpcHandlers();
  await createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else if (mainWindow) {
      mainWindow.show();
    }
  });
});

app.on('before-quit', () => {
  app.isQuitting = true;
  stopServer();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ── SECURE IPC HANDLERS ──
function setupIpcHandlers() {
  // App version
  ipcMain.handle('app:get-version', () => app.getVersion());

  // System info
  ipcMain.handle('app:get-system-info', () => ({
    platform: process.platform,
    arch: process.arch,
    electronVersion: process.versions.electron,
    chromeVersion: process.versions.chrome,
    nodeVersion: process.versions.node
  }));

  // Desktop notifications
  ipcMain.handle('app:notify', (_event, { title, body }) => {
    if (Notification.isSupported()) {
      new Notification({
        title: title || 'Zevylo',
        body: body || '',
        icon: path.join(__dirname, '..', 'assets', 'icon.ico')
      }).show();
      return true;
    }
    return false;
  });

  // Native Open File Dialog
  ipcMain.handle('dialog:open-file', async (_event, options = {}) => {
    if (!mainWindow) return { canceled: true, filePaths: [] };
    return await dialog.showOpenDialog(mainWindow, {
      title: options.title || 'Select File',
      filters: options.filters || [],
      properties: options.properties || ['openFile']
    });
  });

  // Native Save File Dialog
  ipcMain.handle('dialog:save-file', async (_event, options = {}) => {
    if (!mainWindow) return { canceled: true, filePath: '' };
    return await dialog.showSaveDialog(mainWindow, {
      title: options.title || 'Save File',
      defaultPath: options.defaultPath,
      filters: options.filters || []
    });
  });

  // Safe external URL opener
  ipcMain.handle('shell:open-external', async (_event, url) => {
    if (url && (url.startsWith('https://') || url.startsWith('http://'))) {
      await shell.openExternal(url);
      return true;
    }
    return false;
  });
}
