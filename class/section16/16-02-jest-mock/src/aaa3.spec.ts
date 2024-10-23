import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  describe('gethello', () => {
    it('is test return hellow world', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  // describe("fetchBoard", () => {

  // })
  // describe("createBoard", () => {

  // })
});
