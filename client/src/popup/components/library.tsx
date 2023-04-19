import { gql, useLazyQuery } from '@apollo/client';
import { VariantProps, cva } from 'class-variance-authority';
import React, { FC, ReactNode, useEffect } from 'react';
import { PaginationFragment } from '../../common/graphql/fragments/pagination';
import { useAppContext } from '../../context/app-context';
import { ISummary } from '../../context/summary.interface';
import { GetSummariesQuery, GetSummariesQueryVariables, SummaryDto } from '../../gql/graphql';
import { LibrarySummaryList } from './library-summary-list';
import { IActiveTagFilter, ListControls } from './list-controls';

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
    libraryContext: { setSummaries },
    libraryContext: {
      perspective: { sortOrder, tagFilters, page },
      setPerspective
    }
  } = useAppContext();

  const getSearchQueryVariables = (): GetSummariesQueryVariables => {
    const activeTags = tagFilters.map((tagFilter: IActiveTagFilter) => tagFilter.tag);
    return { queryInput: { createdAtSortOrder: sortOrder, tagFilters: activeTags, page } };
  };

  const [refetch, { loading, error, data }] = useLazyQuery<GetSummariesQuery, GetSummariesQueryVariables>(
    GET_SUMMARIES_QUERY,
    {
      variables: getSearchQueryVariables(),
      onCompleted: (queryResponse: GetSummariesQuery) => {
        console.log('on complete of query');
        setSummaries(queryResponse.summaries.data.map(fromDto));
      }
    }
  );

  const onSummaryDeleted = () => {
    refetch({ variables: getSearchQueryVariables() });
  };

  useEffect(() => {
    console.log('using effect');
    refetch({ variables: getSearchQueryVariables() });
  }, [sortOrder, tagFilters, page]);

  let libraryPageContent: ReactNode = null;
  if (error) {
    libraryPageContent = <p>Something went wrong!</p>;
  } else if (loading) {
    libraryPageContent = <p>Loading...</p>;
  } else if (data) {
    libraryPageContent = (
      <>
        <ListControls />
        <LibrarySummaryList summaries={data.summaries.data.map(fromDto)} onSummaryDeleted={onSummaryDeleted} />
      </>
    );
  }

  return <>{libraryPageContent}</>;
};
