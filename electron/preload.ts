import { contextBridge, ipcRenderer } from 'electron';
import Signal from './Signal';

function fetch<T>(signal: Signal, ...args: unknown[]) {
  return new Promise<T>((resolve) => {
    const channel = `${signal}:${Math.random()}`;
    ipcRenderer.once(channel, (_e, result) => {
      resolve(result);
    });
    ipcRenderer.send(signal, channel, ...args);
  });
}
// 对话
const preload = {
  fetch,
  send: (signal: Signal, ...args: unknown[]) => {
    ipcRenderer.send(signal, ...args);
  },
  on: (signal: Signal, listener: (...args: unknown[]) => void) => {
    ipcRenderer.on(signal, listener);
  },
  once: (signal: Signal, listener: (...args: unknown[]) => void) => {
    ipcRenderer.once(signal, listener);
  },
  removeAllListeners: (signal: Signal) => {
    ipcRenderer.removeAllListeners(signal);
  },
};
contextBridge.exposeInMainWorld(import.meta.env.VITE_API_KEY, preload);
export type Preload = typeof preload;
