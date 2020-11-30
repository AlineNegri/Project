import { TestBed, async, inject } from '@angular/core/testing';

import { LogedGuardGuard } from './loged-guard.guard';

describe('LogedGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogedGuardGuard]
    });
  });

  it('should ...', inject([LogedGuardGuard], (guard: LogedGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
