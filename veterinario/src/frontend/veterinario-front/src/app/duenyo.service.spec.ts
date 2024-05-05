import { TestBed } from '@angular/core/testing';

import { DuenyoService } from './duenyo.service';

describe('DuenyoService', () => {
  let service: DuenyoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuenyoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
