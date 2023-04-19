import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import chrome from 'sinon-chrome/extensions';
import { AppContextProvider } from '../../../../context/app-context';
import { CreatedAtSortOrder } from '../../../../gql/graphql';
import { Library } from '../library';
import { createQueryOutputMock } from './mocks';

beforeAll(() => {
  global.chrome = chrome;
  window.scrollTo = jest.fn();
});

afterEach(cleanup);

const mocks = [
  createQueryOutputMock(
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
        createdAt: `${new Date(2023, 3, 19).valueOf()}`
      },
      {
        id: '2',
        content: 'yes',
        tags: ['tag1'],
        highlightedText: 'highlighted text',
        createdAt: `${new Date(2023, 3, 20).valueOf()}`
      },
      {
        id: '3',
        content: 'excellent',
        tags: ['tag3'],
        highlightedText: 'highlighted text',
        createdAt: `${new Date(2023, 3, 21).valueOf()}`
      }
    ]
  )
];

test('Summaries are loaded by library', async () => {
  const { container, getByText, findByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AppContextProvider>
        <Library />
      </AppContextProvider>
    </MockedProvider>
  );

  expect(await findByText('cool and nice')).toBeInTheDocument();
});
