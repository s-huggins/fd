import * as Joi from 'joi';
import * as path from 'path';

export interface IAppConfig {
  NODE_ENV: 'dev' | 'prod' | 'test';
  SERVER_PORT: number;
  MONGODB_URL: string;
  OPENAI_API_KEY: string;
}

export const APP_CONFIG = {
  isGlobal: true,
  envFilePath: path.resolve('..', '.env'),
  ignoreEnvFile: process.env.NODE_ENV === 'prod',
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('dev').required(),
    SERVER_PORT: Joi.number().required(),
    MONGODB_URL: Joi.string().required(),
    OPENAI_API_KEY: Joi.string().required()
  })
};
