/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { BalanceService } from './balance.service';

describe('Service: Balance', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BalanceService]
    });
  });

  it('should ...', inject([BalanceService], (service: BalanceService) => {
    expect(service).toBeTruthy();
  }));
});
