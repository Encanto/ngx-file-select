import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileBrowseComponent } from './file-browse.component';

describe('FileBrowseComponent', () => {
  let component: FileBrowseComponent;
  let fixture: ComponentFixture<FileBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileBrowseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
