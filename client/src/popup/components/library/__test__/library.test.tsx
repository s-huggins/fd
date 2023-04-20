import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { RenderResult, cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import chrome from 'sinon-chrome/extensions';
import { AppContextProvider } from '../../../../context/app-context';
import { CreatedAtSortOrder } from '../../../../gql/graphql';
import { Library } from '../library';
import { ILibraryQueryMock, createLibraryQueryMock } from './mocks';

beforeAll(() => {
  global.chrome = chrome;
  window.scrollTo = jest.fn();
});

afterEach(cleanup);

const renderLibrary = (mocks: ILibraryQueryMock[]): RenderResult => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AppContextProvider>
        <Library />
      </AppContextProvider>
    </MockedProvider>
  );
};

const mocks = [
  createLibraryQueryMock(
    {
      createdAtSortOrder: CreatedAtSortOrder.NewestFirst,
      page: 1,
      tagFilters: []
    },
    [
      {
        id: '1',
        content: 'cool and nice',
        tags: ['tag1', 'tag2'],
        highlightedText: 'highlighted text',
        createdAt: '2023-04-01T00:00:04.000Z'
      },
      {
        id: '2',
        content: 'yes',
        tags: ['tag1'],
        highlightedText: 'highlighted text',
        createdAt: '2023-04-02T00:00:04.000Z'
      },
      {
        id: '3',
        content: 'excellent',
        tags: ['tag3'],
        highlightedText: 'highlighted text',
        createdAt: '2023-04-03T00:00:04.000Z'
      }
    ]
  )
];

test('Summaries are loaded by library', async () => {
  const { findByText } = renderLibrary(mocks);

  expect(await findByText('cool and nice')).toBeInTheDocument();
});

test('Created at date is formatted as expected', async () => {
  renderLibrary(mocks);

  const timestampElements: HTMLElement[] = await screen.findAllByTestId('createdAt');
  expect(timestampElements[0].textContent).toBe('Sat Apr 01 2023');
});

test('Default sort order is NewestFirst', async () => {
  renderLibrary(mocks);

  const timestamps: string[] = (await screen.findAllByTestId('createdAt')).map((el: HTMLElement) => el.textContent);
  expect(timestamps[0]).toBe('Sat Apr 01 2023');
  expect(timestamps[1]).toBe('Sun Apr 02 2023');
  expect(timestamps[timestamps.length - 1]).toBe('Mon Apr 03 2023');
});

test('Sort order is switched to OldestFirst', async () => {
  renderLibrary(mocks);

  const timestamps: string[] = (await screen.findAllByTestId('createdAt')).map((el: HTMLElement) => el.textContent);
  expect(timestamps[0]).toBe('Sat Apr 01 2023');
  expect(timestamps[1]).toBe('Sun Apr 02 2023');
  expect(timestamps[timestamps.length - 1]).toBe('Mon Apr 03 2023');
});

test('Library is filtered by a tag', async () => {
  renderLibrary(mocks);

  const tagFilterInput: HTMLInputElement = await screen.findByTestId('tag-filter-input');

  expect(timestamps[0]).toBe('Sat Apr 01 2023');
  expect(timestamps[1]).toBe('Sun Apr 02 2023');
  expect(timestamps[timestamps.length - 1]).toBe('Mon Apr 03 2023');
});
