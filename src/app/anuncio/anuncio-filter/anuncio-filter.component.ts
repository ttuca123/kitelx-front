import { Component, OnInit, Output, EventEmitter, ɵConsole, AfterViewInit, OnChanges, SimpleChange, SimpleChanges, Input, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { View } from '../../view';
import { MatDialog } from '@angular/material';
import { GeoService } from '../../services/geo.service';
import { AnuncioService } from '../../services/anuncio.service';
import { EquipamentoService } from '../../services/equipamento.service';
import { MarcaService } from '../../services/marca.service';
import { ModeloService } from '../../services/modelo.service';
import { Observable } from 'rxjs';
import { PageForm } from '../../datasource/page-form';
import { AcessorioService } from '../../services/acessorio.service';
import { StorageService } from '../../services/storage.service';
import { LocalUser } from '../../vo/local-user';

@Component({
  selector: 'anuncio-filter',
  templateUrl: './anuncio-filter.component.html',
  styleUrls: ['./anuncio-filter.component.scss']
})
export class AnuncioFilterComponent extends View implements OnInit, OnChanges {

  anuncio: any;
  tipos = [];
  marcas = [];
  modelos = [];
  acessorios = [];
  filteredLocais: Observable<string[]>;
  pageForm: PageForm;
  anuncios = [];
  estados = [];
  cidades = [];
  localUser: LocalUser;
  @ViewChild('ano') anoInput: ElementRef;  

  constructor(public storageService: StorageService, public dialog: MatDialog, public route: Router, public geoService: GeoService,
    public anuncioService: AnuncioService, public equipamentoService: EquipamentoService, public marcaService: MarcaService,
    public modeloService: ModeloService, private routeActivated: ActivatedRoute, private acessorioService: AcessorioService,
    public storage: StorageService) {

    super(dialog, route);
  } 

  ngOnInit(): void {

    this.carregarTiposEquipamento();
    this.carregarParametros();
    this.carregarAcessorios();
    this.carregarEstados();
    this.localUser = this.storage.getLocalUser();
    this.anuncio = this.anuncioService.anuncioFilter == undefined?this.anuncioService.novo():this.anuncioService.anuncioFilter
    this.pageForm = this.anuncioService.pageFormFilter == undefined?new PageForm():this.anuncioService.pageFormFilter;
   
  }

    

  ngOnChanges(changes: SimpleChanges): void{
    
    console.log(changes);
   
  }
  

  carregarAcessorios() {

    this.exibirLoading();
    this.acessorioService.findAll().subscribe(acessorios => {
      this.fecharLoading();
      this.acessorios = acessorios;

    }, err => {
      this.fecharLoading();
      console.log(err);
    });
  }

  public carregarEstados() {

    this.geoService.getEstados()
      .subscribe(estados => {
        this.estados = estados;
        this.geoService.ordenarEstados(this.estados);

        if (this.anuncio.estado.id != undefined) {

          this.carregarCidades(this.anuncio.estado);
        }
      }, err => console.error(err));
  }

  carregarCidades(estado) {

    this.anuncio.estado = estado;
    //  this.exibirLoadingMensagem('Carregando cidades');
    this.cidadeSub = this.geoService.getCidadesByEstado(estado.id).subscribe(cidades => {
      this.cidades = cidades;
      //  this.fecharLoading();
    }, err => {
      console.log(err);
      //this.fecharLoading();
    });
  }

  carregarParametros() {

    this.routeActivated.params.subscribe(parametros => {

      if(parametros['anuncio']!=undefined){
        
        const anuncio = JSON.parse(parametros['anuncio']);
        this.anuncio = anuncio;
        this.anuncio.barra = true;

      }
        this.buscar();
      
    }, err => {

      console.error(err);
    });

  }

  limpar(): void {

    this.anuncio = this.anuncioService.novo();
    this.anuncioService.pageFormFilter = undefined;
    this.anuncioService.anuncioFilter = undefined;
    
  }

  carregarTiposEquipamento() {

    this.exibirLoading();
    this.equipamentoService.findTipos()
      .subscribe(result => {
        this.fecharLoading();
        this.tipos = result;

      }, err => {
        this.fecharLoading();
        console.error(err);

      });
  }

  carregarMarcas() {


    this.exibirLoading();
    this.marcaService.findAll().subscribe(result => {

      this.marcas = result;
      this.fecharLoading();
    }, err => {

      console.log(err);
      this.fecharLoading();
    });
  }

  carregarModelos(marca) {

    this.exibirLoading();
    this.modeloService.findModelosByMarcaByTipo(this.anuncio.marca.id, this.anuncio.tipo.id).subscribe(modelos => {
      this.fecharLoading();
      this.modelos = modelos;

    }, err => {
      this.fecharLoading();
      console.log(err);
    });

  }


  buscar() {

    this.exibirLoading();
    

    if(this.anuncioService.pageFormFilter==undefined){      
     
      this.pageForm = new PageForm();
      this.pagina = 0;
      this.anuncioService.pageFormFilter = this.pageForm;
      this.anuncioService.anuncioFilter = this.anuncio;
      console.log('Pagína Inicial ' + this.pagina);
      
    } else {
      
      this.pageForm = this.anuncioService.pageFormFilter;
      this.pagina = this.anuncioService.pageFormFilter.pageable.pageNumber;
      console.log('Pagina Depois ' + this.pagina);
    }
    
    this.anuncioService.filter(this.pagina, this.pageForm.size, this.anuncio)
      .subscribe(page => {

        this.pageForm = page;
        this.anuncios = this.pageForm.content;
        this.fecharLoading();

      }, error => {

        console.error(error);
        this.fecharLoading();
      });

  }



}
