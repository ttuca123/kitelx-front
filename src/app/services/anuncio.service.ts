import { Injectable } from '@angular/core';
import { Anuncio } from '../vo/anuncio';
import { SuperService } from './super.service';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Config } from '../config/app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Equipamento } from '../vo/equipamento';
import { PageForm } from '../datasource/page-form';

@Injectable({
  providedIn: 'root'
})
export class AnuncioService implements SuperService{

  constructor(private http: HttpClient) { }

  private anuncioSubject$: BehaviorSubject<Anuncio[]> = new BehaviorSubject<Anuncio[]>(null);
  private motivosExclusaoSubject$: ReplaySubject<any> = new ReplaySubject<any>(null);
  private loaded: boolean = false;
  private URL = Config.AMBIENTE;
  private ENDPOINT = '/anuncios';
  public anuncioFilter: Anuncio;
  public pageFormFilter: PageForm;

  public novo(): Anuncio {

    const anuncio: Anuncio = {
      id: null,
      tipo : {
        id: null,
        descricao: ''
      },
      ano: null,
      dataPublicacao:null,
      valor: null,
      tamanho: null,
      marca : {
        id: null,
        descricao: ''
      },
      modelo: {
        id: null,
        descricao: ''
      },
      acessorio: {
        id: null,
        descricao: ''
      },
      sincronizacaoS3: false,
      outroAcessorio: '',
      idUsuario:null,
      outraMarca: '',
      outroModelo: '',
      fotos: [],
      barra: false,
      ativo: true,
      nomeAnunciante: '',
      emailAnunciante: '',
      zapAnunciante: '',
      localidade: '',
      logo:'',
      observacao: '',
      cidade: {
        id: null,
        nome: ''
      },
      estado: {
        id: null,
        sigla: '',
        nome: ''
      }      
     };
     

    return anuncio;
  }

  public insert(vo: Anuncio): Observable<any> {

    //return this.http.post(this.URL + this.ENDPOINT, vo).pipe(tap((anuncio => this.anuncioSubject$.getValue().push(anuncio))));
    return this.http.post(this.URL + this.ENDPOINT, vo);

  }

  public insertComEquipamento(vo: Anuncio, idEquipamento): Observable<any> {
    const params = new HttpParams()
    .set('idEquipamento', idEquipamento);
    //return this.http.post(this.URL + this.ENDPOINT, vo).pipe(tap((anuncio => this.anuncioSubject$.getValue().push(anuncio))));
    return this.http.post(this.URL + this.ENDPOINT, vo, {params});

  }

  public editar(vo, id):Observable<any> {

    return this.http.put(this.URL + this.ENDPOINT +"/"+ id, vo);
  }

  public pontuar(vo, id):Observable<any> {

    return this.http.put(this.URL + this.ENDPOINT +'/'+ id+'/cliques', vo);
  }

  public filter(page, linesPerPage, obj): Observable<any> {
    page = (page < 0) ? 0 : page;
    const params = new HttpParams()
      .set('page', page)
      .set('linesPerPage', linesPerPage)
      .set('anuncio', JSON.stringify(obj));

    return this.http.get(this.URL + this.ENDPOINT + '/filtrar', { params });
  }

  public remover(id):Observable<any> {

    return this.http.delete(this.URL + this.ENDPOINT + '/' + id);
  }

  public findById(id):Observable<any> {

    return this.http.get(this.URL + this.ENDPOINT + '/' + id);
  }

  public findDestaques():Observable<any> {

    return this.http.get(this.URL + this.ENDPOINT + '/destaques');
  }

  public getTotalAtivo():Observable<any> {

    return this.http.get(this.URL + this.ENDPOINT + '/total/ativos');
  }


  public getLista(object): Observable<any> {


    return null;
  }

  public getMotivosExclusao(): Observable<any> {
    
    if(!this.loaded){

      this.loaded = true;
      this.http.get(this.URL + this.ENDPOINT + '/questionarios')
      .subscribe(this.motivosExclusaoSubject$);
    }
    
    return this.motivosExclusaoSubject$.asObservable();
  }


  public prepararEquipamentoAnunciar(equipamento: Equipamento): Anuncio {

    const anuncio = this.novo();

    anuncio.tipo = equipamento.tipo;
    anuncio.marca = equipamento.marca;
    anuncio.outraMarca = equipamento.outraMarca;
    anuncio.modelo = equipamento.modelo;
    anuncio.ano = equipamento.ano;
    anuncio.valor = 0;
    anuncio.observacao = equipamento.observacao;  
    anuncio.fotos = equipamento.fotos; 

    return anuncio;
  }


  formatarValor(valor): string {   
    
    valor = valor.split('R$').join('');
    valor = valor.split('.').join('');
    valor = valor.split(',').join('.');  
    
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  } 
  
}
