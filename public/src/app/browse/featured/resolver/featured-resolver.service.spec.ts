import { TestBed } from '@angular/core/testing';

import { FeaturedResolverService } from './featured-resolver.service';

describe('FeaturedResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeaturedResolverService = TestBed.get(FeaturedResolverService);
    expect(service).toBeTruthy();
  });
});
