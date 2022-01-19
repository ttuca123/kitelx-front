import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Anuncio } from '../../vo/anuncio';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {

  
  anuncio: Anuncio;

  constructor(private routeActivated: ActivatedRoute) { }  

  ngOnInit(): void {

    this.routeActivated.params.subscribe(parametros => {      
      
      
      let anuncio = JSON.parse(parametros['anuncio']);  
      console.log(anuncio);      
      this.anuncio = anuncio;
      //alert('Anúncio: ' + anuncio.marca.descricao);
        
      

    }, err => {

      console.log(err);
    });
  
  }

}
