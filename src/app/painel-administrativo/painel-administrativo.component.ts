import { Component, OnInit } from '@angular/core';
import { MenuItems } from '../shared/menu-items/menu-items';

@Component({
  selector: 'app-painel-administrativo',
  templateUrl: './painel-administrativo.component.html',
  styleUrls: ['./painel-administrativo.component.scss']
})
export class PainelAdministrativoComponent {

  itens: any;

  constructor(itens: MenuItems) { 
    
    this.itens = itens.getMenuAdminItem();
  }
}
