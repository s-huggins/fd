import { Injectable } from '@nestjs/common';
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  CreateChatCompletionRequest,
  CreateChatCompletionResponseChoicesInner,
  OpenAIApi
} from 'openai';
import { OpenAISummary } from './dtos/openai-summary.dto';
import { RequestSummaryInput } from './dtos/request-summary.dto';
import { ISummaryResponse } from './interfaces/openai-summary-response.interface';

@Injectable()
export class OpenAIService {
  private static readonly endpoint: string = 'https://api.openai.com/v1/chat/completions';

  private readonly _api: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    });
    this._api = new OpenAIApi(configuration);
  }

  public async getSummary(summaryRequest: RequestSummaryInput): Promise<OpenAISummary> {
    try {
      const chatRequest: CreateChatCompletionRequest = {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: this.prepareRequestContent(summaryRequest.text)
          }
        ]
      };
      const response = await this._api.createChatCompletion(chatRequest);
      const responseOk: boolean = response.status.toString().startsWith('2');
      if (!responseOk) {
        throw new Error('Not OK');
      }
      const aiChatResponse = response.data.choices.find(
        (choice: CreateChatCompletionResponseChoicesInner) =>
          choice.message.role === ChatCompletionRequestMessageRoleEnum.Assistant
      );
      const content = JSON.parse(aiChatResponse.message.content) as ISummaryResponse;
      return new OpenAISummary(content.summary, content.tags, new Date());
    } catch (err) {
      console.log(err);
      throw new Error('Failed to get AI summary');
    }
  }

  private prepareRequestContent(content: string) {
    const requestContent: string = `
      Given the following text: '${content}', generate a summary with further details, and also create a number of related keywords called tags.
      Your response should be strict JSON exactly matching the format: '{ \"summary\": \"summary text\", \"tags\": [\"tag1\", \"tag2\"] }.
    `;
    return requestContent;
  }
}
