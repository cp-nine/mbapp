import { TestBed } from '@angular/core/testing';

import { TrxService } from './trx.service';

describe('TrxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrxService = TestBed.get(TrxService);
    expect(service).toBeTruthy();
  });
});
