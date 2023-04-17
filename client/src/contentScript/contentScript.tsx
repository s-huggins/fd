import { ApolloProvider, gql, useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { TooltipRequestMessage } from '../common/messages/tooltip-request';
import { RequestSummaryQuery, RequestSummaryQueryVariables } from '../gql/graphql';
import client from '../graphql/apollo';
import { useMessenger } from '../hooks/useMessenger';
import { Tooltip } from './components/tooltip';
import './contentScript.css';

const RequestSummaryQuery = gql`
  query RequestSummary($requestSummaryInput: RequestSummaryInput!) {
    requestSummary(input: $requestSummaryInput) {
      content
      tags
      createdAt
    }
  }
`;

const App: React.FC<{}> = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const [fetchSummary, { loading, error, data }] = useLazyQuery<RequestSummaryQuery, RequestSummaryQueryVariables>(
    RequestSummaryQuery
  );

  const handleTooltipRequested = (message: TooltipRequestMessage) => {
    setTooltipOpen(true);
    fetchSummary({ variables: { requestSummaryInput: { text: message.selectionText } } });
  };

  useMessenger(handleTooltipRequested, TooltipRequestMessage.isTooltipRequestMessage);

  return (
    <Tooltip tooltipOpen={tooltipOpen} setTooltipOpen={setTooltipOpen}>
      {loading && 'Loading'}
      {error && 'Error'}
      {data && data.requestSummary.content}
    </Tooltip>
  );
};

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
