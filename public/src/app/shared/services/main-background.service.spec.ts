import { TestBed } from '@angular/core/testing';

import { MainBackgroundService } from './main-background.service';

describe('MainBackgroundService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainBackgroundService = TestBed.get(MainBackgroundService);
    expect(service).toBeTruthy();
  });
});
