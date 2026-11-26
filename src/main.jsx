import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles/main.css';

const container = document.getElementById('root');
const hasPrerendered =
  container && container.innerHTML.trim() !== '' && container.innerHTML.trim() !== '<!--app-html-->';

function mount() {
  if (hasPrerendered) {
    hydrateRoot(container, <App />);
  } else if (container) {
    createRoot(container).render(<App />);
  }
}

// Let the browser paint prerendered HTML before hydrating React
if (hasPrerendered && typeof requestAnimationFrame === 'function') {
  requestAnimationFrame(mount);
} else {
  mount();
}
