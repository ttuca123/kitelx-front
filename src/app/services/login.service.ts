import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuperLoginService } from './super.login.service';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Config } from '../config/app.config';
import { HttpClient } from '@angular/common/http';
import { LocalUser } from '../vo/local-user';
import { JwtHelper } from 'angular2-jwt';
import { StorageService } from './storage.service';
import { STORAGE_KEYS } from '../config/storage_keys.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements SuperLoginService{

  private URL = Config.AMBIENTE;
  private ENDPOINT = '/login';
  public jwtHelper: JwtHelper = new JwtHelper();

  constructor(public  googleService: AuthService, private http: HttpClient, public storage: StorageService) { }


  public recuperarSenha(creds):Observable<any> {

    return this.http.post(this.URL + '/auth/forgot', creds, {
      observe: 'response',
      responseType: 'json'
    });
  }

  public loginGoogle(): Promise<SocialUser> {


    return this.googleService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  loginPadrao(object, tipoLogin): Observable<any> {

    let creds = {
      id: object.id,
      hashSocial: object.hashSocial,
      usuario: object.nome,
      email: object.email,
      senha: object.senha,
      tipoLogin: tipoLogin,
      fotoUrl: object.fotoUrl
    }

    return this.http.post(this.URL + this.ENDPOINT, creds, {
      observe: 'response',
      responseType: 'json'
    });
  };


  loginSocial(object, tipoLogin): Observable<any> {

    let creds = {
      id: null,
      hashSocial: object.hashSocial,
      usuario: null,
      email: object.email,
      senha: null,
      tipoLogin: 2,
      fotoUrl: null
    }

    return this.http.post(this.URL + this.ENDPOINT, creds, {
      observe: 'response',
      responseType: 'json'
    });
  };

  public gravarCredenciais(result) {

    const token = result.headers.get('Authorization');
    
    const tokenAuth = token !=null?token.substring(7):'';

    const usuario = {
        auth : token,
        id : result.headers.get('Id'),
        primeiroNome: result.headers.get('PrimeiroNome'),
        ultimoNome : result.headers.get('UltimoNome'),
        telefone : result.headers.get('Fone'),
        foto: result.headers.get('Foto'),
        cpf : result.headers.get('Cpf'),
        perfil : result.headers.get('Perfil'),
        papeis : result.headers.get('Permissoes'),
        totalEquipamentos: result.headers.get('Equipamentos'),
        token : tokenAuth
    }
    this.gravarCredenciaisFull(usuario);

  }

  public gravarCredenciaisFull(user) {

   // let tokenAuth = user.token!=null?user.token.substring(7):'';

    const localUser: LocalUser = {
      id: user.id,
      token: user.token,
      authToken: user.tokenAuth,
      primeiroNome: user.primeiroNome,
      ultimoNome: user.ultimoNome,
      totalEquipamentos: +user.totalEquipamentos,
      fotoUrl: user.foto,
      cpf: user.cpf,
      perfil: +user.perfil,
      fone: user.fone,
      email: this.jwtHelper.decodeToken(user.token).sub,
      permissoes: user.papeis
    };

    this.storage.setLocalUser(localUser);

  }

  public gravarTotalEquipamentos(total) {

    let localUser = this.storage.getLocalUser();
    localUser.totalEquipamentos = total;

    this.storage.setLocalUser(localUser);

  }

  public novaSenha(vo):Observable<any> {

    return this.http.post(this.URL + '/auth/senhas', vo);
  }

  public novoToken(email):Observable<any> {

    return this.http.get(this.URL + '/auth/token/' + email);
  }

  public verificarToken(token): Observable<any> {

    return this.http.get(this.URL + '/auth/token/hash/' + token);
  }



}
