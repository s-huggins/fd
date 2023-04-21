import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Collection, Connection, Model, connect } from 'mongoose';
import { SortOrderEnum } from 'src/common/enums/sort-order.enum';
import { SummaryQueryInput } from 'src/library/dtos/summary-query-input.dto';
import { SummaryDto } from 'src/library/dtos/summary.dto';
import { Summary, SummarySchema } from 'src/library/models/summary';
import { LibraryService } from 'src/library/services/library.service';
import { LibraryResolver } from '../library.resolver';
import { testSummaries } from './test-data';

describe('LibraryResolver', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let summaryModel: Model<Summary>;
  let libraryResolver: LibraryResolver;

  beforeAll(async () => {
    // spin up an in-memory mongo server to mock db
    mongod = await MongoMemoryServer.create();
    mongoConnection = (await connect(mongod.getUri())).connection;

    summaryModel = mongoConnection.model(Summary.name, SummarySchema);

    const testModule: TestingModule = await Test.createTestingModule({
      providers: [LibraryResolver, LibraryService, { provide: getModelToken(Summary.name), useValue: summaryModel }]
    }).compile();

    app = testModule.createNestApplication();
    libraryResolver = app.get<LibraryResolver>(LibraryResolver);
    await app.init();
  });

  beforeEach(async () => {
    // seed the test data
    await summaryModel.insertMany(testSummaries);
  });

  afterEach(async () => {
    // clear the collection
    const collections: Record<string, Collection> = mongoConnection.collections;
    for (const key in collections) {
      const collection: Collection = collections[key];
      await collection.deleteMany({});
    }
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  describe('tag filters', () => {
    it('returns expected summaries for no tag filters', async () => {
      const summariesQuery: SummaryQueryInput = {
        page: 1,
        itemsPerPage: 10,
        createdAtSortOrder: SortOrderEnum.NewestFirst,
        tagFilters: []
      };
      const summaries = await libraryResolver.getSummaries(summariesQuery);
      expect(summaries.data.length).toBe(4);
    });

    it('returns expected summaries for single tag filter', async () => {
      const tagA: string = 'tagA';
      const summariesQuery: SummaryQueryInput = {
        page: 1,
        itemsPerPage: 10,
        createdAtSortOrder: SortOrderEnum.NewestFirst,
        tagFilters: [tagA]
      };
      const summaries = await libraryResolver.getSummaries(summariesQuery);
      expect(summaries.data.length).toBe(2);
      summaries.data.forEach((summary: SummaryDto) => {
        const containsTag: boolean = summary.tags.includes(tagA);
        expect(containsTag).toBe(true);
      });
    });

    it('returns no summaries for inexistent tag filter', async () => {
      const tagA: string = 'tagX';
      const summariesQuery: SummaryQueryInput = {
        page: 1,
        itemsPerPage: 10,
        createdAtSortOrder: SortOrderEnum.NewestFirst,
        tagFilters: [tagA]
      };
      const summaries = await libraryResolver.getSummaries(summariesQuery);
      expect(summaries.data.length).toBe(0);
    });

    it('returns summaries having all the given tags for multi-tag filters', async () => {
      const tagA: string = 'tagA';
      const tagB: string = 'tagB';
      const summariesQuery: SummaryQueryInput = {
        page: 1,
        itemsPerPage: 10,
        createdAtSortOrder: SortOrderEnum.NewestFirst,
        tagFilters: [tagA, tagB]
      };
      const summaries = await libraryResolver.getSummaries(summariesQuery);
      expect(summaries.data.length).toBe(1);
      summaries.data.forEach((summary: SummaryDto) => {
        const containsTagA: boolean = summary.tags.includes(tagA);
        const containsTagB: boolean = summary.tags.includes(tagB);
        expect(containsTagA).toBe(true);
        expect(containsTagB).toBe(true);
      });
    });

    it('filters by tag case-insensitively', async () => {
      const tagA: string = 'tagA';
      const tagB: string = 'tagB';
      const tagAInput: string = 'TAGA';
      const tagBInput: string = 'tagb';
      const summariesQuery: SummaryQueryInput = {
        page: 1,
        itemsPerPage: 10,
        createdAtSortOrder: SortOrderEnum.NewestFirst,
        tagFilters: [tagAInput, tagBInput]
      };
      const summaries = await libraryResolver.getSummaries(summariesQuery);
      expect(summaries.data.length).toBe(1);
      summaries.data.forEach((summary: SummaryDto) => {
        const containsTagA: boolean = summary.tags.includes(tagA);
        const containsTagB: boolean = summary.tags.includes(tagB);
        expect(containsTagA).toBe(true);
        expect(containsTagB).toBe(true);
      });
    });
  });
});
