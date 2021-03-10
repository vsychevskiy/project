import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './services/config/config.services';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.create(AppModule);
  const port = config.get('port');
  const host = config.get('host');

  await app.listen(port, host, () => {
    console.log(`Server is running http://${host}:${port}/`);
  });
}
bootstrap();
