import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceiroDetailComponent } from './parceiro-detail.component';

describe('ParceiroDetailComponent', () => {
  let component: ParceiroDetailComponent;
  let fixture: ComponentFixture<ParceiroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParceiroDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParceiroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
