import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAnunciosComponent } from './my-anuncios.component';

describe('MyAnunciosComponent', () => {
  let component: MyAnunciosComponent;
  let fixture: ComponentFixture<MyAnunciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAnunciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
