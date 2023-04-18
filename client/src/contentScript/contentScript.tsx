import { ApolloProvider, gql, useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Message } from '../common/messages/message';
import { TooltipRequestMessage } from '../common/messages/tooltip-request';
import { AppContextProvider, useAppContext } from '../context/app-context';
import { RequestSummaryQuery, RequestSummaryQueryVariables } from '../gql/graphql';
import client from '../graphql/apollo';
import { useMessenger } from '../hooks/useMessenger';
import { Tooltip } from './components/tooltip';
import { TooltipError } from './components/tooltip-error';
import { TooltipLoading } from './components/tooltip-loading';
import { TooltipSummary } from './components/tooltip-summary';
import './contentScript.css';

const REQUEST_SUMMARY_QUERY = gql`
  query RequestSummary($queryInput: RequestSummaryInput!) {
    summary: requestSummary(input: $queryInput) {
      id
      content
      tags
    }
  }
`;

const App: React.FC<{}> = () => {
  const { loadSummary, setHighlightedText, openTooltip } = useAppContext();

  const [fetchSummary, { data: fetchedData, loading: fetchLoading, error: fetchError }] = useLazyQuery<
    RequestSummaryQuery,
    RequestSummaryQueryVariables
  >(REQUEST_SUMMARY_QUERY, {
    onCompleted: (data: RequestSummaryQuery) => loadSummary(data)
  });

  const [errorDismissed, setErrorDismissed] = useState(true);

  const handleTooltipRequested = (message: Message) => {
    const tooltipMessage: TooltipRequestMessage = message as TooltipRequestMessage;
    openTooltip();
    setHighlightedText(tooltipMessage.selectionText);
    fetchSummary({ variables: { queryInput: { text: tooltipMessage.selectionText } } });
  };

  useMessenger(handleTooltipRequested, TooltipRequestMessage.isTooltipRequestMessage);

  return (
    <Tooltip>
      {fetchLoading && <TooltipLoading />}
      {fetchError && !errorDismissed && <TooltipError handleDismiss={() => setErrorDismissed(true)} />}
      {fetchedData && <TooltipSummary />}
    </Tooltip>
  );
};

const rootElement = document.createElement('div');
rootElement.id = 'fd-app-root';
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <AppContextProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </AppContextProvider>
);
