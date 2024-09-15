import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceiroListComponent } from './parceiro-list.component';

describe('ParceiroListComponent', () => {
  let component: ParceiroListComponent;
  let fixture: ComponentFixture<ParceiroListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParceiroListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParceiroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
