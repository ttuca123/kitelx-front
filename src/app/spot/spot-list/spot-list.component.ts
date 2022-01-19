import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { PageForm } from '../../datasource/page-form';
import { SpotItemDataSource } from '../../datasource/spot-item-datasource';
import { AnuncioService } from '../../services/anuncio.service';
import { SpotService } from '../../services/spot.service';
import { View } from '../../view';
import { Spot } from '../../vo/spot';


@Component({
  selector: 'app-spot-list',
  templateUrl: './spot-list.component.html',
  styleUrls: ['./spot-list.component.scss']
})
export class SpotListComponent extends View implements OnInit {

  @Input('spots')  spots= [];  
  @Input('pageForm')  pager: PageForm;  
  @Input('spot')  spot: Spot;  
  colunas: string[]=['item'];
  dataSource: SpotItemDataSource;

  
  constructor(private spotService: SpotService,    
    public snackBar: MatSnackBar,
    public loading: MatDialog    
    ) { 

      super(loading, null);
    }

  ngOnInit() {
    
    this.dataSource = new SpotItemDataSource(this.spotService, this.loading);    

  }
 
  /**
   * @description Método para paginar a lista de itens do anúncio
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
    this.spotService.filter(this.pagina, this.pager.size, this.spot)
    .subscribe(page => {

      this.pager = page;
      this.spots = this.pager.content;
      this.fecharLoading();     
      
    }, error => {
      
      console.error(error);
      this.fecharLoading();
    });    

  }
}
