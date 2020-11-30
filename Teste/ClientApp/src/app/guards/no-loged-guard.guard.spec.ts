import { TestBed, async, inject } from '@angular/core/testing';

import { NoLogedGuardGuard } from './no-loged-guard.guard';

describe('NoLogedGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoLogedGuardGuard]
    });
  });

  it('should ...', inject([NoLogedGuardGuard], (guard: NoLogedGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
