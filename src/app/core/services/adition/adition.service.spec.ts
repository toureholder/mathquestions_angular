import { TestBed } from '@angular/core/testing';

import { AditionService } from './adition.service';

describe('AditionService', () => {
  let service: AditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getProblem', () => {
    it('should return a value', () => {
      expect(service.getProblem()).toBeTruthy();
    });
  });
});
