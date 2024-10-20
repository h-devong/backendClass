import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //문제 처리 예시// 0이하로 수정 불가
  app.useGlobalFilters(new HttpExceptionFilter()); // 예외 처리 셋팅
  await app.listen(3000);
}
bootstrap();
