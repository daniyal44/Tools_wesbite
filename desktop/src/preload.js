/**
 * desktop/src/preload.js
 * -------------------------------------------------------------
 * Secure Preload Script for Zevylo Desktop.
 * Exposes a sandboxed, whitelisted API to the renderer process
 * via Electron contextBridge.
 *
 * Security Invariants:
 *  - contextIsolation: true
 *  - nodeIntegration: false
 *  - sandbox: true
 * -------------------------------------------------------------
 */

const { contextBridge, ipcRenderer } = require('electron');

// Expose safe desktop capabilities to window.zevyloDesktop
contextBridge.exposeInMainWorld('zevyloDesktop', {
  isDesktop: true,
  platform: process.platform,

  // App information
  getVersion: () => ipcRenderer.invoke('app:get-version'),
  getSystemInfo: () => ipcRenderer.invoke('app:get-system-info'),

  // Native OS notifications
  showNotification: (title, body) => {
    return ipcRenderer.invoke('app:notify', { title, body });
  },

  // Native file dialogs
  openFileDialog: (options) => {
    return ipcRenderer.invoke('dialog:open-file', options);
  },
  saveFileDialog: (options) => {
    return ipcRenderer.invoke('dialog:save-file', options);
  },

  // Open external links safely in system default browser
  openExternal: (url) => {
    return ipcRenderer.invoke('shell:open-external', url);
  },

  // Event listener for menu triggers (e.g. quick jump to category)
  onNavigate: (callback) => {
    const subscription = (_event, route) => callback(route);
    ipcRenderer.on('desktop:navigate', subscription);
    return () => ipcRenderer.removeListener('desktop:navigate', subscription);
  }
});
