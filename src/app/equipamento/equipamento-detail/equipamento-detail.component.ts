import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EquipamentoService } from '../../services/equipamento.service';
import { View } from '../../view';
import { Equipamento } from '../../vo/equipamento';

@Component({
  selector: 'app-equipamento-detail',
  templateUrl: './equipamento-detail.component.html',
  styleUrls: ['./equipamento-detail.component.scss']
})
export class EquipamentoDetailComponent extends View implements OnInit {

  equipamento: Equipamento;

  constructor( public dialog: MatDialog, public route: Router, public routeActivated: ActivatedRoute, public equipamentoService: EquipamentoService) { 

    super(dialog, route);
  }

  ngOnInit(): void {

    this.routeActivated.params.subscribe(parametros => {     

      const id = parametros['id'];
      
      this.carregarDadosEquipamento(id);      

    }, err => {

      console.log(err);
    });

  }

  carregarDadosEquipamento(id){

    this.exibirLoading();

    this.equipamentoService.findById(id).subscribe(result => {

      this.equipamento = result;
      this.fecharLoading();
    }, err => {

      console.log(err);
      this.fecharLoading();
    });

  }

}
