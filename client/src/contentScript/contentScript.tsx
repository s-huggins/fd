import { ApolloProvider } from '@apollo/client';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { TooltipRequestMessage } from '../common/messages/tooltip-request';
import client from '../graphql/apollo';
import { useMessenger } from '../hooks/useMessenger';
import './contentScript.css';

const App: React.FC<{}> = () => {
  const [testState, setTestState] = useState('Hello world!');
  const handleTooltipRequested = () => {
    setTestState('updated!');
  };

  useMessenger(handleTooltipRequested, TooltipRequestMessage.isTooltipRequestMessage);

  return <h1 className="text-primary text-4xl font-bold">{testState}</h1>;
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
