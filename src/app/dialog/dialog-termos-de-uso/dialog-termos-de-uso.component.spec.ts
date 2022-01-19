import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTermosdeUsoComponent } from './dialog-termos-de-uso.component';

describe('DialogSimplesComponent', () => {
  let component: DialogTermosdeUsoComponent;
  let fixture: ComponentFixture<DialogTermosdeUsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTermosdeUsoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTermosdeUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
