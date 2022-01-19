import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotService } from '../../services/spot.service';
import { View } from '../../view';

@Component({
  selector: 'app-spot-destaque',
  templateUrl: './spot-destaque.component.html',
  styleUrls: ['./spot-destaque.component.scss']
})
export class SpotDestaqueComponent extends View implements OnInit, OnDestroy {

  spots: any;    
  subscription: Subscription;

  constructor(public spotService: SpotService, public dialog: MatDialog, public route: Router) { 
    
    super(dialog, route);        
  }

  ngOnInit(): void {
    
    this.exibirLoading();
    this.subscription = new Subscription();

     const instancia = this.spotService.findDestaques().subscribe(result => {
        
        this.spots = result;        
        this.fecharLoading();
      }, err =>{
        this.fecharLoading();
        console.log(err);
      });
      this.subscription.add(instancia);
  }  

  ngOnDestroy(): void{
    
    this.subscription.unsubscribe();
    
  }

    detalhar(spot){      
      
      this.route.navigate(["/spot/detalhe/"+spot.id]);     
       
     }

}
