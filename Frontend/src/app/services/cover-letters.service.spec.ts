import { TestBed } from '@angular/core/testing';

import { CoverLettersService } from './cover-letters.service';

describe('CoverLettersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoverLettersService = TestBed.get(CoverLettersService);
    expect(service).toBeTruthy();
  });
});
