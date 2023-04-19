/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation SaveSummary($saveSummaryInput: SaveSummaryInput!) {\n    saveSummary(input: $saveSummaryInput) {\n      id\n      content\n      tags\n      createdAt\n    }\n  }\n": types.SaveSummaryDocument,
    "\n  query RequestSummary($queryInput: RequestSummaryInput!) {\n    summary: requestSummary(input: $queryInput) {\n      id\n      content\n      tags\n    }\n  }\n": types.RequestSummaryDocument,
    "\n  mutation DeleteSummary($deleteSummaryInput: DeleteSummaryInput!) {\n    deleteSummary(input: $deleteSummaryInput)\n  }\n": types.DeleteSummaryDocument,
    "\n  query GetSummaries($queryInput: SummaryQueryInput!) {\n    summaries: getSummaries(input: $queryInput) {\n      pagination {\n        totalPages\n      }\n      data {\n        id\n        content\n        tags\n        highlightedText\n        createdAt\n      }\n    }\n  }\n": types.GetSummariesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SaveSummary($saveSummaryInput: SaveSummaryInput!) {\n    saveSummary(input: $saveSummaryInput) {\n      id\n      content\n      tags\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation SaveSummary($saveSummaryInput: SaveSummaryInput!) {\n    saveSummary(input: $saveSummaryInput) {\n      id\n      content\n      tags\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RequestSummary($queryInput: RequestSummaryInput!) {\n    summary: requestSummary(input: $queryInput) {\n      id\n      content\n      tags\n    }\n  }\n"): (typeof documents)["\n  query RequestSummary($queryInput: RequestSummaryInput!) {\n    summary: requestSummary(input: $queryInput) {\n      id\n      content\n      tags\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteSummary($deleteSummaryInput: DeleteSummaryInput!) {\n    deleteSummary(input: $deleteSummaryInput)\n  }\n"): (typeof documents)["\n  mutation DeleteSummary($deleteSummaryInput: DeleteSummaryInput!) {\n    deleteSummary(input: $deleteSummaryInput)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSummaries($queryInput: SummaryQueryInput!) {\n    summaries: getSummaries(input: $queryInput) {\n      pagination {\n        totalPages\n      }\n      data {\n        id\n        content\n        tags\n        highlightedText\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSummaries($queryInput: SummaryQueryInput!) {\n    summaries: getSummaries(input: $queryInput) {\n      pagination {\n        totalPages\n      }\n      data {\n        id\n        content\n        tags\n        highlightedText\n        createdAt\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;