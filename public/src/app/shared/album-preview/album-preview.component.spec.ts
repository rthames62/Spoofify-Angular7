import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPreviewComponent } from './album-preview.component';

describe('AlbumPreviewComponent', () => {
  let component: AlbumPreviewComponent;
  let fixture: ComponentFixture<AlbumPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
