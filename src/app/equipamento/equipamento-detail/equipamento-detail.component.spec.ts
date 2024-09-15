import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoDetailComponent } from './equipamento-detail.component';

describe('EquipamentoDetailComponent', () => {
  let component: EquipamentoDetailComponent;
  let fixture: ComponentFixture<EquipamentoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipamentoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
