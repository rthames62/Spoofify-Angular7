import { TestBed } from '@angular/core/testing';

import { AlbumResolverService } from './album-resolver.service';

describe('AlbumResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumResolverService = TestBed.get(AlbumResolverService);
    expect(service).toBeTruthy();
  });
});
