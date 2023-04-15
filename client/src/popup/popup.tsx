import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC<{}> = () => {
  return <h1>Popup</h1>;
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
