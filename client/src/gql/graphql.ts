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

export type Query = {
  __typename?: 'Query';
  getSummaries: Array<SummaryDto>;
};


export type QueryGetSummariesArgs = {
  input: SummaryQueryInput;
};

export type SummaryDto = {
  __typename?: 'SummaryDto';
  createdAt: Scalars['DateTime'];
  detail: Scalars['String'];
  highlightedText: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type SummaryQueryInput = {
  createdAtSortOrder?: CreatedAtSortOrder;
  page?: Scalars['Int'];
  tagFilters?: Array<Scalars['String']>;
};

export type GetSummariesQueryVariables = Exact<{
  queryInput: SummaryQueryInput;
}>;


export type GetSummariesQuery = { __typename?: 'Query', getSummaries: Array<{ __typename?: 'SummaryDto', detail: string, tags: Array<string> }> };


export const GetSummariesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSummaries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SummaryQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSummaries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"queryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"detail"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]} as unknown as DocumentNode<GetSummariesQuery, GetSummariesQueryVariables>;