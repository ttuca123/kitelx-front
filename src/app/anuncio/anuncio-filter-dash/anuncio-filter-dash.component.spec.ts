import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioFilterDashComponent } from './anuncio-filter-dash.component';

describe('AnuncioFilterDashComponent', () => {
  let component: AnuncioFilterDashComponent;
  let fixture: ComponentFixture<AnuncioFilterDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnuncioFilterDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioFilterDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
