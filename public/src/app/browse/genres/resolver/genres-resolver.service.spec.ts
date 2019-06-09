import { TestBed } from '@angular/core/testing';

import { GenresResolverService } from './genres-resolver.service';

describe('GenresResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenresResolverService = TestBed.get(GenresResolverService);
    expect(service).toBeTruthy();
  });
});
