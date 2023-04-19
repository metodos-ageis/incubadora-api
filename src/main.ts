import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all routes if in development mode
  // if (process.env.NODE_ENV === 'development') {
  //   app.enableCors();
  // } else {
  //   const clientUrl = process.env.CLIENT_URL;
  //   app.enableCors({ origin: clientUrl });
  // }
  app.enableCors();
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
