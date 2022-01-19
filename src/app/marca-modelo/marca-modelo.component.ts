import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-marca-modelo',
  templateUrl: './marca-modelo.component.html',
  styleUrls: ['./marca-modelo.component.scss']
})
export class MarcaModeloComponent implements OnInit {

  tipo: '';
 

  constructor(private routeActivated: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {

    this.routeActivated.params.subscribe(parametros => {

      if(parametros['id']!=undefined){
        this.tipo=parametros['id'];
      }

    });
  }

  enviar(event) {

    this.route.navigate(['marca-modelo/novo']);  
  }


}
