import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modelo } from '../../vo/modelo';

@Component({
  selector: 'app-modelo-item',
  templateUrl: './modelo-item.component.html',
  styleUrls: ['./modelo-item.component.scss']
})
export class ModeloItemComponent implements OnInit {

  @Input("modelo") modelo: Modelo;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }


  detalhar(marca) {   
    
  //  console.log(marca);
    this.router.navigate(['modelos/editar/' + marca.id]);
    
  }

}
