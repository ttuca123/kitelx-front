import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PageForm } from '../../datasource/page-form';
import { SpotService } from '../../services/spot.service';
import { StorageService } from '../../services/storage.service';
import { View } from '../../view';
import { LocalUser } from '../../vo/local-user';
import { Spot } from '../../vo/spot';
@Component({
  selector: 'app-spot-filter',
  templateUrl: './spot-filter.component.html',
  styleUrls: ['./spot-filter.component.scss']
})
export class SpotFilterComponent extends View implements OnInit {

  spot: Spot;  
  spots: [];  
  meses: [];
  ventos: [];
  public pageForm: PageForm;
  public localUser: LocalUser;

  constructor(dialog: MatDialog, private spotService: SpotService, public route: Router, public storage: StorageService) {     
    
    super(dialog, route);
  }

  ngOnInit() {

    this.spot = this.spotService.novo();    
    this.titulo = 'Spots';
    this.getComplementos();
    this.buscar();
    this.localUser = this.storage.getLocalUser();
  }

  getComplementos(){

    this.spotService.getComplementos()
    .subscribe(r=> {
  
      this.meses = r.meses;
      this.ventos = r.ventos;
    });
   }  


  buscar() {
  
    this.exibirLoading();
    this.pageForm = new PageForm();
    this.pagina=0;
    this.spotService.filter(this.pagina, this.pageForm.size, this.spot)
    .subscribe(page => {

      this.pageForm = page;
      this.spots = this.pageForm.content;       
      this.fecharLoading();

    }, error => {
      
      console.log(error);
      this.fecharLoading();
    });

  }

  limpar() {
    this.spot = this.spotService.novo();
  }
}
