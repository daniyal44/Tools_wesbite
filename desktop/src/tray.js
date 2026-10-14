/**
 * desktop/src/tray.js
 * -------------------------------------------------------------
 * System Tray Integration for Zevylo Desktop.
 * Provides quick-launch access from the taskbar notification area.
 * -------------------------------------------------------------
 */

const { Tray, Menu, app } = require('electron');
const path = require('node:path');

let tray = null;

function createTray(mainWindow, iconPath) {
  if (tray) return tray;

  tray = new Tray(iconPath);
  tray.setToolTip('Zevylo — 206+ In-Browser Privacy Tools');

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open Zevylo',
      click: () => {
        mainWindow.show();
        mainWindow.focus();
      }
    },
    { type: 'separator' },
    {
      label: '🖼️ Image Tools',
      click: () => {
        mainWindow.show();
        mainWindow.webContents.send('desktop:navigate', '/image');
      }
    },
    {
      label: '📄 PDF Tools',
      click: () => {
        mainWindow.show();
        mainWindow.webContents.send('desktop:navigate', '/pdf');
      }
    },
    {
      label: '💻 Developer Utilities',
      click: () => {
        mainWindow.show();
        mainWindow.webContents.send('desktop:navigate', '/developer');
      }
    },
    {
      label: '🎥 Video & GIF Tools',
      click: () => {
        mainWindow.show();
        mainWindow.webContents.send('desktop:navigate', '/video');
      }
    },
    { type: 'separator' },
    {
      label: 'Quit Zevylo',
      click: () => {
        app.isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);

  // Left-click restores or minimizes window
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  return tray;
}

module.exports = { createTray };
