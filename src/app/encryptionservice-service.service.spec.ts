import { TestBed } from '@angular/core/testing';

import { EncryptionserviceServiceService } from './encryptionservice-service.service';

describe('EncryptionserviceServiceService', () => {
  let service: EncryptionserviceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptionserviceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
