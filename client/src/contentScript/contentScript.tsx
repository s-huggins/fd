import { ApolloProvider, gql, useLazyQuery } from '@apollo/client';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { TooltipRequestMessage } from '../common/messages/tooltip-request';
import { RequestSummaryQuery, RequestSummaryQueryVariables } from '../gql/graphql';
import client from '../graphql/apollo';
import { useClickPositionRef } from '../hooks/useClickPositionRef';
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
  const tooltipContainerRef = useRef<HTMLDivElement>();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const clickCoordinatesRef = useClickPositionRef();

  const [fetchSummary, { loading, error, data }] = useLazyQuery<RequestSummaryQuery, RequestSummaryQueryVariables>(
    RequestSummaryQuery
  );

  const positionTooltip = () => {
    if (clickCoordinatesRef?.current?.pagePosition) {
      const { x, y } = clickCoordinatesRef.current.pagePosition;
      tooltipContainerRef.current.style.left = `${x}px`;
      tooltipContainerRef.current.style.top = `${y}px`;
    }
  };

  const handleTooltipRequested = (message: TooltipRequestMessage) => {
    positionTooltip();
    setTooltipOpen(true);
    fetchSummary({ variables: { requestSummaryInput: { text: message.selectionText } } });
  };

  useMessenger(handleTooltipRequested, TooltipRequestMessage.isTooltipRequestMessage);

  console.log('data', data);
  console.log(error);

  return (
    <div className={clsx('absolute', !tooltipOpen && 'hidden')} ref={tooltipContainerRef}>
      <Tooltip tooltipOpen={tooltipOpen} setTooltipOpen={setTooltipOpen}>
        {loading && 'Loading'}
        {error && 'Error'}
        {data && data.requestSummary.content}
      </Tooltip>
    </div>
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
