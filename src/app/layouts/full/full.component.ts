import * as $ from 'jquery';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  AfterViewInit, OnInit, OnChanges 
} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { filter } from 'rxjs/operators';
import { RouteEventsService } from '../../services/route-events.service';
import { Location } from '@angular/common';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { TERMOS_USO } from '../../../environments/environment.prod';
import { MatDialog } from '@angular/material';
import { DialogTermosdeUsoComponent } from '../../dialog/dialog-termos-de-uso/dialog-termos-de-uso.component';
import { DialogComoUsarComponent } from '../../dialog/dialog-como-usar/dialog-como-usar.component';
import { fadeInAnimation } from '../../vo/animations';

@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: ['full.component.scss'],  
  animations: [fadeInAnimation]
})
export class FullComponent  implements OnDestroy, AfterViewInit, OnChanges {
  
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;
  
  mobileQuery: MediaQueryList;
  gtag: Function;
  private _mobileQueryListener: () => void;
  habilitaVoltar = false;
  outlet: any;
  
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    public location: Location,
    public route: Router,
    public routeEventsService:RouteEventsService,
    public $gaService: GoogleAnalyticsService,
    public dialog: MatDialog
  ) {

    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);   

    this.route.events.subscribe(event=> {
      
      this.habilitaVoltar = this.route.url!='/pagina-inicial';      

        if(event instanceof NavigationEnd){

          $gaService.pageView('acesso_pagina', event.urlAfterRedirects);
        
      }
    });
    
  }

  prepareRoute(outlet: RouterOutlet) {
    console.log(outlet);
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }



  exibirTermodeUso() {
   
      const dialogRef = this.dialog.open(DialogTermosdeUsoComponent, {
        disableClose: false,
        hasBackdrop:true
      });
      dialogRef.afterClosed().subscribe(result =>{
        console.log('The dialog was closed')
      })
  }

  exibirComoUsar() {
    
      const dialogRef = this.dialog.open(DialogComoUsarComponent, {
        //width: '360px',
        //data: {titulo: 'Termos de Uso',texto:TERMOS_USO},
        disableClose: false,
        hasBackdrop:true
      });
      dialogRef.afterClosed().subscribe(result =>{
        console.log('The dialog was closed')
      })
  }
  

  voltar() {    

    window.history.back();
          
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {

    
  }

  ngOnChanges(){

    console.log('mudança');
  }
  
}
