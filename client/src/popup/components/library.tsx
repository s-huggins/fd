import { gql, useQuery } from '@apollo/client';
import { VariantProps, cva } from 'class-variance-authority';
import React, { FC, ReactNode, useState } from 'react';
import { PaginationFragment } from '../../common/graphql/fragments/pagination';
import { useAppContext } from '../../context/app-context';
import { ISummary } from '../../context/summary.interface';
import { CreatedAtSortOrder, GetSummariesQuery, GetSummariesQueryVariables, SummaryDto } from '../../gql/graphql';
import { LibrarySummaryList } from './library-summary-list';

const libraryClasses = cva(
  [
    // defaults
    'p-4',
    'p-2',
    'overflow-y-auto',
    'text-base',
    'leading-7',
    'text-dark-text',
    'rounded-xl',
    'shadow-dark-inner'
  ],
  {
    variants: {
      theme: {
        dark: ['bg-dark-main', 'text-dark-text'],

        light: [
          'bg-white',
          'text-black',
          'border-gray-400',
          'hover:bg-gray-100',
          'border-solid',
          'border-2',
          'border-gray-800'
        ]
      },
      size: {
        small: ['text-md', 'py-1', 'px-2'],
        medium: ['text-lg', 'px-6', 'py-2'],
        large: ['text-xlg', 'px-8', 'py-4']
      }
    },
    defaultVariants: {
      theme: 'dark'
    }
  }
);

export interface ILibraryProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof libraryClasses> {}

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
        highlightedText
        createdAt
      }
    }
  }
  ${PaginationFragment}
`;

const fromDto = (summaryDto: SummaryDto): ISummary => {
  return {
    ...summaryDto,
    createdAt: new Date(summaryDto.createdAt)
  };
};

export const Library: FC<ILibraryProps> = () => {
  const {
    theme,
    libraryContext: { setSummaries }
  } = useAppContext();
  const [sortOrder, setSortOrder] = useState<CreatedAtSortOrder>(CreatedAtSortOrder.NewestFirst);
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  const getSearchQueryVariables = (): GetSummariesQueryVariables => {
    return { queryInput: { createdAtSortOrder: sortOrder, tagFilters, page } };
  };

  const { loading, error, data, refetch } = useQuery<GetSummariesQuery, GetSummariesQueryVariables>(
    GET_SUMMARIES_QUERY,
    {
      variables: getSearchQueryVariables(),
      onCompleted: (queryResponse: GetSummariesQuery) => {
        setSummaries(queryResponse.summaries.data.map(fromDto));
      }
    }
  );

  const onSummaryDeleted = () => {
    refetch(getSearchQueryVariables());
  };

  let libraryPageContent: ReactNode = null;
  if (error) {
    libraryPageContent = <p>Something went wrong!</p>;
  } else if (loading) {
    libraryPageContent = <p>Loading...</p>;
  } else if (data) {
    libraryPageContent = (
      <LibrarySummaryList summaries={data.summaries.data.map(fromDto)} onSummaryDeleted={onSummaryDeleted} />
    );
  }

  return <>{libraryPageContent}</>;
};
