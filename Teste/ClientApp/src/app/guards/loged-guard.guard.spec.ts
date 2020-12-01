import { TestBed, async, inject } from '@angular/core/testing';

import { LogedGuardGuard } from './loged-guard.guard';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from '../swagger';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppModule } from '../app.module';

describe('LogedGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        ApiModule,
        RouterModule,
        AppModule,
      ],
      providers: [LogedGuardGuard]
    });
  });

  it('should ...', inject([LogedGuardGuard], (guard: LogedGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
