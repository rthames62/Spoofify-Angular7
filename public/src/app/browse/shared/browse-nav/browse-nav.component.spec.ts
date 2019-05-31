import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseNavComponent } from './browse-nav.component';

describe('BrowseNavComponent', () => {
  let component: BrowseNavComponent;
  let fixture: ComponentFixture<BrowseNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
