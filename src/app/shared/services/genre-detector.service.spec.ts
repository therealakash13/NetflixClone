import { TestBed } from '@angular/core/testing';

import { GenreDetectorService } from './genre-detector.service';

describe('GenreDetectorService', () => {
  let service: GenreDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenreDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
