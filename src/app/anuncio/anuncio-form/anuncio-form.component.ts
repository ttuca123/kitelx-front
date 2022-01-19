import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MarcaService } from '../../services/marca.service';
import { ModeloService } from '../../services/modelo.service';
import { EquipamentoService } from '../../services/equipamento.service';
import { MatDialog, MatBottomSheet, MatSnackBar, MatStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/usuario.service';
import { View } from '../../view';
import { AnuncioService } from '../../services/anuncio.service';
import { Anuncio } from '../../vo/anuncio';
import { AcessorioService } from '../../services/acessorio.service';
import { Foto } from '../../vo/foto';
import { FotoService } from '../../services/foto.service';
import { from, Observable, Subscription } from 'rxjs';
import { delay, map, take, tap } from 'rxjs/operators';
import { GeoService } from '../../services/geo.service';
import { LocalUser } from '../../vo/local-user';
import { fadeInAnimation } from '../../vo/animations';

@Component({
  selector: 'app-anuncio-form',
  templateUrl: './anuncio-form.component.html',
  styleUrls: ['./anuncio-form.component.scss'],
  animations:[
    fadeInAnimation
  ]
})
export class AnuncioFormComponent extends View implements OnInit, OnDestroy {
    
  tipos= [];
  marcas = [];
  anuncio: Anuncio;
  titulo = 'Anuncie seu equipamento';
  toggleAberto = false;
  modelos = [];
  estados = [];
  cidades = [];
  acessorios = [];
  lastPage = 0;
  fotosNovas = [];
  fotos$: Observable<any>;
  localUser: LocalUser;
  @ViewChild('stepper')
  stepper: MatStepper;

  constructor(
    public anuncioService: AnuncioService, public equipamentoService: EquipamentoService,
    public dialog: MatDialog, private routeActivated: ActivatedRoute,
    public activatedRoute: ActivatedRoute, public route: Router, public storage: StorageService,
    public usuarioService: UsuarioService, private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar, public acessorioService: AcessorioService,
    private fotoService: FotoService, private geoService: GeoService,
    public marcaService: MarcaService, public modeloService: ModeloService) {
    super(dialog, route);    
  
    
    }    

    ngOnInit(): void {
      
      this.subscription$ = new Subscription();
      this.anuncio = this.anuncioService.novo();
      this.carregarTiposEquipamento();
      this.carregarMarcas();
      this.carregarEstados();
      this.localUser = this.storage.getLocalUser();

      this.usuarioService.getPing()
      .subscribe(()=> {        
        
        this.iniciarInformacoesAnuncio();
      }, err => {
        console.error(err);
        this.loginComParametros('anuncio/anunciar');

      });
    
    }

    loginComParametros(parametro) {
     
        const dadosParametros = {
          redirectAfterTo: parametro
        }
        this.route.navigate(['login', dadosParametros]);
     }


    iniciarInformacoesAnuncio() {
      
      
      this.routeActivated.params.subscribe(params => {
        const id = params['id'];
        const idEquipamento = params['idEquipamento'];        
        //const anuncioJSON = params['anuncio'];
        const tipoAnuncio = params['tipo'];  
        this.lastPage = params['page'];

        this.carregarDadosAnuncio(id);
        this.carregarTipoEquipamentoParaAnunciar(tipoAnuncio);         
        this.prepararEquipamentoParaAnunciar(idEquipamento);

      }); 

    }

    public carregarTiposEquipamento() {

      this.equipamentoService.findTipos()
       .subscribe(tipos => {
        
         this.tipos = tipos;
         
       }, err => {
         
         console.error(err);
         console.error('Erro ao carregar os tipos de equipamento');
       });      
   }

   public carregarMarcas(){
    
      this.marcaService.carregarMarcas()
      .subscribe(marcas => {
        this.marcas = marcas;
        this.marcas = marcas;
      }, err => console.error(err));

   }


   public carregarEstados() {
    
    this.geoService.getEstados()
    .subscribe(estados => {
      this.estados = estados;
      this.geoService.ordenarEstados(this.estados);

     /* if(this.anuncio.estado.id!= undefined) {
        
          this.carregarCidades(this.anuncio.estado);
      } */
    }, err => console.error(err));
   }

   carregarCidades(estado) {
    
    this.anuncio.estado = estado;
    this.exibirLoadingMensagem('Carregando cidades');
    this.cidadeSub = this.geoService.getCidadesByEstado(estado.id).subscribe(cidades => {
      
      this.cidades = cidades;
      this.fecharLoading();

    }, err => {
      
      console.log(err);
      this.fecharLoading();
      
    }); 
  }

  definirLocalidade(cidade){

    this.anuncio.cidade = cidade;
    this.anuncio.localidade = this.anuncio.estado.sigla + ', ' + this.anuncio.cidade.nome;

  }

    carregarTipoEquipamentoParaAnunciar(tipoJSON){
      if(tipoJSON!=undefined ){
        const tipo = JSON.parse(tipoJSON);
        this.anuncio.tipo = tipo;
        
      }
    }
  
    carregarDadosAnuncio(id) {

      if(id !== undefined) {

        this.anuncioService.findById(id).subscribe(result => {
    
          this.anuncio = result;
          this.carregarAcessorios(result.tipo.id);
          
        }, err => {
    
          this.exibirErro(1, 'Rede Indisponível. Não foi possível carregar os dados do anúncio.');
          console.log(err);
        });
    } 
  }



  prepararEquipamentoParaAnunciar(id){
    if(id !== undefined) {
      this.equipamentoService.findById(id)
      .subscribe( equipamento=> {

        console.clear();
        console.log(JSON.stringify(equipamento));

        this.anuncio = this.anuncioService.prepararEquipamentoAnunciar(equipamento);
        
      }, err => {
        console.error(err);
      });
    }
  }
  


  addAnuncio() {
       
    if(this.anuncio.fotos.length>5){
      this.error=true;
      this.msgErro = 'Número máximo permitido para fotos é de até 5.';
      throw new Error(this.msgErro);
    }

    this.fotosNovas = this.anuncio.fotos.filter(item => item.id==null);   
    //this.anuncio.fotos=[];
    if(this.anuncio.id==null || this.anuncio.id==undefined) { //Novo Anúncio
    
      this.exibirLoadingMensagem('Salvando informações no servidor');
      this.subscription$.add(this.anuncioService.insert(this.anuncio)
      .subscribe(result => {
        this.fecharLoading();  
        this._snackBar.open('Anúncio Registrado com Sucesso', 'Registrado', { duration: 500 });
        
        this.iniciarEnvioFotos(result.id);
        
        
      }, err => {
        console.error(err);
        this.fecharLoading();
        this.exibirErro(1, 'Erro ao cadastrar anúncio!');
      }));
    }else {
      
      this.editar(); //Editar Anúncio

    } 
  }

  iniciarEnvioFotos(id){
    
    if(this.fotosNovas.length>0){
      this.enviarFotos(id);
    }else{
     
      this.finalizarAnuncio();
    }  

  }

  editar() {    
    
    this.exibirLoading();      
    this.subscription$.add(this.anuncioService.editar(this.anuncio, this.anuncio.id)
      .subscribe(result => {
        this.fecharLoading();  
        this._snackBar.open('Dados do Anúncio Atualizados com Sucesso', 'Registrado', { duration: 1200 });
        
        this.iniciarEnvioFotos(result.id);
        
      }, err => {
        this.loadFotos = false;
        this.exibirErro(1, 'Erro ao atualizar os dados do Anúncio.');
        console.log(err);
        this.fecharLoading();
      })); 
  }  

  enviarFotos(id) {
   
    this.fotoService.totalIncrementar = 100/this.anuncio.fotos.length;    
    this.loadFotos = this.fotosNovas.length > 0;
    this.exibirLoadingMensagem('Iniciando envio de Fotos para o servidor');
    this.fotos$ = from(this.fotosNovas).pipe(tap((f) => f.anuncioId = id), 
     map((foto) => this.fotoService.insertFotoAnuncio(foto)));
     
     this.subscription$.add(this.fotos$.subscribe((fotoSubscribe: Observable<any>) => {
      fotoSubscribe.subscribe(async (f) => {        
        
        this.fotoService.porcentTotalFotosEnviadas+=this.fotoService.totalIncrementar;
        this.fotoService.totalFotosEnviadas++;
        if(this.fotoService.totalFotosEnviadas<this.fotosNovas.length) {

          this.fotoService.statusFoto = 'Enviando fotos para Servidor!';

        }else{
                    
          this.fotoService.statusFoto = 'Todas as fotos foram enviadas com sucesso!';          
          this.loadFotos=!this.loadFotos;
          this.sincronizarFotosS3();          
        }

      }, err=> {
        console.log(err);
        this.erro = true;
        this.fotoService.statusFoto = 'Ops, ocorreu um erro ao enviar as fotos!';
        this.fecharLoading();
      });

    }));

  }

  carregarAcessorios(id){
    
      this.exibirLoading();
      this.acessorioService.findAll().subscribe(acessorios=> {

        this.acessorios = acessorios;
        this.fecharLoading();
      }, err=> {
        console.error(err);
        this.fecharLoading();
      });    
  }
 

  selecionarTipoEquipamento(tipo){

    this.anuncio.tipo = tipo;
    

    if(this.anuncio.tipo!=undefined && this.anuncio.marca.id!=undefined){
      
      this.carregarModelos(this.anuncio.marca, this.anuncio.tipo);             
      
    }

    if(this.anuncio.tipo!=undefined && this.anuncio.tipo.id===7){

      this.carregarAcessorios(this.anuncio.tipo.id);
    }


  }

  selecionarModelo(modelo){

    this.anuncio.modelo = modelo;
  }

  carregarModelos(marca, tipo) {
    
    this.exibirLoadingMensagem('Carregando Modelos do Equipamento');  
    this.anuncio.marca = marca;    
   
   this.modeloService.findModelosByMarcaByTipo(marca.id, tipo)
    .subscribe(modelos => {
          
          this.modelos = modelos;
          this.fecharLoading();
        }, err => {
          
          console.log(err);
          this.fecharLoading();
  
      });
    
  }
 

  removerFotos(event) {
    
    const foto = event as Foto;

    this.removerFotosServidor(foto);
  } 

  removerFotosServidor(foto) {    
    
    if(foto.id!==undefined){
      this.exibirLoadingMensagem('Excluindo foto.');
      this.fotoService.removerFoto(foto.id).subscribe((result)=> {

        this.fecharLoading();
        this.anuncio.fotos = this.anuncio.fotos.filter(f => f.id != foto.id);
        this._snackBar.open('Foto Removida', 'Foto do Equipamento', { duration: 2000 });

      }, err=> {
        this.fecharLoading();
        console.error(err);
      });
    }else{
      
      this.anuncio.fotos = this.anuncio.fotos.filter(f => f !== foto);
    
    }   
  }

  limparForm() {
    this.anuncio = this.anuncioService.novo();
  }


  sincronizarFotosS3() {

    this.exibirLoadingMensagem('Sincronizando fotos com servidor.');
    this.fotoService.sincronizarS3().subscribe((r) => {
      
      this.fecharLoading();
      this._snackBar.open('Sincronização realizada com sucesso', 'Sincronização', { duration: 2000 });
      this.finalizarAnuncio();
    }, err => {
      this.fecharLoading();
      console.error(err);
      
    });

  }

  formatarValor(valor) {       
    
    this.anuncio.valor = this.anuncioService.formatarValor(valor);

  } 

  finalizarAnuncio(){

    this.route.navigate(['/anuncio/filtro']);
  }

  ngOnDestroy() {
    
    this.subscription$.unsubscribe();
    this.subscription$ = new Subscription();

  }
}
