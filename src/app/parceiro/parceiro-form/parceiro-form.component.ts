import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ParceiroService } from '../../services/parceiro.service';
import { View } from '../../view';
import { Parceiro } from '../../vo/parceiro';

@Component({
  selector: 'app-parceiro-form',
  templateUrl: './parceiro-form.component.html',
  styleUrls: ['./parceiro-form.component.scss']
})
export class ParceiroFormComponent extends View implements OnInit {

  titulo: string;
  parceiro: Parceiro;

  constructor(public dialog: MatDialog, public route: Router, private parceiroService: ParceiroService) { 
    super(dialog, route);
  }

  ngOnInit(): void {
    this.titulo = 'Cadastro de Parceiro';
    this.parceiro = this.parceiroService.novo();
  }



}
