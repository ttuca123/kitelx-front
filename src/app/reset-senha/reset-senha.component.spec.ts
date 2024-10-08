import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetSenhaComponent } from './reset-senha.component';

describe('ResetSenhaComponent', () => {
  let component: ResetSenhaComponent;
  let fixture: ComponentFixture<ResetSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
