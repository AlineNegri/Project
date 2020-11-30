import { TestBed } from '@angular/core/testing';

import { InterceptorService } from './interceptor.service';
import { ApiModule } from '../swagger';

describe('InterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ApiModule,
    ],}));

  it('should be created', () => {
    const service: InterceptorService = TestBed.get(InterceptorService);
    expect(service).toBeTruthy();
  });
});
