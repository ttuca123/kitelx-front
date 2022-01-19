import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../config/app.config';
import { Foto } from '../vo/foto';
import { Spot } from '../vo/spot';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  private URL = Config.AMBIENTE;
  private ENDPOINT = '/spots';

  constructor(private http: HttpClient) { }

  public novo(): Spot {

    const spot: Spot = {
      id: null,
      pico: '',
      localPico: '',
      localVelejo: '',
      lat: 0,
      lng: 0,
      dica: '',
      vidaNoturna: '',
      hospedagem: '',
      fotos: [],
      fotosExcluidas: [],
      moeda: {
        id: null,
        descricao: ''
      },
      estilosVelejo: [],
      idiomas: [],
      meses: [],
      ventos: [],  
      downwind: ''    

    };

    return spot;
  }

  public findDestaques():Observable<any> {

    return this.http.get(this.URL + this.ENDPOINT + '/destaques');
  }

  public filter(page, linesPerPage, obj): Observable<any> {
    const params = new HttpParams()
    .set('page', page)
    .set('linesPerPage', linesPerPage)
    .set('spot', JSON.stringify(obj));

    return this.http.get(this.URL + this.ENDPOINT + '/filtrar', {params});
  }

  public findById(id):Observable<any> {

    return this.http.get(this.URL + this.ENDPOINT + '/' + id);
  }

  public insert(vo: Spot): Observable<any> {
    
    return this.http.post(this.URL + this.ENDPOINT, vo);

  }  
  
  public editar(vo, id):Observable<any> {

    return this.http.put(this.URL + this.ENDPOINT +"/"+ id, vo);
  }

  public remover(id):Observable<any> {

    return this.http.delete(this.URL + this.ENDPOINT + '/' + id);
  }

  public getLista(): Spot[]{

    return [];
  }


  public uploadFotos(vo: Foto): Observable<any> {
    
    return this.http.post(this.URL + this.ENDPOINT + '/fotos', vo);

  }


  public getComplementos(): Observable<any> {
    return this.http.get(this.URL + this.ENDPOINT + '/complementos');
  }

  

  


}
