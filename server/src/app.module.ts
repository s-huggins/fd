import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { LibraryModule } from './library/library.module';
import { OpenAIModule } from './openai/openai.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: {
        'graphql-ws': true
      }
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    LibraryModule,
    CommonModule,
    OpenAIModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
