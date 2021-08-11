import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();
  });

  describe('getUptime', () => {
    it('should return numberic value', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getUptime()).toEqual(expect.any(Number));
    });
  });
});
