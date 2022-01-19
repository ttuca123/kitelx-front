import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioFormComponent } from './anuncio-form.component';

describe('AnuncioFormComponent', () => {
  let component: AnuncioFormComponent;
  let fixture: ComponentFixture<AnuncioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnuncioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
