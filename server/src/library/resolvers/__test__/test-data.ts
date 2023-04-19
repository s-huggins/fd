import { SaveSummaryInput } from 'src/library/dtos/save-summary.dto';

export const testSummaries: SaveSummaryInput[] = [
  {
    content: 'content 1',
    tags: ['tagA'],
    highlightedText: 'highlight1'
  },
  {
    content: 'content 2',
    tags: ['tagB'],
    highlightedText: 'highlight2'
  },
  {
    content: 'content 3',
    tags: ['tagA', 'tagB'],
    highlightedText: 'highlight3'
  },
  {
    content: 'content 4',
    tags: ['tagC'],
    highlightedText: 'highlight4'
  }
];
