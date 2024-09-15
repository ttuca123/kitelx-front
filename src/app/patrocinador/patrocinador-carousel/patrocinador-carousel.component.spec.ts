import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrocinadorCarouselComponent } from './patrocinador-carousel.component';

describe('PatrocinadorCarouselComponent', () => {
  let component: PatrocinadorCarouselComponent;
  let fixture: ComponentFixture<PatrocinadorCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrocinadorCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrocinadorCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
