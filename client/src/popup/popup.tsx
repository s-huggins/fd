import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppContextProvider } from '../context/app-context';
import { ExtensionContextProvider } from '../context/extension-context';
import client from '../graphql/apollo';
import { FrontdoorPopup } from './components/frontdoor-popup';
import './popup.css';

export const App: React.FC<{}> = () => {
  return (
    <ExtensionContextProvider>
      <AppContextProvider>
        <ApolloProvider client={client}>
          <FrontdoorPopup />
        </ApolloProvider>
      </AppContextProvider>
    </ExtensionContextProvider>
  );
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
