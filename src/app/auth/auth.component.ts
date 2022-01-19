import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../services/login.service';
import { TipoLogin } from '../enum/tipo-login';
import { Usuario } from '../vo/usuario';
import { SocialUser, AuthService } from 'angularx-social-login';
import { View } from '../view';
import { MatDialog } from '@angular/material';
import { StorageService } from '../services/storage.service';
import { FormControl } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends View implements OnInit {

  constructor(public googleService: AuthService, public route: Router, public loginService: LoginService, 
    public dialog: MatDialog,
    public storage: StorageService, public usuarioService: UsuarioService,
    public routeActivated: ActivatedRoute) {

    super(dialog, route);

  }


  username: string;
  password: string;
  loggedIn: any;
  socialUser: SocialUser;
  error = false;
  toppings = new FormControl();
  redirecionamento: '';

  ngOnInit() {
   
    /*this.routeActivated.params.subscribe(parametros => {
      this.redirecionamento = parametros['redirectAfterTo'];
      this.redirecionamento.replace('%2', '');
    })*/
  }

  onSubmit(): void {


  }

  signInWithGoogle(): void {    

    this.loginService.loginGoogle().then(result => {

      this.socialUser = result;

      this.preencherDadosGoogleLogin();      
    }, err => {

      console.log(err);

    });
  }

  preencherDadosGoogleLogin() {

    //this.usuario.id = +this.socialUser.id;
    this.usuario.hashSocial = this.socialUser.idToken;
    this.usuario.tipo = this.socialUser.authToken.length > 0 ? TipoLogin.GoogleSocial : TipoLogin.Default;
    this.usuario.nome = this.socialUser.name;
    this.usuario.primeiroNome = this.socialUser.firstName;
    this.usuario.ultimoNome = this.socialUser.lastName;
    this.usuario.email = this.socialUser.email;
    this.usuario.fotoUrl = this.socialUser.photoUrl;
    this.exibirLoading();
    this.usuarioService.findUsuarioSocialValido(this.usuario).subscribe(result => {
      this.fecharLoading();

      const token = result.token;
      const tokenAuth = (token != null && token != '') ? token.substring(7) : '';

      const usuario = {
        id: result.id,
        authToken: tokenAuth,
        hashSocial: '',
        nome: '',
        primeiroNome: result.primeiroNome,
        ultimoNome: result.ultimoNome,
        email: result.email,
        fone: result.fone,
        cpf: result.cpf,
        senha: '',
        contraSenha: '',
        senhaTemporaria: result.senhaTemporaria,
        foto: result.fotoUrl,
        perfil: result.perfil.id,
        tipo: result.tipo,
        equipamentos: [],
        totalEquipamentos: result.totalEquipamentos,
        token: tokenAuth
      }

      if (result.id != null) {
        
        if (this.redirecionamento != null && this.redirecionamento != undefined) {
          
          this.loginService.gravarCredenciaisFull(usuario);
          this.route.navigate([this.redirecionamento]);
        } else {
          this.loginService.gravarCredenciaisFull(usuario);
          
          this.irParaAnuncios();
        }
        //}
      } else {
        usuario.token = '';        
        this.registrarPorLoginSocial(usuario);
      }

    }, err => {
      //console.clear();
      console.log(err);
      this.fecharLoading();
    });
  }


  logar() {

    this.exibirLoading();
    const tipoLogin = this.usuario.hashSocial == null ? TipoLogin.Default : TipoLogin.GoogleSocial;

    this.loginService.loginPadrao(this.usuario, tipoLogin).subscribe(result => {

      this.fecharLoading();
      if (result != null) {
        console.log(this.redirecionamento);
        if (this.redirecionamento != null && this.redirecionamento !== undefined) {
          
          this.loginService.gravarCredenciais(result);
          this.route.navigate([this.redirecionamento]);
        } else {
          
          this.loginService.gravarCredenciais(result);          
          this.irParaAnuncios();
          
        }
      }

    }, err => {

      console.log(err);
      this.fecharLoading();
      if (err.status === 403) {

        this.exibirErro('', 'Usuário Não Encontrado/ Senha Inválida');
        //this.registrar();
      } else {

        this.exibirErro('', 'Erro ao conectar ao servidor!!!');
      }


    });

  }

  registrar() {

    this.route.navigate(["/registro-usuario"]
      //{queryParams: this.usuario}
    );
  }

  registrarPorLoginSocial(usuario) {
    this.route.navigate(["/registro-usuario"],
      { queryParams: usuario }
    );

  }

  irParaAnuncios() {

    this.route.navigate(["/pagina-inicial"]);
  }

  irParaNovaSenha(email) {

    this.route.navigate(["/nova-senha2/" + email]);
  }

  irParaResetSenha() {

    this.route.navigate(["/reset-senha"]);
  }
}
