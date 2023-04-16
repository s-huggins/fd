import { gql } from '@apollo/client';

export const PaginationFragment = gql`
  fragment PaginationFragment on PaginationFields {
    page
    itemsPerPage
    totalPages
  }
`;
