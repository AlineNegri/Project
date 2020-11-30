import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ApiModule } from '../swagger';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ApiModule,
    ],}));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
