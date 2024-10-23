import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

class MockAppService {
  getHello(): string {
    return 'Im fake';
  }
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useClass: MockAppService,
        },
      ],
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
