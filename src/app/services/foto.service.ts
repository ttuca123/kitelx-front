import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../config/app.config';
import { Foto } from '../vo/foto';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  private URL = Config.AMBIENTE;
  private ENDPOINT = '/fotos';

  totalIncrementar = 0;
  porcentTotalFotosEnviadas= 0;
  totalFotosEnviadas = 0;
  statusFoto= '';

  constructor(private http: HttpClient) { }


  public insertFotoSpot(vo: Foto): Observable<any> {

    return this.http.post(this.URL + this.ENDPOINT+'/spots', vo);
  }

  public insertFotoAnuncio(vo: Foto): Observable<any> {

    return this.http.post(this.URL + this.ENDPOINT+'/anuncios', vo);
  }

  public insertFotoEquipamento(vo: Foto): Observable<any> {

    return this.http.post(this.URL + this.ENDPOINT+'/equipamentos', vo);
  }

  public removerFoto(id): Observable<any> {

    return this.http.delete(this.URL + this.ENDPOINT + '/' + id);
  }

  public sincronizarS3(): Observable<any> {

   // return this.http.get(this.URL + this.ENDPOINT + '/s3');
    return this.http.post(this.URL + this.ENDPOINT + '/s3', null);
  }
}
