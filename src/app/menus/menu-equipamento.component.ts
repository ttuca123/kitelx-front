import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialog } from '@angular/material';
import { Equipamento } from '../vo/equipamento';
import { View } from '../view';
import { EquipamentoService } from '../services/equipamento.service';


@Component({
  selector: 'app-menu-equipamento',
  templateUrl: './menu-equipamento.component.html',
  styleUrls: ['./menu-equipamento.component.css']
})
export class MenuEquipamentoComponent extends View implements OnDestroy{

  equipamento: Equipamento;
  acao: number; //1 - Anuncio //2 - Exclusão

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private _bottomSheetRef: MatBottomSheetRef<MenuEquipamentoComponent>,
  public dialog: MatDialog) {

    super(dialog, null);
    this.equipamento = this.data['equipamento'];
  }

  openLink(event: MouseEvent): void {
    
    const result = {
      equipamento: this.equipamento,
      acao: this.acao
    }

    this._bottomSheetRef.dismiss(result);
    

    event.preventDefault();
  }

  detalhar(event){
    
    this.acao = 4; //Editar    
    this.openLink(event);   

  }

  editar(event){

    this.acao = 3; //Editar    
    this.openLink(event);
  } 


  excluir(event){

    this.acao = 2; //Excluir  
    this.openLink(event);
  } 

  anunciar(event){

    this.acao = 1;    
    this.openLink(event);
  }

  ngOnDestroy() {


  }

}
