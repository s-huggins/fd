import { ApolloProvider } from '@apollo/client';
import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { Switch } from '../components/common/switch';
import { AppContext, AppContextProvider } from '../context/app-context';
import client from '../graphql/apollo';

const App: React.FC<{}> = () => {
  const context = useContext(AppContext);
  return (
    <>
      <h1>Frontdoor</h1>
      {context.hydrated && (
        <Switch label="Enabled" checked={context.extensionActive} onToggle={context.setExtensionActive} />
      )}
    </>
  );
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <AppContextProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </AppContextProvider>
);
