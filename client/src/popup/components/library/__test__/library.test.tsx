import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import {
  RenderResult,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import React from 'react';
import { AppContextProvider } from '../../../../context/app-context';
import { CreatedAtSortOrder } from '../../../../gql/graphql';
import { FrontdoorPopup } from '../../frontdoor-popup';
import { ILibraryQueryMock, createLibraryQueryMock } from './mocks';

beforeAll(() => {
  window.scrollTo = jest.fn();
});

afterEach(cleanup);

const renderLibrary = (mocks: ILibraryQueryMock[]): RenderResult => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AppContextProvider>
        <FrontdoorPopup />
      </AppContextProvider>
    </MockedProvider>
  );
};

const summaries = [
  {
    id: '3',
    content: 'cool and nice',
    tags: ['tag1', 'tag2'],
    highlightedText: 'highlighted text',
    createdAt: '2023-04-03T00:00:04.000Z'
  },
  {
    id: '2',
    content: 'yes',
    tags: ['tag1'],
    highlightedText: 'highlighted text',
    createdAt: '2023-04-02T00:00:04.000Z'
  },
  {
    id: '1',
    content: 'excellent',
    tags: ['tag3'],
    highlightedText: 'highlighted text',
    createdAt: '2023-04-01T00:00:04.000Z'
  }
];

const mocks = [
  createLibraryQueryMock(
    {
      createdAtSortOrder: CreatedAtSortOrder.NewestFirst,
      page: 1,
      tagFilters: []
    },
    summaries
  )
];

const waitForInFlightAction = async () => {
  await waitFor(() => expect(screen.queryByTestId('progress-bar')).toBeInTheDocument());
  await waitForElementToBeRemoved(() => screen.queryByTestId('progress-bar'));
};

test('Summaries are loaded by library', async () => {
  const { findByTestId, findByText } = renderLibrary(mocks);
  const summaryTextEl: HTMLElement = await findByText('cool and nice');
  expect(summaryTextEl).toBeInTheDocument();
});

test('Created at date is formatted as expected', async () => {
  renderLibrary(mocks);

  const timestampElements: HTMLElement[] = await screen.findAllByTestId('createdAt');
  expect(timestampElements[0].textContent).toBe('Mon Apr 03 2023');
});

test('Default sort order is NewestFirst', async () => {
  renderLibrary(mocks);

  const timestamps: string[] = (await screen.findAllByTestId('createdAt')).map((el: HTMLElement) => el.textContent);
  expect(timestamps[0]).toBe('Mon Apr 03 2023');
  expect(timestamps[1]).toBe('Sun Apr 02 2023');
  expect(timestamps[timestamps.length - 1]).toBe('Sat Apr 01 2023');
});

test('Sort order is switched to OldestFirst', async () => {
  const sortRequestMock: ILibraryQueryMock = createLibraryQueryMock(
    {
      createdAtSortOrder: CreatedAtSortOrder.OldestFirst,
      page: 1,
      tagFilters: []
    },
    [...summaries].reverse()
  );

  renderLibrary([...mocks, sortRequestMock]);
  const oldestToggle: HTMLElement = await screen.findByLabelText('Oldest');

  fireEvent.click(oldestToggle);
  await waitForInFlightAction();

  const timestamps: string[] = (await screen.findAllByTestId('createdAt')).map((el: HTMLElement) => el.textContent);
  expect(timestamps[0]).toBe('Sat Apr 01 2023');
  expect(timestamps[1]).toBe('Sun Apr 02 2023');
  expect(timestamps[timestamps.length - 1]).toBe('Mon Apr 03 2023');
});

test('Library is filtered by a tag', async () => {
  const tag: string = 'tag1';
  const applyTagMock: ILibraryQueryMock = createLibraryQueryMock(
    {
      createdAtSortOrder: CreatedAtSortOrder.NewestFirst,
      page: 1,
      tagFilters: [tag]
    },
    [summaries[0], summaries[1]]
  );

  renderLibrary([...mocks, applyTagMock]);

  const tagFilterInput: HTMLInputElement = await screen.findByTestId('tag-filter-input');
  fireEvent.change(tagFilterInput, { target: { value: tag } });
  fireEvent.keyDown(tagFilterInput, { key: 'Enter', code: 'Enter', charCode: 13 });

  await waitForInFlightAction();

  const summaryDescriptions: HTMLElement[] = await screen.findAllByTestId('summary-content');

  expect(summaryDescriptions.length).toBe(2);
  expect(summaryDescriptions[0].textContent).toBe('cool and nice');
  expect(summaryDescriptions[1].textContent).toBe('yes');
});
