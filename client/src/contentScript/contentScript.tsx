import React from 'react';
import ReactDOM from 'react-dom/client';

const App: React.FC<{}> = () => {
  return <h1>Content script</h1>;
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
