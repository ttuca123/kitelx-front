import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { AnuncioService } from '../../services/anuncio.service';
import { View } from '../../view';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'anuncio-destaque',
  templateUrl: './anuncio-destaque.component.html',
  styleUrls: ['./anuncio-destaque.component.scss'],
})
export class AnuncioDestaqueComponent extends View implements OnInit, AfterViewInit, OnDestroy {

  anuncios: any;    
  subscription: Subscription;  
  
  @Input('total')
  total = 0;
  constructor(public anuncioService: AnuncioService, public dialog: MatDialog, public route: Router) { 
    
    super(dialog, route);    
  }

  ngOnInit(): void {
    
    this.subscription = new Subscription();

    
  }  

  ngAfterViewInit() {

    this.findDestaques();
  }

  findDestaques() {

    this.viewLoading = true;   
    const instancia = this.anuncioService.findDestaques().subscribe(result => {
        
      this.anuncios = result;   
      this.viewLoading = false;     
   //   this.fecharLoading();
    }, err =>{
     // this.fecharLoading();
      console.log(err);
    });
    this.subscription.add(instancia);
  }

  ngOnDestroy(): void{
    
    this.subscription.unsubscribe();
    
  }

    detalhar(anuncio){      
      
      this.route.navigate(["/anuncio/detalhe/"+anuncio.id]);     
       
     }

}
