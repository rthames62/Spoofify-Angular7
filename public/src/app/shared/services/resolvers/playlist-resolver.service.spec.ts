import { TestBed } from '@angular/core/testing';

import { PlaylistResolverService } from './playlist-resolver.service';

describe('PlaylistResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaylistResolverService = TestBed.get(PlaylistResolverService);
    expect(service).toBeTruthy();
  });
});
