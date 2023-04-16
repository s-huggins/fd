import { Module } from '@nestjs/common';
import { OpenAIResolver } from './openai.resolver';
import { OpenAIService } from './openai.service';

@Module({
  providers: [OpenAIService, OpenAIResolver],
  exports: []
})
export class OpenAIModule {}
