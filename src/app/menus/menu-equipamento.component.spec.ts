import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEquipamentoComponent } from './menu-equipamento.component';

describe('MenuEquipamentoComponent', () => {
  let component: MenuEquipamentoComponent;
  let fixture: ComponentFixture<MenuEquipamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuEquipamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
