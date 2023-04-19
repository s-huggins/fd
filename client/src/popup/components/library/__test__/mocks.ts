import { SummaryDto, SummaryQueryInput } from '../../../../gql/graphql';
import { GET_SUMMARIES_QUERY } from '../library';

export const createQueryOutputMock = (
  inputVariables: SummaryQueryInput,
  outputData: SummaryDto[],
  totalPages: number = 1
) => {
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
  };
};
