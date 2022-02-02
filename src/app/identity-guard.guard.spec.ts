import { TestBed } from '@angular/core/testing';

import { IdentityGuard } from './identity-guard.guard';

describe('IdentityGuard', () => {
  let guard: IdentityGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IdentityGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
