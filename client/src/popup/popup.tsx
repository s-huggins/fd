import { ApolloProvider, gql, useQuery } from '@apollo/client';
import React, { ReactNode, useContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { PaginationFragment } from '../common/graphql/fragments/pagination';
import { Switch } from '../components/common/switch';
import { AppContext, AppContextProvider } from '../context/app-context';
import { CreatedAtSortOrder, GetSummariesQuery, GetSummariesQueryVariables } from '../gql/graphql';
import client from '../graphql/apollo';

const GET_SUMMARIES_QUERY = gql`
  query GetSummaries($queryInput: SummaryQueryInput!) {
    summaries: getSummaries(input: $queryInput) {
      pagination {
        ...PaginationFragment
      }
      data {
        id
        content
        tags
        createdAt
      }
    }
  }
  ${PaginationFragment}
`;

const App: React.FC<{}> = () => {
  const context = useContext(AppContext);
  const [sortOrder, setSortOrder] = useState<CreatedAtSortOrder>(CreatedAtSortOrder.NewestFirst);
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  const { loading, error, data, refetch } = useQuery<GetSummariesQuery, GetSummariesQueryVariables>(
    GET_SUMMARIES_QUERY,
    {
      variables: {
        queryInput: { createdAtSortOrder: sortOrder, tagFilters, page }
      }
    }
  );

  let libraryPageContent: ReactNode = null;
  if (error) {
    libraryPageContent = <p>Something went wrong!</p>;
  } else if (loading) {
    libraryPageContent = <p>Loading...</p>;
  } else if (data) {
    libraryPageContent = data.summaries.data.map(summary => {
      return (
        <div key={summary.id}>
          <div>
            <p>{summary.content}</p>
            <span>{summary.tags.join(', ')}</span>
            <span>{summary.createdAt}</span>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <h1>Frontdoor</h1>
      {context.hydrated && (
        <div>
          <Switch label="Enabled" checked={context.extensionActive} onToggle={context.setExtensionActive} />
          {libraryPageContent}
        </div>
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
