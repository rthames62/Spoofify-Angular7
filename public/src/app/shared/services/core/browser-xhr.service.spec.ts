import { TestBed } from '@angular/core/testing';

import { BrowserXhrService } from './browser-xhr.service';

describe('BrowserXhrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrowserXhrService = TestBed.get(BrowserXhrService);
    expect(service).toBeTruthy();
  });
});
