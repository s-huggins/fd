import { Module } from '@nestjs/common';

import { OpenAIResolver } from './resolvers/openai.resolver';
import { OpenAIService } from './services/openai.service';

@Module({
  providers: [OpenAIService, OpenAIResolver],
  exports: [OpenAIService]
})
export class OpenAIModule {}
