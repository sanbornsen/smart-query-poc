import { SmartQueryModule } from './smart-query.module';

describe('SmartQueryModule', () => {
  let smartQueryModule: SmartQueryModule;

  beforeEach(() => {
    smartQueryModule = new SmartQueryModule();
  });

  it('should create an instance', () => {
    expect(smartQueryModule).toBeTruthy();
  });
});
