import { Component, OnInit,  OnChanges,  SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { View } from '../../view';
import { MatDialog } from '@angular/material';
import { MarcaService } from '../../services/marca.service';
import { Observable } from 'rxjs';
import { PageForm } from '../../datasource/page-form';
import { StorageService } from '../../services/storage.service';
import { LocalUser } from '../../vo/local-user';

@Component({
  selector: 'app-marca-filter',
  templateUrl: './marca-filter.component.html',
  styleUrls: ['./marca-filter.component.scss']
})
export class MarcaFilterComponent extends View implements OnInit, OnChanges {

  marca: any;
  tipos = [];
  marcas = [];
  modelos = [];
  acessorios = [];
  filteredLocais: Observable<string[]>;
  pageForm: PageForm;    
  localUser: LocalUser;
   

  constructor(public storageService: StorageService, public dialog: MatDialog, public route: Router,
    public marcaService: MarcaService, private routeActivated: ActivatedRoute, public storage: StorageService) {

    super(dialog, route);
  } 

  ngOnInit(): void {
    
    this.marca = this.marcaService.novo();
    this.localUser = this.storage.getLocalUser();    
    this.pageForm = this.marcaService.pageFormFilter == undefined?new PageForm():this.marcaService.pageFormFilter;
    this.buscar();
  }    

  ngOnChanges(changes: SimpleChanges): void{
    
    console.log(changes);
   
  }

  limpar(): void {

    this.marca = this.marcaService.novo();
    this.marcaService.pageFormFilter = undefined;    
    
  }   

  novo() {

    this.route.navigate(['marcas/novo']);
  }


  buscar() {

    this.exibirLoading();    
    this.pagina = 0;
    if(this.marcaService.pageFormFilter==undefined) {      
     
      this.pageForm = new PageForm();
      
      this.marcaService.pageFormFilter = this.pageForm;
      
    } else {
      
      this.pageForm = this.marcaService.pageFormFilter;
      this.pageForm.pageable.pageNumber=0;
      this.pagina = this.marcaService.pageFormFilter.pageable.pageNumber;
     
    }
    this.fecharLoading();
    
    this.marcaService.filter(this.pagina, this.pageForm.size, this.marca)
      .subscribe(page => {

        this.pageForm = page;
        this.marcas = this.pageForm.content;
        this.fecharLoading();

      }, error => {

        console.error(error);
        this.fecharLoading();
      });

  }



}
