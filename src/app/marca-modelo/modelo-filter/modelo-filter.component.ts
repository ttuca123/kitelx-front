import { Subject } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, ɵConsole, AfterViewInit, OnChanges, SimpleChange, SimpleChanges, Input, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { View } from '../../view';
import { MatDialog } from '@angular/material';
import { MarcaService } from '../../services/marca.service';
import { Observable } from 'rxjs';
import { PageForm } from '../../datasource/page-form';
import { StorageService } from '../../services/storage.service';
import { LocalUser } from '../../vo/local-user';
import { ModeloService } from '../../services/modelo.service';

@Component({
  selector: 'app-modelo-filter',
  templateUrl: './modelo-filter.component.html',
  styleUrls: ['./modelo-filter.component.scss']
})
export class ModeloFilterComponent extends View implements OnInit {

  modelo: any;  
  modelos = [];  
  filteredLocais: Observable<string[]>;
  pageForm: PageForm;      
   

  constructor(public storageService: StorageService, public dialog: MatDialog, public route: Router,
    public modeloService: ModeloService, private routeActivated: ActivatedRoute, public storage: StorageService) {

    super(dialog, route);
  } 

  ngOnInit(): void {
    
    this.modelo = this.modeloService.novo();    
    this.pageForm = this.modeloService.pageFormFilter == undefined?new PageForm():this.modeloService.pageFormFilter;
    this.buscar();
  }    
  
  limpar(): void {

    this.modelo = this.modeloService.novo();
    this.modeloService.pageFormFilter = undefined;    
    
  }   

  novo() {

    this.route.navigate(['modelos/novo']);
  }

  verificarFiltro(){

    if(this.modeloService.pageFormFilter==undefined) {
     
      this.pageForm = new PageForm();
      
      this.modeloService.pageFormFilter = this.pageForm;
      
    } else {
      
      this.pageForm = this.modeloService.pageFormFilter;
      this.pageForm.pageable.pageNumber=0;
      this.pagina = this.modeloService.pageFormFilter.pageable.pageNumber;
     
    }  

  }


  buscar() {

    this.exibirLoading();    
    this.pagina = 0;
    
     this.verificarFiltro();    
    
    this.modeloService.filter(this.pagina, this.pageForm.size, this.modelo)
      .subscribe(page => {

        this.pageForm = page;
        this.modelos = this.pageForm.content;
        this.fecharLoading();

      }, error => {

        console.error(error);
        this.fecharLoading();
      });

  }



}
