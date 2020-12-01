import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ApiModule } from '../swagger';
import { HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      ApiModule,
    ],}));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
