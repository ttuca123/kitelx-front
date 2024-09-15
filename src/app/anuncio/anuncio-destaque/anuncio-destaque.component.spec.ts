import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AnuncioDestaqueComponent } from './anuncio-destaque.component';



describe('ListaAnunciosComponent', () => {
  let component: AnuncioDestaqueComponent;
  let fixture: ComponentFixture<AnuncioDestaqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnuncioDestaqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioDestaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
