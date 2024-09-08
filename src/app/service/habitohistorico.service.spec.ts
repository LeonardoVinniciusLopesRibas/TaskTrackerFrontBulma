import { TestBed } from '@angular/core/testing';

import { HabitohistoricoService } from './habitohistorico.service';

describe('HabitohistoricoService', () => {
  let service: HabitohistoricoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitohistoricoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
