import { TestBed } from '@angular/core/testing';

import { GenreDetailsResolverService } from './genre-details-resolver.service';

describe('GenreDetailsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenreDetailsResolverService = TestBed.get(GenreDetailsResolverService);
    expect(service).toBeTruthy();
  });
});
