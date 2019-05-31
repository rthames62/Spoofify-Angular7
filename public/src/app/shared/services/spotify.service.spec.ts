import { TestBed } from '@angular/core/testing';

import { SpotifyConnectService } from './spotify-connect.service';

describe('SpotifyConnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotifyConnectService = TestBed.get(SpotifyConnectService);
    expect(service).toBeTruthy();
  });
});
