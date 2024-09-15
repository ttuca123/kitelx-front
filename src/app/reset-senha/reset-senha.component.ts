import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { View } from '../view';
import { LoginService } from '../services/login.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.scss']
})
export class ResetSenhaComponent extends View implements OnInit {

  creds = {
    id : null,
    authToken : '',
    hashSocial: '',
    nome: '',
    primeiroNome: '',
    ultimoNome : '',      
    email: '',
    fone: '',
    cpf:''
    
}  
  toppings = new FormControl();

  constructor(public dialog: MatDialog, public loginService: LoginService, ) {

    super(dialog, null);
   }

  ngOnInit(): void {
  }


  resetarSenha(){

    //alert('Email: '+ this.creds.email);

    this.exibirLoading();
    this.loginService.recuperarSenha(this.creds).subscribe(result => {

      this.exibirSucesso('Email enviado com sucesso.');
      this.fecharLoading();

    }, err => {

      console.log(err);
      this.exibirSucesso('Ocorreu um erro.');
      this.fecharLoading();
    });

  }

}
