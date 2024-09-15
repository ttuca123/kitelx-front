import { Injectable } from '@angular/core';
import { Config } from '../config/app.config';
import { HttpClient } from '@angular/common/http';
import { SuperService } from './super.service';
import { Observable, BehaviorSubject, Subscription, ReplaySubject } from 'rxjs';
import { Equipamento } from '../vo/equipamento';
import { TipoEquipamento } from '../vo/tipo-equipamento';
import { Modelo } from '../vo/modelo';



@Injectable({
  providedIn: 'root'
})
export class EquipamentoService implements SuperService {

  private URL = Config.AMBIENTE;
  private ENDPOINT = '/equipamentos';

  public equipamentoSubject$: ReplaySubject<Equipamento[]> = new ReplaySubject<Equipamento[]>(null);
  public tiposEquipamentoSubject$: ReplaySubject<TipoEquipamento[]> = new ReplaySubject<TipoEquipamento[]>(null);
  public loaded= false;
  public tipos: TipoEquipamento[]=[];
  public loadedTipos: boolean = false;
  subscription: Subscription;

  constructor(private http: HttpClient) { 

    this.subscription = new Subscription();
  }

  public novo(): Equipamento {

    const equipamento: Equipamento = {
      id: null,
      tipo: {
        id: null,
        descricao: ''
      },
      ano: null,
      tamanho: null,
      serial: '',
      marca: {
        id: null,
        descricao: ''
      },
      modelo: {
        id: null,
        descricao: ''
      },
      observacao: '',
      idUsuario: null,
      outroModelo: '',
      fotos: [],      
      barra: false,
      outraMarca: null
    };

    return equipamento;
  }

  public novoModelo(): Modelo {

    const modelo: Modelo = {
      id: null,
      descricao: '',
      tamanhoInicio: null,
      tamanhoFim: null,
      anoInicio: null,
      anoFim: null

    };

    return modelo;
  }


  public novoComUsuario(equip, usuario): Equipamento {

    const equipamento: Equipamento = {
      id: equip.id,
      tipo: equip.tipo,
      ano: equip.ano,
      tamanho: equip.tamanho,
      serial: equip.serial,
      marca: equip.marca,
      modelo: equip.modelo,
      observacao: equip.observacao,
      idUsuario: usuario.id,
      outroModelo: equip.outroModelo,
      fotos: equip.fotos,                  
      barra: equip.barra,
      outraMarca: equip.outraMarca

    };

    return equipamento;
  }

  public findTipos(): Observable<any> {

    if(!this.loadedTipos){
      this.loadedTipos = true;     
      this.http.get(this.URL + this.ENDPOINT + '/tipos').subscribe(this.tiposEquipamentoSubject$);
    }
    
    return this.tiposEquipamentoSubject$.asObservable();
  }

  public findMarcasOuModelos(nome): Observable<any> {    
          
      return this.http.get(this.URL + this.ENDPOINT + '/marcas-modelos/'+nome);            
  }

  public carregarTiposEquipamento() {
    

     this.findTipos();
           
  } 

  public insert(vo: Equipamento): Observable<any> {

    return this.http.post(this.URL + this.ENDPOINT, vo);
  }

  public editar(vo, id): Observable<any> {

    return this.http.put(this.URL + this.ENDPOINT + '/' + id, vo);
  }

  public remover(id): Observable<any> {

    return this.http.delete(this.URL + this.ENDPOINT + '/' + id);
  }

  public findById(id): Observable<any> {

    return this.http.get(this.URL + this.ENDPOINT + '/' + id);
  }

  public getLista(object): Observable<any> {


    return null;
  }

  public transformarAnuncio(equipamento: Equipamento):any{

    const anuncio = {
      id: null,
      tipo: equipamento.tipo,
      ano: equipamento.ano,
      descricao: '',
      ativo: true,
      marca: equipamento.marca,
      modelo: equipamento.modelo,
      valor: 0,
      barra: false,
      tamanho: equipamento.tamanho,            
      fotos: equipamento.fotos,            
      dataPublicacao: null,
      idUsuario: null,

    }

    return anuncio;
  }
}
