import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Usuario } from '../vo/usuario';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EquipamentoService } from '../services/equipamento.service';
import { UsuarioService } from '../services/usuario.service';
import { View } from '../view';
import { isCPF, formatToPhone, formatToCPF } from 'brazilian-values';
import { TipoLogin } from '../enum/tipo-login';
import { LoginService } from '../services/login.service';
import { StorageService } from '../services/storage.service';

import { LocalUser } from '../vo/local-user';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent extends View implements OnInit {

  perfis: any;
  toppings = new FormControl();
  tipos: any;
  perfil: any;

  public cpfValido = true;

  constructor(private activatedRoute: ActivatedRoute, public route: Router, public dialog: MatDialog,
    private cdRef: ChangeDetectorRef, public equipamentoService: EquipamentoService,
    public usuarioService: UsuarioService, public loginService: LoginService, public storage: StorageService,
    private googleService: AuthService) {

    super(dialog, route);

    this.carregarPerfis();

  }


  ngOnInit(): void {
    this.checkUsuario('/perfil-usuario');
    if (this.storage.getLocalUser() == null || this.storage.getLocalUser() == undefined) {

    } else {
      let localUser = this.storage.getLocalUser();
      console.clear();

      this.preencherDadosUsuario(localUser);
      this.prepararTela();

      this.fecharLoading();
    }
  }




  prepararTela() {

    this.titulo = 'Editar Meu Perfil';
    this.usuario.fone = formatToPhone(this.usuario.fone);
    this.usuario.cpf = formatToCPF(this.usuario.cpf);

  }

  carregarPerfis() {

    this.usuarioService.findPerfis().subscribe(perfis => {

      this.perfis = perfis;

    }, err => {

      console.log(err);
    });
  }

  logar() {

    this.exibirLoading();

    this.loginService.loginPadrao(this.usuario, TipoLogin.Default)
      .subscribe(result => {

        this.fecharLoading();
        this.loginService.gravarCredenciais(result);
        this.route.navigate(["/dashboard"]);

      }, err => {

        this.fecharLoading();
        console.log(err);
        this.exibirErro(err.error.codigo, err.error.message);

      });

  }

  onSubmit() {

    //this.checkUsuario('/perfil-usuario');

    if (!(this.storage.getLocalUser() == null || this.storage.getLocalUser() == undefined)) {   

      this.prepararUsuario();
      this.exibirLoading();

      if (!this.edit) {
        this.save();

      } else {
        this.editar();
      }

    }
  }


  editar() {

    this.usuarioService.editar(this.usuario, this.usuario.id).subscribe(result => {

      this.fecharLoading();
      this.exibirSucesso('Dados do Usuário foram atualizados.');
      this.usuario.fone = formatToPhone(this.usuario.fone);
      this.usuario.cpf = formatToCPF(this.usuario.cpf);

      let localUser = this.storage.getLocalUser();

      let user: LocalUser = {
        totalEquipamentos: result.totalEquipamentos,
        primeiroNome: result.primeiroNome,
        ultimoNome: result.ultimoNome,
        fone: result.fone,
        email: result.email,
        perfil: result.tipo,
        authToken: localUser.authToken,
        cpf: localUser.cpf,
        fotoUrl: localUser.fotoUrl,
        id: localUser.id,
        permissoes: localUser.permissoes,
        token: localUser.token
      }

      this.storage.setLocalUser(user);

    }, err => {
      this.fecharLoading();
      console.log(err);
      this.exibirErro(err.error.codigo, err.error.message);
    });

  }

  save() {

    this.usuarioService.insert(this.usuario).subscribe(result => {

      //this.usuario = result;
      this.fecharLoading();
      this.exibirSucesso('Usuário cadastrado com sucesso.');

      setTimeout(() => {

        this.logar();

      }, 1000);

    }, err => {
      this.fecharLoading();
      console.log(err);
      this.exibirErro(err.error.codigo, err.error.message);


      //  alert('Ocorreu um erro ao cadastrar o usuário!!!');
    });
  }


  prepararUsuario() {

    this.usuario.cpf = this.usuario.cpf.replace('.', '').replace('-', '').replace(' ', '');
    this.usuario.fone = this.usuario.fone.replace('.', '').replace('-', '').replace('(', '').replace(')', '').replace(' ', '');
  }


  meusEquipamentos() {
    this.checkUsuario('/equipamento-proprietario');

    if (this.storage.getLocalUser() == null || this.storage.getLocalUser() == undefined) {

    } else {
      this.route.navigate(["equipamento-proprietario"]);
    }

  }

  meusAnuncios() {
    this.checkUsuario('/anuncio/meus-anuncios');

    if (this.storage.getLocalUser() == null || this.storage.getLocalUser() == undefined) {

    } else {
      this.route.navigate(["anuncio/meus-anuncios"]);
    }

  }




  validarCpf(cpf: string) {

    this.usuario.cpf = cpf.replace(",", "").replace("-", "");
    this.cpfValido = isCPF(cpf);
    this.usuario.cpf = formatToCPF(cpf);

  }

  formatarFone(fone: string): any {

    this.usuario.fone = formatToPhone(fone);


  }


  ngOnDestroy(): void {


  }

  ngAfterViewChecked(): void {
    console.log('! Mudanças de estado do componente !');
    this.cdRef.detectChanges();
  }

  checkUsuario(parametro) {
    this.usuarioService.getPing().subscribe(result => {

    }, err => {
      if (err.status == 403) {
        this.logout();
        this.loginComParametros(parametro);
      }
    });
  }


  logout() {

    this.setDefaultPic();
    this.storage.setLocalUser(null);
    this.usuario.id = null;
    console.clear();

    this.googleService.signOut().then(result => {
    }, err => {
      console.log(err);
    });
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

}

