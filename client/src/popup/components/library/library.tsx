import { gql, useLazyQuery } from '@apollo/client';
import { VariantProps, cva } from 'class-variance-authority';
import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { PaginationControl } from '../../../components/common/controls/pagination-control';
import { useAppContext } from '../../../context/app-context';
import { ILibraryPerspective } from '../../../context/app-context.interface';
import { ISummary } from '../../../context/summary.interface';
import { GetSummariesQuery, GetSummariesQueryVariables, SummaryDto } from '../../../gql/graphql';
import { IActiveTagFilter, LibraryControls } from './library-controls';
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

export const GET_SUMMARIES_QUERY = gql`
  query GetSummaries($queryInput: SummaryQueryInput!) {
    summaries: getSummaries(input: $queryInput) {
      pagination {
        totalPages
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
    setActionInFlight,
    libraryContext: { setSummaries },
    libraryContext: {
      summaries,
      perspective: { sortOrder, tagFilters, page },
      setPerspective
    }
  } = useAppContext();

  const totalPagesRef = useRef(1);

  const getSearchQueryVariables = (): GetSummariesQueryVariables => {
    const activeTags = tagFilters.map((tagFilter: IActiveTagFilter) => tagFilter.tag);
    return { queryInput: { createdAtSortOrder: sortOrder, tagFilters: activeTags, page } };
  };

  const [refetch, { loading, error, data }] = useLazyQuery<GetSummariesQuery, GetSummariesQueryVariables>(
    GET_SUMMARIES_QUERY,
    {
      fetchPolicy: 'network-only',
      variables: getSearchQueryVariables(),
      onCompleted: (queryResponse: GetSummariesQuery) => {
        setActionInFlight(false);
        setSummaries(queryResponse.summaries.data.map(fromDto));
        totalPagesRef.current = queryResponse.summaries.pagination.totalPages;
        window.scrollTo(0, 0);
      }
    }
  );

  const onSummaryDeleted = () => {
    refetch({ variables: getSearchQueryVariables() });
  };

  const navigateToPage = (newPage: number) => {
    setPerspective((oldPerspective: ILibraryPerspective) => ({ ...oldPerspective, page: newPage }));
  };

  useEffect(() => {
    setActionInFlight(true);
    refetch({ variables: getSearchQueryVariables() });
  }, [sortOrder, tagFilters, page]);

  const availableSummaries = data?.summaries?.data?.map(fromDto) ?? summaries;
  let libraryPageContent: ReactNode = null;
  if (availableSummaries) {
    libraryPageContent = (
      <div className="flex flex-col grow">
        <LibraryControls />
        <LibrarySummaryList summaries={availableSummaries} onSummaryDeleted={onSummaryDeleted} className="grow" />
        <PaginationControl
          className="justify-self-end"
          page={page}
          loading={loading}
          totalPages={totalPagesRef.current}
          onNavigate={navigateToPage}
        />
      </div>
    );
  } else if (loading) {
    libraryPageContent = <p>Loading...</p>;
  } else if (error) {
    libraryPageContent = <p>Something went wrong!</p>;
  }

  return <>{libraryPageContent}</>;
};
