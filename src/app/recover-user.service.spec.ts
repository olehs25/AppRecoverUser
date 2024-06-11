import { TestBed } from '@angular/core/testing';

import { RecoverUserService } from './recover-user.service';

describe('RecoverUserService', () => {
  let service: RecoverUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoverUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
