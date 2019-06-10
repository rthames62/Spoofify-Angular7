import { TestBed } from '@angular/core/testing';

import { NewReleasesResolverService } from './new-releases-resolver.service';

describe('NewReleasesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewReleasesResolverService = TestBed.get(NewReleasesResolverService);
    expect(service).toBeTruthy();
  });
});
