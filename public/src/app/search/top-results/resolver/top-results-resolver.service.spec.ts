import { TestBed } from '@angular/core/testing';

import { TopResultsResolverService } from './top-results-resolver.service';

describe('TopResultsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopResultsResolverService = TestBed.get(TopResultsResolverService);
    expect(service).toBeTruthy();
  });
});
