import { Test, TestingModule } from '@nestjs/testing';
import { RequestInfoProvider } from './request-info.provider';

describe('RequestInfoProvider', () => {
  let provider: RequestInfoProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestInfoProvider],
    }).compile();

    provider = await module.resolve<RequestInfoProvider>(RequestInfoProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
