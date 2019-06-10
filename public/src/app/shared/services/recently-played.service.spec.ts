import { TestBed } from '@angular/core/testing';

import { RecentlyPlayedService } from './recently-played.service';

describe('RecentlyPlayedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecentlyPlayedService = TestBed.get(RecentlyPlayedService);
    expect(service).toBeTruthy();
  });
});
