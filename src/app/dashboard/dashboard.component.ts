import { Component, AfterViewInit, OnInit, ɵConsole } from '@angular/core';

import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { Router } from '@angular/router';
import { View } from '../view';
import { StorageService } from '../services/storage.service';
import { MarcaService } from '../services/marca.service';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AnuncioService } from '../services/anuncio.service';
import { EquipamentoService } from '../services/equipamento.service';
import { Marca } from '../vo/marca';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from 'angularx-social-login';
import { Http } from '@angular/http';
declare var require: any;

const data: any = require('./data.json');

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends View implements OnInit, AfterViewInit {
  
  
  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<string[]>;
  filtro: any;
  marcaTeste: any;
  anuncio: any;
  tipos: any;
  marcasDesc: Marca[] = [];
  marcas: string[] = [];
  total = 0;

  constructor(public route: Router, public storage: StorageService,
    public equipamentoService: EquipamentoService,
    public marcaService: MarcaService,
    public anuncioService: AnuncioService,
    public usuarioService: UsuarioService,
    public googleService: AuthService) {

    super(null, route);

    const localUser = this.storage.getLocalUser();

    this.preencherDadosUsuario(localUser);
    this.getLocation();
  }

  getLocation() {
    /*navigator.geolocation.getCurrentPosition((position) => {
     
      alert('Latitude: ' + position.coords.latitude + ' Longitude: ' + position.coords.longitude);
    }) */

  }

  ngOnInit(): void {

    this.anuncio = this.anuncioService.novo();

    this.equipamentoService.findTipos().subscribe(result => {
      this.tipos = result;

    });

    this.buscarMarcas();
    this.filteredOptions = this.myControl.valueChanges.pipe(map(value => this._filter(value)));
    this.anuncioService.getTotalAtivo().subscribe(result => {
      this.total = result;
    });
  }

  checkUsuario() {
    this.usuarioService.getPing().subscribe(result => {

    }, err => {
      if (err.status == 403) {
        this.logout();
        this.route.navigate(["/login"]);
      }
    });
  }

  loginComParametros(parametro) {
    if (this.storage.getLocalUser() != undefined || this.storage.getLocalUser() != null) {
      this.route.navigate([parametro]);
    } else {
      const dadosParametros = {
        redirectAfterTo: parametro
      }
      this.route.navigate(['login', dadosParametros]);
    }
  }

  

  buscarMarcas() {
    this.marcaService.findAll().subscribe(
      result => {
        this.marcasDesc = result;        
        this.marcas = this.marcasDesc.map(
          marca => marca.descricao.toUpperCase()
        );
      },
      err => console.log('Erro: ' + err)
    );
  }

  private _filter(value: string): string[] {

    const filterValue = value.toLowerCase();

    return this.marcas.filter(marca =>
      marca.toLowerCase().includes(filterValue)
    );
  }

  spots() {
    
    this.route.navigate(['/spot/filtro']);
    
  }
  
  anunciar() {

    if (this.usuario.id != null) {
      let tipo = this.anuncio.tipo;
      //let page = '/pagina-inicial'
      this.route.navigate(["/anuncio/anunciar",
        {
          'tipo': JSON.stringify(tipo),
        }]);

    } else {

      this.route.navigate(['/login']);

    }
  }

  ngAfterViewInit() {


  }

  filtrarAnuncios() {

    //alert('marca: ' + this.anuncio.marca.descricao);

    let anuncio = JSON.stringify(this.anuncio);

    this.route.navigate(['/anuncio/filtro',
      {
        'anuncio': anuncio

      }]);
  }

  buscarAvancada(filtroMarca) {

    let marca = this.marcasDesc.filter(item => item.descricao === filtroMarca.value);
    this.anuncio.marca = marca[0];

    if (this.anuncio.marca != null) {
      let anuncio = JSON.stringify(this.anuncio);
      this.route.navigate(['/anuncio/filtro',
        {
          'anuncio': anuncio

        }]);
    } else {
      this.route.navigate(['/anuncio/filtro']);
    }
  }

  logout() {

    this.setDefaultPic();
    this.storage.setLocalUser(null);
    this.usuario.id = null;
    console.clear();

    this.googleService.signOut().then(result => {
    }, err => {
      console.log(err);
    });
  }


};
