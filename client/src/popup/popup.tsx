import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { Switch } from '../components/common/switch';
import { AppContext, AppContextProvider } from '../context/app-context';

const App: React.FC<{}> = () => {
  const context = useContext(AppContext);

  return (
    <>
      <h1>Frontdoor</h1>
      <Switch label="Enabled" checked={context.enabled} onToggle={context.setEnabled} />
    </>
  );
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
