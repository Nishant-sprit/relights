// Safe polyfill wrapper for window.fetch to prevent "Cannot set property fetch of #<Window> which has only a getter"
try {
  if (typeof window !== 'undefined') {
    const proto = Object.getPrototypeOf(window) || Window.prototype;
    const desc = Object.getOwnPropertyDescriptor(proto, 'fetch') || Object.getOwnPropertyDescriptor(window, 'fetch');
    let currentFetch = window.fetch ? window.fetch.bind(window) : undefined;

    if (desc && desc.configurable) {
      const target = Object.getOwnPropertyDescriptor(proto, 'fetch') ? proto : window;
      Object.defineProperty(target, 'fetch', {
        get() {
          return currentFetch;
        },
        set(newFetch) {
          currentFetch = newFetch;
        },
        configurable: true,
        enumerable: true,
      });
    }
  }
} catch (e) {
  // Ignore if fetch property cannot be redefined
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

