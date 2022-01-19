import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../config/app.config';


/**
 *@author Artur Cavalcante
  @since 23/05/2019 15:27
  @description Classe responsável por integrar dados de GeoReferenciamento e Endereço
 *
 * @export
 * @class GeoService
 */
@Injectable({
  providedIn: 'root'
})
export class GeoService {

  URL = Config.AMBIENTE;
  ENDPOINT = '/geo';

  estados: Observable<any>;
  cidades: Observable<any>;
  cidade: Observable<any>;

  constructor(private http: HttpClient) {


  }

  public getCidadesByEstado(id): Observable<any> {

    this.cidades = this.http.get(this.URL + this.ENDPOINT + '/estados/' + id + '/municipios');

    return this.cidades;
  }

  public getEstados(): Observable<any> {

    this.estados = this.http.get(this.URL + this.ENDPOINT + '/estados');

    return this.estados;
  }

  public getCidadeById(id): Observable<any> {

    this.cidade = this.http.get(this.URL + '/municipios/' + id);

    return this.cidade;
  }

  /**
   * Ordena por ordem alfabética os estados
   *
   * @param {*} estados
   * @returns {[]}
   * @memberof GeoService
   */
  public ordenarEstados(estados): [] {

    estados.sort(
      (e1, e2): number => {
        if (e1.nome < e2.nome) {
          return -1;
        } else if (e1.nome > e2.nome) {
          return 1;
        }
        return 0;
      }
    );

    return estados;
  }

}
