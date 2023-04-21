/**
 * The shape of the data we are expecting OpenAI to return.
 */
export interface ISummaryResponse {
  summary: string;
  tags: string[];
}
