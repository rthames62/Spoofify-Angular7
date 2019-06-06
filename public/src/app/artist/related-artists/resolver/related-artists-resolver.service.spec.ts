import { TestBed } from '@angular/core/testing';

import { RelatedArtistsResolverService } from './related-artists-resolver.service';

describe('RelatedArtistsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelatedArtistsResolverService = TestBed.get(RelatedArtistsResolverService);
    expect(service).toBeTruthy();
  });
});
