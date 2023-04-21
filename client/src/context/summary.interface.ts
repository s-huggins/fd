/**
 * Interface for saved library summaries.
 */
export interface ISummary {
  id: string;
  highlightedText: string;
  content: string;
  tags: string[];
  createdAt: Date;
}
