import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaFilterComponent } from './noticia-filter.component';

describe('NoticiaFilterComponent', () => {
  let component: NoticiaFilterComponent;
  let fixture: ComponentFixture<NoticiaFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticiaFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiaFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
