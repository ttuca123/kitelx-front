import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParceiroRoutingModule } from './parceiro-routing.module';
import { ParceiroFilterComponent } from './parceiro-filter/parceiro-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from '../material-component/material.module';

import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ParceiroDetailComponent } from './parceiro-detail/parceiro-detail.component';
import { ParceiroListComponent } from './parceiro-list/parceiro-list.component';
import { ParceiroFormComponent } from './parceiro-form/parceiro-form.component';
import { ParceiroItemComponent } from './parceiro-item/parceiro-item.component';
import { RouterModule } from '@angular/router';
import { ParceiroService } from '../services/parceiro.service';


@NgModule({
  declarations: [
    ParceiroFilterComponent, 
    ParceiroDetailComponent, 
    ParceiroListComponent, 
    ParceiroFormComponent, 
    ParceiroItemComponent],
  imports: [    
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    ParceiroRoutingModule,
    MatCarouselModule.forRoot(),    
    
  ], providers: [RouterModule, ParceiroService],
  exports: [ParceiroFilterComponent]
})
export class ParceiroModule { }
