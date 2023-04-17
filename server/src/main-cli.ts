import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrap() {
  await CommandFactory.run(AppModule, ['warn', 'error']);
}

bootstrap()
  .then(async app => {
    console.info('Finished');
    process.exit(0);
  })
  .catch(err => {
    console.error(`server failed to start command`, err);
    process.exit(1);
  });
