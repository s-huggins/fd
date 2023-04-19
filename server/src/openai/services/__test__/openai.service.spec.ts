import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { OpenAISummary } from '../../dtos/openai-summary.dto';
import { RequestSummaryInput } from '../../dtos/request-summary.dto';
import { OpenAIService } from '../openai.service';

const MAX_TIMEOUT: number = 20000;

interface IRequestTestData {
  highlightedText: string;
}

describe('OpenAIService', () => {
  let openAIService: OpenAIService;
  let app: TestingModule;

  // test (un)mount steps

  beforeEach(async () => {
    // mount app context
    app = await Test.createTestingModule({
      providers: [AppModule, ConfigModule, OpenAIService, ConfigService]
    }).compile();
    openAIService = app.get<OpenAIService>(OpenAIService);
  });

  afterEach(async () => {
    // unmount app context
    app.close();
  });

  // connection alive (api token still valid, etc)
  it(
    'should connect with OpenAI',
    async () => {
      const summaryRequest: RequestSummaryInput = { text: 'Hello API' };
      try {
        await openAIService.getSummary(summaryRequest);
      } catch (err) {
        throw new Error('API connection failed');
      }
    },
    MAX_TIMEOUT
  );

  // sample requests tests

  // happy path
  const requestInputSamples: IRequestTestData[] = [
    {
      highlightedText: 'Hello API'
    }
  ];

  // weird requests
  // TODO: space these further requests out to circumvent the API rate limiting
  const miscellaneousRequestInputSamples: IRequestTestData[] = [
    {
      // empty
      highlightedText: ''
    },
    {
      // gibberish
      highlightedText: 'kajfHUIEHsaoijr301831UIVDSU981'
    },
    {
      // null
      highlightedText: null
    },
    {
      // undefined
      highlightedText: undefined
    }
  ];

  describe.each(requestInputSamples)('highlightedText: $highlightedText', ({ highlightedText }) => {
    test(
      'should return expected response shape',
      async () => {
        const summaryRequest: RequestSummaryInput = { text: highlightedText };
        const response: OpenAISummary = await openAIService.getSummary(summaryRequest);
        assertOutput(response);
      },
      MAX_TIMEOUT
    );
  });
});

const assertOutput = (output: OpenAISummary) => {
  // correct type
  expect(typeof output.content).toBe('string');

  // correct type
  expect(typeof output.id).toBe('string');
  // have id
  expect(output.content).toBeTruthy();

  // correct array type (although possibly empty)
  // every element is valid
  expect(Array.isArray(output.tags)).toBe(true);
  output.tags.forEach((tag: string) => {
    expect(typeof tag).toBe('string');
  });
};
