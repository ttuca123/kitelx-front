import { AfterContentChecked, AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AnuncioItemDataSource } from '../../datasource/anuncio-item-datasource';
import { PageForm } from '../../datasource/page-form';
import { Anuncio } from '../../vo/anuncio';
import { AnuncioService } from '../../services/anuncio.service';
import { MatDialog, MatPaginator } from '@angular/material';
import { View } from '../../view';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'anuncio-list',
  templateUrl: './anuncio-list.component.html',
  styleUrls: ['./anuncio-list.component.scss']
})
export class AnuncioListComponent extends View implements OnInit,  AfterContentChecked  {

  constructor(public route: Router, public anuncioService: AnuncioService, public loading: MatDialog
    ) {
      super(loading, route);

   }

  dataSource: AnuncioItemDataSource;
  
  @Input('pageForm')  pager: PageForm;  
  @Input('anuncio')  anuncio: Anuncio;
  
  colunas: string[] = ['item'];
  
  @Input('anuncios')  anuncios= [];  
  modeloSub: Subscription;

  @ViewChild('paginador') paginador: any;

  ngOnInit(): void {
    
    this.dataSource = new AnuncioItemDataSource(this.anuncioService, this.loading);
    this.exibirLoading();     
    
  }

  ngAfterContentChecked(): void{
    
    if(this.anuncioService.pageFormFilter!=undefined && this.paginador!=undefined){
      this.paginador._pageIndex = this.anuncioService.pageFormFilter.pageable.pageNumber;    
      console.log('página modificada ' + this.anuncioService.pageFormFilter.pageable.pageNumber);      
    }

  }

  

  /**
   * @description Método para paginar a lista de itens do anúncio
   *
   * @param {*} event
   * 
   */
  paginar(event) {
    
    this.pagina = event.pageIndex;        
    this.filtrar(event);

  }

  filtrar(event) {    
    
    this.exibirLoading();    

    this.modeloSub = this.anuncioService.filter(this.pagina, this.pager.size, this.anuncio)
    .subscribe(page => {

      this.pager = page;
      this.anuncios = this.pager.content;
      this.anuncioService.pageFormFilter = this.pager;     

      this.fecharLoading();   
      
      if(this.anuncioService.pageFormFilter!=undefined){
        this.paginador._pageIndex = this.anuncioService.pageFormFilter.pageable.pageNumber;    
        console.log('página modificada **' + this.anuncioService.pageFormFilter.pageable.pageNumber);
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
 

}
