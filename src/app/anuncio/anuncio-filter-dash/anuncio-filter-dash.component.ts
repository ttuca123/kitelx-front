import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, SelectItemGroup } from 'primeng/api';
import { Listbox } from 'primeng/listbox';
import { from, fromEvent, Observable, Subject, } from 'rxjs';
import { debounceTime, delay, mergeAll, mergeMap, map } from 'rxjs/operators';
import { AnuncioService } from '../../services/anuncio.service';
import { EquipamentoService } from '../../services/equipamento.service';
import { MarcaService } from '../../services/marca.service';
import { Anuncio } from '../../vo/anuncio';
import { Equipamento } from '../../vo/equipamento';
import { Marca } from '../../vo/marca';

interface City {
  name: string,
  code: string
}

interface Country {
  name: string,
  code: string
}

@Component({
  selector: 'app-anuncio-filter-dash',
  templateUrl: './anuncio-filter-dash.component.html',
  styleUrls: ['./anuncio-filter-dash.component.scss']
})
export class AnuncioFilterDashComponent implements OnInit {

  items: MenuItem[];

  marcasDesc: Marca[] = [];
  marcas: string[] = [];
  anuncio: Anuncio;     
  selectedCountries: Country[];  
  equipamentos$: any;
  results: [] = [];
  nomeFilter: string;
  groupedMarcasModelos: any;
  filteredGroups: any;
  filtro: any;
  exibir=false;
  @Input('total')
  total = 0;
  subjects$ = new Subject<any>();   
  ESCAPE_KEYCODE = 27;

  constructor(public anuncioService: AnuncioService, public equipamentoService: EquipamentoService,
    public route: Router) {       
     

  }

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === this.ESCAPE_KEYCODE) {
        
        this.filtro = '';
        this.groupedMarcasModelos = [];
    }
  } 

  ngOnInit(): void {

    this.items = [
      {label: 'Quero Comprar', icon: ''},
      {label: 'Quero Vender', icon: '' }
    ];

    this.anuncio = this.anuncioService.novo();
       
}


  escolherItem(item) {

    let anuncio = this.anuncioService.novo();

    if(item.option.tipo==1){
      
      anuncio.marca.id = item.option.value;
    }else{
      
      anuncio.modelo.id = item.option.value;
    }    
     

    this.route.navigate(['/anuncio/filtro',
      {
        'anuncio': JSON.stringify(anuncio)

      }]);     
  }


  filtrarTipoEquipamento(tipo){    
    
    let anuncio = this.anuncioService.novo();
    anuncio.tipo.id = tipo;

    this.route.navigate(['/anuncio/filtro',
      {
        'anuncio': JSON.stringify(anuncio)

      }]);  

  }

  search(event) {       
    
    this.exibir = false;
    let nome = event._filterValue;       
    
    if(nome != ''){            
      
      this.equipamentoService.findMarcasOuModelos(nome)           
      .subscribe((result) => {
        this.exibir = true;
        this.groupedMarcasModelos = result; 
                 
      }); 

    }else{
      this.groupedMarcasModelos = [];
    }
}
  

}
