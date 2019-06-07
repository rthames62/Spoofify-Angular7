import { TestBed } from '@angular/core/testing';

import { OverviewResolverService } from './overview-resolver.service';

describe('OverviewResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OverviewResolverService = TestBed.get(OverviewResolverService);
    expect(service).toBeTruthy();
  });
});
