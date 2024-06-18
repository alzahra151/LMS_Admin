import { TestBed } from '@angular/core/testing';

import { LeasonsServicesService } from './leasons-services.service';

describe('LeasonsServicesService', () => {
  let service: LeasonsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeasonsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
