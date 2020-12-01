import { TestBed } from '@angular/core/testing';

import { InterceptorService } from './interceptor.service';
import { ApiModule } from '../swagger';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from '../app.module';

describe('InterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      AppModule,
      ApiModule,
    ],}));

  it('should be created', () => {
    const service: InterceptorService = TestBed.get(InterceptorService);
    expect(service).toBeTruthy();
  });
});
