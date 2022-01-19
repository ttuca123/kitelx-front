import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Router } from '@angular/router';

interface PatrocinioBanner {
  id: number;
  urlImagem: string;
  site: string;
}

@Component({
  selector: 'patrocinador-carousel',
  templateUrl: './patrocinador-carousel.component.html',
  styleUrls: ['./patrocinador-carousel.component.scss']
})
export class PatrocinadorCarouselComponent implements OnInit {

  
  banners = [];
  responsiveOptions: any;
  ban1 : PatrocinioBanner = {id:1, urlImagem: './assets/images/banners/banner_1.jpg', site: 'https://wa.me/5521995735225?text=Olá, estou interessado em anunciar minha marca na KiteLX.'};  
  ban2 : PatrocinioBanner = {id:2, urlImagem: './assets/images/banners/banner_patrocinador.jpg', site: 'https://wa.me/5521995735225?text=Olá, estou interessado em anunciar minha marca na KiteLX.'};  
  //isSmallScreen = breakpointObserver.isMatched('(max-width: 599px)');
  proporcao = '50';

  constructor(public breakPointObserver: BreakpointObserver,  public route: Router) {
  


   }

  ngOnInit(): void {

   this.banners.push(this.ban1);   
   //this.banners.push(this.ban2);  

   this.verificarMudancaSizeTela();

  }  

  irParaSite(site) {

    this.route.navigate(site);
  }

  verificarMudancaSizeTela() {
    this.breakPointObserver.observe([
      '(max-width: 768px)'
        ]).subscribe(result => {
          if (result.matches) {
            this.proporcao = '52';
          } else {
            // if necessary:
            this.proporcao = '30';
          }
        });

  }


}
