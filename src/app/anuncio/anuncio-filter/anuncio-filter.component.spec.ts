import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioFilterComponent } from './anuncio-filter.component';

describe('AnuncioFilterComponent', () => {
  let component: AnuncioFilterComponent;
  let fixture: ComponentFixture<AnuncioFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnuncioFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
