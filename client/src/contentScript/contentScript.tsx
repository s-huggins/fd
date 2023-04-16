import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import client from '../graphql/apollo';
import './contentScript.css';

const App: React.FC<{}> = () => {
  return <h1 className="text-primary text-4xl font-bold">Hello world! I am using React</h1>;
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
