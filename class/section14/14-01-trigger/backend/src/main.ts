import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 추가
  app.enableCors({
    origin: 'http://127.0.0.1:5500', // 특정 도메인만 허용 (필요 시 수정)
    // credentials: true, // 인증 정보 허용 (옵션)
  });

  app.useGlobalPipes(new ValidationPipe()); // 문제 처리 예시
  app.useGlobalFilters(new HttpExceptionFilter()); // 예외 처리 셋팅
  app.use(graphqlUploadExpress());
  await app.listen(3000);
}
bootstrap();
