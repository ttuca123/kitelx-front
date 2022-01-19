import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadingFotosComponent } from './uploading-fotos.component';

describe('UploadingFotosComponent', () => {
  let component: UploadingFotosComponent;
  let fixture: ComponentFixture<UploadingFotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadingFotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadingFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
