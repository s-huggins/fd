import { ApolloProvider, gql, useLazyQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { TooltipRequestMessage } from '../common/messages/tooltip-request';
import { Summary } from '../components/summary';
import {
  RequestSummaryQuery,
  RequestSummaryQueryVariables,
  SaveSummaryMutation,
  SaveSummaryMutationVariables
} from '../gql/graphql';
import client from '../graphql/apollo';
import { useMessenger } from '../hooks/useMessenger';
import { Tooltip } from './components/tooltip';
import './contentScript.css';

const REQUEST_SUMMARY_QUERY = gql`
  query RequestSummary($queryInput: RequestSummaryInput!) {
    summary: requestSummary(input: $queryInput) {
      content
      tags
    }
  }
`;

const SAVE_SUMMARY_MUTATION = gql`
  mutation SaveSummary($saveSummaryInput: SaveSummaryInput!) {
    saveSummary(input: $saveSummaryInput) {
      id
      content
      tags
      createdAt
    }
  }
`;

const App: React.FC<{}> = () => {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [highlightedText, setHighlightedText] = useState<string>('');

  const [fetchSummary, { data: fetchedData, loading: fetchLoading, error: fetchError }] = useLazyQuery<
    RequestSummaryQuery,
    RequestSummaryQueryVariables
  >(REQUEST_SUMMARY_QUERY);

  const [saveSummary, { data: savedData, loading: saveLoading, error: saveError }] = useMutation<
    SaveSummaryMutation,
    SaveSummaryMutationVariables
  >(SAVE_SUMMARY_MUTATION, {});

  const handleTooltipRequested = (message: TooltipRequestMessage) => {
    setTooltipOpen(true);
    setHighlightedText(message.selectionText);
    fetchSummary({ variables: { queryInput: { text: message.selectionText } } });
  };

  useMessenger(handleTooltipRequested, TooltipRequestMessage.isTooltipRequestMessage);

  const handleSaveSummary = () => {
    saveSummary({
      variables: {
        saveSummaryInput: {
          content: fetchedData.summary.content,
          tags: fetchedData.summary.tags,
          highlightedText
        }
      }
    });
  };

  return (
    <Tooltip tooltipOpen={tooltipOpen} setTooltipOpen={setTooltipOpen}>
      {fetchLoading && 'Loading'}
      {fetchError && 'Error'}
      {fetchedData && (
        <>
          <Summary detail={fetchedData.summary.content} tags={fetchedData.summary.tags} />
          <button onClick={handleSaveSummary}>Save</button>
        </>
      )}
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
