/**
 * desktop/src/menu.js
 * -------------------------------------------------------------
 * Native Application Menu for Zevylo Desktop.
 * -------------------------------------------------------------
 */

const { Menu, shell, app } = require('electron');

function buildMenu(mainWindow) {
  const isMac = process.platform === 'darwin';

  const template = [
    // macOS App Menu
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              { role: 'about' },
              { type: 'separator' },
              { role: 'services' },
              { type: 'separator' },
              { role: 'hide' },
              { role: 'hideOthers' },
              { role: 'unhide' },
              { type: 'separator' },
              { role: 'quit' }
            ]
          }
        ]
      : []),

    // File Menu
    {
      label: '&File',
      submenu: [
        {
          label: 'Home / All Tools',
          accelerator: 'CmdOrCtrl+H',
          click: () => mainWindow?.webContents.send('desktop:navigate', '/')
        },
        {
          label: 'Search Utilities',
          accelerator: 'CmdOrCtrl+K',
          click: () => mainWindow?.webContents.send('desktop:navigate', 'search')
        },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit', label: 'E&xit' }
      ]
    },

    // Edit Menu
    {
      label: '&Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },

    // Tools Quick Jump Menu
    {
      label: '&Tools',
      submenu: [
        {
          label: '🖼️ Image Tools (34)',
          click: () => mainWindow?.webContents.send('desktop:navigate', '/image')
        },
        {
          label: '💻 Developer Utilities (27)',
          click: () => mainWindow?.webContents.send('desktop:navigate', '/developer')
        },
        {
          label: '🎥 Video & GIF Suite (17)',
          click: () => mainWindow?.webContents.send('desktop:navigate', '/video')
        },
        {
          label: '📄 PDF Document Tools (9)',
          click: () => mainWindow?.webContents.send('desktop:navigate', '/pdf')
        },
        {
          label: '🧮 Calculators & Math (19)',
          click: () => mainWindow?.webContents.send('desktop:navigate', '/calculators')
        },
        {
          label: '📝 Text & Markdown (19)',
          click: () => mainWindow?.webContents.send('desktop:navigate', '/text')
        },
        {
          label: '🤖 AI Directory & Utilities (17)',
          click: () => mainWindow?.webContents.send('desktop:navigate', '/ai-tools')
        },
        {
          label: '🎵 Audio Suite (8)',
          click: () => mainWindow?.webContents.send('desktop:navigate', '/audio')
        },
        {
          label: '📈 SEO & Webmaster (11)',
          click: () => mainWindow?.webContents.send('desktop:navigate', '/seo')
        },
        {
          label: '🔄 Converters (10)',
          click: () => mainWindow?.webContents.send('desktop:navigate', '/converters')
        },
        {
          label: '🎨 Color Tools (5)',
          click: () => mainWindow?.webContents.send('desktop:navigate', '/color')
        },
        {
          label: '⚡ Productivity (6)',
          click: () => mainWindow?.webContents.send('desktop:navigate', '/productivity')
        }
      ]
    },

    // View Menu
    {
      label: '&View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },

    // Window Menu
    {
      label: '&Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac
          ? [{ type: 'separator' }, { role: 'front' }, { type: 'separator' }, { role: 'window' }]
          : [{ role: 'close' }])
      ]
    },

    // Help Menu
    {
      label: '&Help',
      submenu: [
        {
          label: 'Official Website',
          click: async () => {
            await shell.openExternal('https://github.com/daniyal44/Tools_wesbite');
          }
        },
        {
          label: 'GitHub Repository',
          click: async () => {
            await shell.openExternal('https://github.com/daniyal44/Tools_wesbite');
          }
        },
        {
          label: 'Report an Issue',
          click: async () => {
            await shell.openExternal('https://github.com/daniyal44/Tools_wesbite/issues');
          }
        },
        { type: 'separator' },
        {
          label: 'About Zevylo Desktop',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About Zevylo Desktop',
              message: 'Zevylo Desktop v1.0.0',
              detail: 'A privacy-first, 100% in-browser utility suite featuring 206+ tools.\n\nAuthor: Muhammad Daniyal (@daniyal44)\nLicense: MIT Open Source',
              buttons: ['OK']
            });
          }
        }
      ]
    }
  ];

  return Menu.buildFromTemplate(template);
}

module.exports = { buildMenu };
