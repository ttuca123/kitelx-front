import { Component, OnInit } from '@angular/core';
import { View } from '../view';
import { MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.scss']
})
export class NovaSenhaComponent extends View implements OnInit {

  toppings = new FormControl();

  constructor(public activatedRoute: ActivatedRoute,
    public route: Router,
    public dialog: MatDialog,
    public loginService: LoginService,
    public storageService: StorageService) {

    super(dialog, route);
   }

    ngOnInit(): void {      
     
      this.preencherDadosUsuario(this.storageService.getLocalUser());
      this.novoToken();
      
  }

  onSubmit(){    

    let creds = {
      email: this.usuario.email,
      senhaHash: this.usuario.senhaHash,
      senha: this.usuario.senha 

    }

    this.exibirLoading();
    this.loginService.novaSenha(creds).subscribe(result => {

      this.exibirSucesso('Senha Alterada com sucesso.');
      this.fecharLoading();
      
      setTimeout( () => { 

        this.route.navigate(["/pagina-inicial"]); 

       }, 2000);

    }, err => {

      console.log(err);
      this.exibirSucesso('Ocorreu um erro.');
      this.fecharLoading();
    });

  }

  novoToken() {

    this.exibirLoading();

    this.loginService.novoToken(this.usuario.email)
    .subscribe(result =>  {
      
      this.fecharLoading();
      this.usuario.senhaHash = result.senhaHash;      

    }, err=> {

      this.fecharLoading();
      console.log(err);
    });

  }

}
