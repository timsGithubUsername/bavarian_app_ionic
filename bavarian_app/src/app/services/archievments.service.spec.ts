import { TestBed } from '@angular/core/testing';

import { ArchievmentsService } from './archievments.service';

describe('ArchievmentsService', () => {
  let service: ArchievmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchievmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
