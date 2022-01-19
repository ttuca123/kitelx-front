import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Marca } from '../../vo/marca';

@Component({
  selector: 'app-marca-item',
  templateUrl: './marca-item.component.html',
  styleUrls: ['./marca-item.component.scss']
})
export class MarcaItemComponent implements OnInit {

@Input("marca") marca: Marca;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }


  detalhar(marca) {   
    
  //  console.log(marca);
    this.router.navigate(['marcas/editar/' + marca.id]);
    
  }

}
