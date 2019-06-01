import { TestBed } from '@angular/core/testing';

import { ArtistResolverService } from './artist-resolver.service';

describe('ArtistResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtistResolverService = TestBed.get(ArtistResolverService);
    expect(service).toBeTruthy();
  });
});
