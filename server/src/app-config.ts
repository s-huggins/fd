import * as Joi from 'joi';
import * as path from 'path';

export interface IAppConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  MONGODB_URI: string;
  OPENAI_API_KEY: string;
}

export const APP_CONFIG = {
  isGlobal: true,
  envFilePath: path.resolve('..', '.env'),
  ignoreEnvFile: process.env.NODE_ENV === 'production',
  validationSchema: Joi.object<IAppConfig>({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development').required(),
    PORT: Joi.number().required(),
    MONGODB_URI: Joi.string().required(),
    OPENAI_API_KEY: Joi.string().required()
  })
};
