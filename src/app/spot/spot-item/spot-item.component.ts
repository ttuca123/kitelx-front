import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Spot } from '../../vo/spot';

@Component({
  selector: 'app-spot-item',
  templateUrl: './spot-item.component.html',
  styleUrls: ['./spot-item.component.scss']
})
export class SpotItemComponent implements OnInit {

  responsiveOptions;
  pagina = 0;

  @Input('spot')
  spot: Spot; 

  mesInicio: any;
  mesFim: any;
  fotoSpot: any;

  constructor(public router: Router) {

  }

  ngOnInit(): void {  

    if(this.spot.fotos.length>0){
      this.fotoSpot = this.spot.fotos[0];
    }else{
      this.fotoSpot = {
        id: 0,
        nome: 'http://kitelx.com.br/assets/images/logo_300x300.png'
      }
    }

    this.mesInicio = this.spot.meses[0].nome;
    this.mesFim = this.spot.meses[this.spot.meses.length-1].nome;
  }

  detalhar(spot) {
    this.router.navigate(["/spot/detalhe/" + spot.id]);
  }


}
