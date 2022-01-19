
import { Injectable } from '@angular/core';
import { Config } from '../config/app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Modelo } from '../vo/modelo';
import { PageForm } from '../datasource/page-form';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  private URL = Config.AMBIENTE;
  private ENDPOINT = '/modelos';
  public modelos: Modelo[] = [];    
  public modelosSubject$: ReplaySubject<Modelo[]> = new ReplaySubject<Modelo[]>(null);
  public loaded:boolean = false;
  public pageFormFilter: PageForm;
  
  constructor(private http: HttpClient) { }

  novo():Modelo {
    
    let modelo: Modelo = {
      id:null,
      descricao: '',
      tamanhoInicio: 0,
      tamanhoFim: 0,
      anoInicio: 0,
      anoFim: 0
    }
    
    return modelo;
  }

  public findModelosByMarcaByTipo(idMarca, idTipo): Observable<any> {
    return this.http.get(this.URL + this.ENDPOINT + '/marcas/'+idMarca+'/tipos/' + idTipo);
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
    
    if(!this.loaded) {
      
      this.loaded = true;
      this.findAll().subscribe(this.modelosSubject$);
    }
    
    return this.modelosSubject$.asObservable();
  }

  public insert(vo: Modelo): Observable<any> {

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
      .set('modelo', JSON.stringify(obj));

    return this.http.get(this.URL + this.ENDPOINT + '/filtrar', { params });
  }

  public remover(id):Observable<any> {

    return this.http.delete(this.URL + this.ENDPOINT + '/' + id);
  }

}
