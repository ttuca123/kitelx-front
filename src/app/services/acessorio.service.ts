import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../config/app.config';
import { Acessorio } from '../vo/acessorio';

@Injectable({
  providedIn: 'root'
})
export class AcessorioService {

  private URL = Config.AMBIENTE;
  private ENDPOINT = '/acessorios';
  
  constructor(private http: HttpClient) { }

  novo():Acessorio {
    
    let acessorio: Acessorio = {
      id:null,
      descricao: ''     
    }
    
    return acessorio;
  }

  public findAll(): Observable<any> {
    return this.http.get(this.URL + this.ENDPOINT+"/");
  } 
}
