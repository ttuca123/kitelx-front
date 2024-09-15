import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExcluirComponent } from './dialog-excluir.component';

describe('DialogExcluirComponent', () => {
  let component: DialogExcluirComponent;
  let fixture: ComponentFixture<DialogExcluirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogExcluirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
