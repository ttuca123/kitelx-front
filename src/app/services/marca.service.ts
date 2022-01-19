import { Injectable } from '@angular/core';
import { Config } from '../config/app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Marca } from '../vo/marca';
import { deprecate } from 'util';
import { PageForm } from '../datasource/page-form';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private URL = Config.AMBIENTE;
  private ENDPOINT = '/marcas';
  public marcas: Marca[] = [];
  public marcasSubject$: ReplaySubject<Marca[]> = new ReplaySubject<Marca[]>(null);
  public loaded:boolean = false;
  public pageFormFilter: PageForm;
  
  constructor(private http: HttpClient) { }

  public novo() {

    return {
      id: undefined,
      descricao: ''
    }
  }

  public findAll(): Observable<any> {
    return this.http.get(this.URL + this.ENDPOINT+"/");
  }

  public findModelos(id): Observable<any> {
    return this.http.get(this.URL + this.ENDPOINT + '/modelos/'+id);
  }

  
  carregarMarcas(): Observable<any> {
    
    return this.findAll();    
  }

  public findById(id):Observable<any> {

    return this.http.get(this.URL + this.ENDPOINT + '/' + id);
  }

  findMarcas(): Observable<any> {
    
    if(!this.loaded){
      
      this.loaded = true;
      this.findAll().subscribe(this.marcasSubject$);
    }
    
    return this.marcasSubject$.asObservable();
  }

  public insert(vo: Marca): Observable<any> {

    return this.http.post(this.URL + this.ENDPOINT, vo);

  }

  public editar(vo, id):Observable<any> {

    return this.http.put(this.URL + this.ENDPOINT +"/"+ id, vo);
  }

  public filter(page, linesPerPage, obj): Observable<any> {
    page = (page < 0) ? 0 : page;
    const params = new HttpParams()
      .set('page', page)
      .set('linesPerPage', linesPerPage)
      .set('marca', JSON.stringify(obj));

    return this.http.get(this.URL + this.ENDPOINT + '/filtrar', { params });
  }

  public remover(id):Observable<any> {

    return this.http.delete(this.URL + this.ENDPOINT + '/' + id);
  }


}
