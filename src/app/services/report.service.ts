import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private URL = Config.AMBIENTE;

  constructor(private http: HttpClient) { }

  public getAnunciosDia(): Observable<any> {

    return this.http.get(this.URL + '/reports/anuncios-publicados-dia', {responseType: 'blob'});

  }

   public getAnunciosExcluidosDia(resumo): Observable<any> {

    const params = new HttpParams()            
      .set('filtro', JSON.stringify(resumo));

    return this.http.get(this.URL + '/reports/resumo-vendas/', {params, responseType: 'blob'},);

  }

}
