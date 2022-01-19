import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Equipamento } from '../../vo/equipamento';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { Usuario } from '../../vo/usuario';


@Component({
  selector: 'equipamento-item',
  templateUrl: './equipamento-item.component.html',
  styleUrls: ['./equipamento-item.component.scss']
})
export class EquipamentoItemComponent implements OnInit {

  responsiveOptions;
  pagina = 0;
  bloqueio = true;

  @Input('equipamento')
  equipamento: Equipamento;

  @Output('usuario')
  usuario: Usuario;

  @Output('edit')
  edit: any;

  @Output() acaoEquipamento = new EventEmitter<any>();

  constructor(public route: Router, public _bottomSheet: MatBottomSheet) { 
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

  }  
  
  verificarAcaoEquipamento(equipamento){
    
    this.acaoEquipamento.emit(equipamento);

  }  

}
