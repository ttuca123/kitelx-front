import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarcaItemDataSource } from '../../datasource/marca-item-datasource';
import { PageForm } from '../../datasource/page-form';
import { MarcaService } from '../../services/marca.service';
import { View } from '../../view';
import { Marca } from '../../vo/marca';
 
@Component({
  selector: 'app-marca-list',
  templateUrl: './marca-list.component.html',
  styleUrls: ['./marca-list.component.scss']
})
export class MarcaListComponent extends View implements OnInit,  OnDestroy  {

  dataSource: MarcaItemDataSource;
  
  @Input('pageForm')  pager: PageForm;  
  @Input('marca')  marca: Marca;
  
  colunas: string[] = ['item'];
  
  @Input('marcas')  marcas= [];  
  modeloSub: Subscription;

  @ViewChild('paginador') paginador: any;

  constructor(public route: Router, public marcaService: MarcaService, public loading: MatDialog) {
      super(loading, route);

   }
 
  ngOnInit(): void {
    
    this.dataSource = new MarcaItemDataSource(this.marcaService, this.loading);
 
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

    this.modeloSub = this.marcaService.filter(this.pagina, this.pager.size, this.marca)
    .subscribe(page => {

      this.pager = page;
      this.marcas = this.pager.content;
      this.marcaService.pageFormFilter = this.pager;     

      this.fecharLoading();   
      
      if(this.marcaService.pageFormFilter!=undefined){
        this.paginador._pageIndex = this.marcaService.pageFormFilter.pageable.pageNumber;    
        console.log('página modificada **' + this.marcaService.pageFormFilter.pageable.pageNumber);
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
    
  //  throw new Error('Method not implemented.');
  }

}
