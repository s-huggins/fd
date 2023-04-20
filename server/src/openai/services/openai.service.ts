import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
  CreateChatCompletionResponseChoicesInner,
  OpenAIApi
} from 'openai';
import { IAppConfig } from 'src/app-config';
import { OpenAISummary } from '../dtos/openai-summary.dto';
import { RequestSummaryInput } from '../dtos/request-summary.dto';
import { ISummaryResponse } from '../interfaces/openai-summary-response.interface';

@Injectable()
export class OpenAIService {
  private static readonly endpoint: string = 'https://api.openai.com/v1/chat/completions';

  private readonly _api: OpenAIApi;

  constructor(private readonly _configService: ConfigService<IAppConfig>) {
    const configuration = new Configuration({
      apiKey: this._configService.get<string>('OPENAI_API_KEY')
    });
    this._api = new OpenAIApi(configuration);
  }

  public async getSummary(summaryRequest: RequestSummaryInput): Promise<OpenAISummary> {
    try {
      const request: CreateChatCompletionRequest = this.makeChatRequest(summaryRequest.text);
      const response = await this._api.createChatCompletion(request);
      const responseOk: boolean = response.status.toString().startsWith('2');
      if (!responseOk) {
        throw new Error('Not OK');
      }
      const summary: OpenAISummary = this.extractSummary(response.data);
      return summary;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to get AI summary');
    }
  }

  private extractSummary(response: CreateChatCompletionResponse): OpenAISummary {
    const aiChatResponse: CreateChatCompletionResponseChoicesInner = response.choices.find(
      (choice: CreateChatCompletionResponseChoicesInner) =>
        choice.message.role === ChatCompletionRequestMessageRoleEnum.Assistant
    );
    const content: ISummaryResponse = JSON.parse(aiChatResponse.message.content) as ISummaryResponse;
    return new OpenAISummary(response.id, content.summary, content.tags);
  }

  private makeChatRequest(text: string): CreateChatCompletionRequest {
    return {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: this.prepareRequestContent(text)
        }
      ]
    };
  }

  private prepareRequestContent(content: string) {
    const requestContent: string = `
      Given the following text: '${content}', generate a summary with further details, and also create a number of related keywords called tags.
      Your response should be strict JSON exactly matching the format: '{ \"summary\": \"summary text\", \"tags\": [\"tag1\", \"tag2\"] }.
    `;
    return requestContent;
  }
}
