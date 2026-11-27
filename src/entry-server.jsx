import React from 'react';
import { renderToString } from 'preact-render-to-string';
import App from './App';

export function render() {
  return renderToString(<App />);
}
