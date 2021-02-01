import { TestBed } from '@angular/core/testing';

import { ServiceBNCService } from './service-bnc.service';

describe('ServiceBNCService', () => {
  let service: ServiceBNCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceBNCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
