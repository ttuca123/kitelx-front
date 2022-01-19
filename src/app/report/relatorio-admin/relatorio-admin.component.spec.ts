import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioAdminComponent } from './relatorio-admin.component';

describe('RelatorioAdminComponent', () => {
  let component: RelatorioAdminComponent;
  let fixture: ComponentFixture<RelatorioAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
