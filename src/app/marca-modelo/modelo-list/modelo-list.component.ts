import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModeloItemDataSource } from '../../datasource/modelo-item-datasource';
import { PageForm } from '../../datasource/page-form';
import { ModeloService } from '../../services/modelo.service';
import { View } from '../../view';
import { Modelo } from '../../vo/modelo';

@Component({
  selector: 'app-modelo-list',
  templateUrl: './modelo-list.component.html',
  styleUrls: ['./modelo-list.component.scss']
})
export class ModeloListComponent extends View implements OnInit,  OnDestroy  {

  dataSource: ModeloItemDataSource;
  
  @Input('pageForm')  pager: PageForm;  
  @Input('modelo')  modelo: Modelo;
  
  colunas: string[] = ['item'];
  
  @Input('modelos')  modelos= [];  
  modeloSub: Subscription;

  @ViewChild('paginador') paginador: any;

  constructor(public route: Router, public modeloService: ModeloService, public loading: MatDialog) {
      super(loading, route);

   }
 
  ngOnInit(): void {
    
    this.dataSource = new ModeloItemDataSource(this.modeloService, this.loading);
 
  }

  /**
   * @description Método para paginar a lista de itens da marca
   *
   * @param {*} event
   * @memberof CompraCadastroComponent
   */
  paginar(event) {
    
    this.pagina = event.pageIndex;        
    this.filtrar(event);

  }

  filtrar(event) {    
    
    this.exibirLoading();    

    this.modeloSub = this.modeloService.filter(this.pagina, this.pager.size, this.modelo)
    .subscribe(page => {

      this.pager = page;
      this.modelos = this.pager.content;
      this.modeloService.pageFormFilter = this.pager;     

      this.fecharLoading();   
      
      if(this.modeloService.pageFormFilter!=undefined){
        this.paginador._pageIndex = this.modeloService.pageFormFilter.pageable.pageNumber;    
        console.log('página modificada **' + this.modeloService.pageFormFilter.pageable.pageNumber);
      }
  
      
    }, error => {
      
      console.error(error);
      this.fecharLoading();
    });    

  }

  limpar() {
   /* this.submitted = false;
    this.error = false; */
}

  voltar() {

    this.route.navigate(['pagina-inicial']);
    
  }
  
  
  ngOnDestroy(): void {

    if(this.modeloSub!=undefined){
      this.modeloSub.unsubscribe();
    }   
 
  }

}
