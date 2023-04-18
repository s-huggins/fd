/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export enum CreatedAtSortOrder {
  NewestFirst = 'NewestFirst',
  OldestFirst = 'OldestFirst'
}

export type DeleteSummaryInput = {
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteAll: Scalars['Boolean'];
  deleteSummary: Scalars['Boolean'];
  saveSummary: SaveSummaryOutput;
};


export type MutationDeleteSummaryArgs = {
  input: DeleteSummaryInput;
};


export type MutationSaveSummaryArgs = {
  input: SaveSummaryInput;
};

export type PaginationFields = {
  __typename?: 'PaginationFields';
  itemsPerPage: Scalars['Int'];
  page: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getSummaries: SummaryQueryOutput;
  requestSummary: RequestSummaryOutput;
};


export type QueryGetSummariesArgs = {
  input: SummaryQueryInput;
};


export type QueryRequestSummaryArgs = {
  input: RequestSummaryInput;
};

export type RequestSummaryInput = {
  text: Scalars['String'];
};

export type RequestSummaryOutput = {
  __typename?: 'RequestSummaryOutput';
  content: Scalars['String'];
  id: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type SaveSummaryInput = {
  content: Scalars['String'];
  highlightedText: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type SaveSummaryOutput = {
  __typename?: 'SaveSummaryOutput';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  highlightedText: Scalars['String'];
  id: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type SummaryDto = {
  __typename?: 'SummaryDto';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  highlightedText: Scalars['String'];
  id: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type SummaryQueryInput = {
  createdAtSortOrder?: CreatedAtSortOrder;
  itemsPerPage?: Scalars['Int'];
  page?: Scalars['Int'];
  tagFilters?: Array<Scalars['String']>;
};

export type SummaryQueryOutput = {
  __typename?: 'SummaryQueryOutput';
  data: Array<SummaryDto>;
  pagination: PaginationFields;
};

export type PaginationFragmentFragment = { __typename?: 'PaginationFields', page: number, itemsPerPage: number, totalPages: number } & { ' $fragmentName'?: 'PaginationFragmentFragment' };

export type SaveSummaryMutationVariables = Exact<{
  saveSummaryInput: SaveSummaryInput;
}>;


export type SaveSummaryMutation = { __typename?: 'Mutation', saveSummary: { __typename?: 'SaveSummaryOutput', id: string, content: string, tags: Array<string>, createdAt: any } };

export type RequestSummaryQueryVariables = Exact<{
  queryInput: RequestSummaryInput;
}>;


export type RequestSummaryQuery = { __typename?: 'Query', summary: { __typename?: 'RequestSummaryOutput', id: string, content: string, tags: Array<string> } };

export type GetSummariesQueryVariables = Exact<{
  queryInput: SummaryQueryInput;
}>;


export type GetSummariesQuery = { __typename?: 'Query', summaries: { __typename?: 'SummaryQueryOutput', pagination: (
      { __typename?: 'PaginationFields' }
      & { ' $fragmentRefs'?: { 'PaginationFragmentFragment': PaginationFragmentFragment } }
    ), data: Array<{ __typename?: 'SummaryDto', id: string, content: string, tags: Array<string>, highlightedText: string, createdAt: any }> } };

export type DeleteSummaryMutationVariables = Exact<{
  deleteSummaryInput: DeleteSummaryInput;
}>;


export type DeleteSummaryMutation = { __typename?: 'Mutation', deleteSummary: boolean };

export const PaginationFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PaginationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationFields"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]} as unknown as DocumentNode<PaginationFragmentFragment, unknown>;
export const SaveSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"saveSummaryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SaveSummaryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveSummary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"saveSummaryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<SaveSummaryMutation, SaveSummaryMutationVariables>;
export const RequestSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RequestSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestSummaryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"summary"},"name":{"kind":"Name","value":"requestSummary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]} as unknown as DocumentNode<RequestSummaryQuery, RequestSummaryQueryVariables>;
export const GetSummariesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSummaries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SummaryQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"summaries"},"name":{"kind":"Name","value":"getSummaries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PaginationFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"highlightedText"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PaginationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationFields"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]} as unknown as DocumentNode<GetSummariesQuery, GetSummariesQueryVariables>;
export const DeleteSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteSummaryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteSummaryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSummary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteSummaryInput"}}}]}]}}]} as unknown as DocumentNode<DeleteSummaryMutation, DeleteSummaryMutationVariables>;