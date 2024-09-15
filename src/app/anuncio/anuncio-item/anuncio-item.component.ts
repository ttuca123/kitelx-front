import { Component, OnInit, Input, OnChanges, SimpleChanges, ɵConsole } from '@angular/core';
import { Anuncio } from '../../vo/anuncio';
import {  Router } from '@angular/router';
import { AnuncioService } from '../../services/anuncio.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { animateChild } from '@angular/animations';

@Component({
  selector: 'anuncio-item',
  templateUrl: './anuncio-item.component.html',
  styleUrls: ['./anuncio-item.component.scss']
})
export class AnuncioItemComponent implements OnInit {

  responsiveOptions;
  pagina = 0;

  @Input('anuncio')
  anuncio: Anuncio;

  @Input('viewLoading')
  viewLoading: any; 
  

  @Input('bloqueio')
  bloqueio: any;

  fotoPrincipal: any;  
  proporcao = '50';

  defaultImage = 'https://anuncios-kitelx.s3-us-west-1.amazonaws.com/lx_novo.jpg';

  constructor(public router: Router, private anuncioService: AnuncioService, public breakPointObserver: BreakpointObserver) {

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];

  }

  ngOnInit(): void {
   // console.log(this.anuncio);

    if(this.anuncio !=null){
      if( this.anuncio.fotos.length==0) {
        
        this.fotoPrincipal = {
          id: 1,
          nome: 'https://anuncios-kitelx.s3-us-west-1.amazonaws.com/lx_novo.jpg'
        //nome: ''
        }
        this.anuncio.fotos.push(this.fotoPrincipal);

      }else{
        this.fotoPrincipal = {
          id: 1,
          nome: this.anuncio.fotos[0].nome
        }
      }
    }

    this.verificarMudancaSizeTela();
  }

  verificarMudancaSizeTela() {
    this.breakPointObserver.observe([
      '(max-width: 768px)'
        ]).subscribe(result => {
          if (result.matches) {
            this.proporcao = '82';
          } else {
            // if necessary:
            this.proporcao = '60';
          }
        });

  }

  /*ngOnChanges(changes: SimpleChanges){

    //console.clear();
    console.log(changes);

  } */

  detalhar(anuncio) {
    
    
    this.router.navigate(['/anuncio/detalhar/' +anuncio.tipo.descricao +  '/' + anuncio.marca.descricao + '/' + anuncio.id]);
    
  }

  


}
