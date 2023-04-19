import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_CONFIG } from './app-config';
import { AppController } from './app.controller';
import { CommonModule } from './common/common.module';
import { LibraryModule } from './library/library.module';
import { OpenAIModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot(APP_CONFIG),
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
  providers: []
})
export class AppModule {}
