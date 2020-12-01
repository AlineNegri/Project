import { TestBed, async, inject } from '@angular/core/testing';

import { NoLogedGuardGuard } from './no-loged-guard.guard';
import { ApiModule } from '../swagger';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from '../app.module';

describe('NoLogedGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ApiModule,
        AppModule,
      ],
      providers: [NoLogedGuardGuard]
    });
  });

  it('should ...', inject([NoLogedGuardGuard], (guard: NoLogedGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
