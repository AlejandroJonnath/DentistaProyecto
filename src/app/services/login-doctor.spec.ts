import { TestBed } from '@angular/core/testing';

import { LoginDoctor } from './login-doctor';

describe('LoginDoctor', () => {
  let service: LoginDoctor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginDoctor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
