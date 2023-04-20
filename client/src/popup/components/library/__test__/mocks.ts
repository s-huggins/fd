import { DocumentNode } from 'graphql';
import { GetSummariesQueryVariables, SummaryDto, SummaryQueryInput, SummaryQueryOutput } from '../../../../gql/graphql';
import { GET_SUMMARIES_QUERY } from '../library';

export interface ILibraryQueryMock {
  request: {
    query: DocumentNode;
    variables: GetSummariesQueryVariables;
  };
  result: {
    data: {
      summaries: SummaryQueryOutput;
    };
  };
}

export const createLibraryQueryMock = (
  inputVariables: SummaryQueryInput,
  outputData: SummaryDto[],
  totalPages: number = 1
): ILibraryQueryMock => {
  return {
    request: {
      query: GET_SUMMARIES_QUERY,
      variables: {
        queryInput: { ...inputVariables }
      }
    },
    result: {
      data: {
        summaries: {
          pagination: {
            totalPages
          },
          data: [...outputData.map((summaryDto: SummaryDto) => ({ ...summaryDto }))]
        }
      }
    }
  } as ILibraryQueryMock;
};
