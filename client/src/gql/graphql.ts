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

export type CreateSummaryInput = {
  detail: Scalars['String'];
  highlightedText: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type CreateSummaryOutput = {
  __typename?: 'CreateSummaryOutput';
  createdAt: Scalars['DateTime'];
  detail: Scalars['String'];
  highlightedText: Scalars['String'];
  id: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export enum CreatedAtSortOrder {
  NewestFirst = 'NewestFirst',
  OldestFirst = 'OldestFirst'
}

export type Mutation = {
  __typename?: 'Mutation';
  createSummary: CreateSummaryOutput;
};


export type MutationCreateSummaryArgs = {
  input: CreateSummaryInput;
};

export type OpenAiSummary = {
  __typename?: 'OpenAISummary';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  tags: Array<Scalars['String']>;
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
  requestSummary: OpenAiSummary;
};


export type QueryGetSummariesArgs = {
  input: SummaryQueryInput;
};


export type QueryRequestSummaryArgs = {
  input: SummaryRequestInput;
};

export type SummaryDto = {
  __typename?: 'SummaryDto';
  createdAt: Scalars['DateTime'];
  detail: Scalars['String'];
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

export type SummaryRequestInput = {
  text: Scalars['String'];
};

export type PaginationFragmentFragment = { __typename?: 'PaginationFields', page: number, itemsPerPage: number, totalPages: number } & { ' $fragmentName'?: 'PaginationFragmentFragment' };

export type GetSummariesQueryVariables = Exact<{
  queryInput: SummaryQueryInput;
}>;


export type GetSummariesQuery = { __typename?: 'Query', summaries: { __typename?: 'SummaryQueryOutput', pagination: (
      { __typename?: 'PaginationFields' }
      & { ' $fragmentRefs'?: { 'PaginationFragmentFragment': PaginationFragmentFragment } }
    ), data: Array<{ __typename?: 'SummaryDto', id: string, detail: string, tags: Array<string>, createdAt: any }> } };

export const PaginationFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PaginationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationFields"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]} as unknown as DocumentNode<PaginationFragmentFragment, unknown>;
export const GetSummariesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSummaries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SummaryQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"summaries"},"name":{"kind":"Name","value":"getSummaries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PaginationFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"detail"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PaginationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationFields"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]} as unknown as DocumentNode<GetSummariesQuery, GetSummariesQueryVariables>;