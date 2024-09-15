import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('AuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [HttpClient]
  }));

  it('should be created', () => {
    const service: AuthGuard = new AuthGuard(null, null);
    expect(service).toBeTruthy();
  });
});
