import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { View } from '../../../view';
import { MatDialog, MatSnackBar, TooltipPosition } from '@angular/material';
import { FormControl } from '@angular/forms';
import { GoogleLoginProvider, AuthService } from 'angularx-social-login';
import { UsuarioService } from '../../../services/usuario.service';
import { AnuncioService } from '../../../services/anuncio.service';
import { FotoService } from '../../../services/foto.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent extends View {

  labelLogin: any;
  localUser: any;
  logado: boolean;
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  exibirMenuAdministrativo = false;

  constructor(public googleService: AuthService, public route: Router, public storage: StorageService,
    public usuarioService: UsuarioService, private fotoService: FotoService, public dialog: MatDialog) {

    super(dialog, route);
    this.localUser = this.storage.getLocalUser();   

    this.preencherDadosUsuario(this.localUser);

    if (this.localUser != null) {

      this.labelLogin = this.localUser.email !== '' ? 'Sair' : 'Entrar';
    } else {
      this.labelLogin = 'Entrar';
    }

    this.verificarUsuarioLogado();
  }

  irParaPerfil() {
    this.route.navigate(['/perfil-usuario']);
  } 

  gerenciarSpots() {
    
    this.route.navigate(['/spot/filtro']);
    
  }  

  gerenciarMenu() {
    
    this.exibirMenuAdministrativo=!this.exibirMenuAdministrativo;
    
  }

  verificarUsuarioLogado() {

    if (this.localUser !== undefined && this.localUser!=null) {
      this.logado = true;
      this.usuarioService.findById(this.localUser.id).subscribe(result => {
        this.logado = true;

      }, err => {
        console.error(err);
        this.logado = false;
      });
    } else {

      this.logado = false;
    }
  }

  irParaMeusAnuncios() {

    if (this.logado) {
      this.route.navigate(["/meus-anuncios"]);
    } else {
      this.route.navigate(["/login"]);
    }

  }

  anunciar() {

    if (this.usuario.id != null) {

      this.route.navigate(["/anuncio/anunciar"]);

    } else {

      this.route.navigate(['/registro-usuario']);

    }
  }

  logout() {

    this.route.navigate(['/pagina-inicial']);
    this.setDefaultPic();
    this.localUser = null;
    this.storage.setLocalUser(this.localUser);
    this.usuario.id = null;
    console.clear();

    this.googleService.signOut().then(result => {

      console.log(result);

    }, err => {
      console.log(err);
    });
  }

  login() {

    this.route.navigate(['login']);
    
  }

  loginComParametros(parametro) {
    if (this.storage.getLocalUser() != undefined || this.storage.getLocalUser() != null) {
      this.route.navigate([parametro]);
    } else {
      const dadosParametros = {
        redirectAfterTo: parametro
      }
      this.route.navigate(['login', dadosParametros]);
    }
  }

  trocarSenha(){
    
    this.route.navigate(['nova-senha/'+this.storage.getLocalUser().email]);
    
  }

  sincronizacaoS3() {
    
    this.exibirLoading();

    this.fotoService.sincronizarS3()
    .subscribe(r=> {
      this.fecharLoading();
      alert('Fotos Sincronizadas Com Sucesso');
    }, err=> {

      alert('Ocorreu um erro na sincronização das fotos.');
      console.clear();
      console.error('erro sicronização: ' + JSON.stringify(err));
      this.fecharLoading();
    }); 
    
  }
  

}
