import { Injectable } from '@angular/core';
import { Config } from '../config/app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../vo/usuario';
import { SuperService } from './super.service';
import { Equipamento } from '../vo/equipamento';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements SuperService {

  private URL = Config.AMBIENTE;
  private ENDPOINT = '/usuarios';

  constructor(private http: HttpClient) { }

  public novo(): Usuario{

    let usuario: Usuario ={

      id: null,
      authToken: '',
      hashSocial: '',
      nome: '',
      primeiroNome: '',
      ultimoNome: '',
      email: '',
      fone: '',
      cpf: '',
      senha: '',
      contraSenha: '',
      fotoUrl: '',
      foto: '',
      tipo: null,
      perfil: null,
      anuncios: [],
      equipamentos: [],
      totalEquipamentos: 0,
      senhaHash: '',
      termosDeUso: false

    }

    return usuario;
  }

  public findPerfis(): Observable<any> {

    return this.http.get(this.URL + this.ENDPOINT + '/perfis');
  }

  public getPing(): Observable<any> {

    return this.http.get(this.URL + this.ENDPOINT + '/ping');
  }

  public insert(vo: Usuario): Observable<any> {

    return this.http.post(this.URL + this.ENDPOINT, vo);
  }

  public editar(vo: Usuario, id):Observable<any> {

    return this.http.put(this.URL + this.ENDPOINT + '/' + id, vo);
  }

  public remover(object, id):Observable<any> {

    return null;
  }

  public findById(id):Observable<any> {

    return this.http.get(this.URL + this.ENDPOINT + '/'+ id);
  }

  /**
   * Método responsável por buscar os dados do usuário através do hash do login social
   * @param creds
   */
  public findUsuarioSocialValido(creds):Observable<any> {

    return this.http.post(this.URL + this.ENDPOINT + '/verificacao-social', creds);
  }

  public getLista(object): Observable<any> {


    return null;
  }

}
