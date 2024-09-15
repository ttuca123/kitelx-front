import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from '../material-component/material.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CarouselModule } from 'primeng/carousel';
import { PatrocinadorRoutingModule } from './patrocinador.routing';
import { RouterModule } from '@angular/router';
import { PatrocinadorCarouselComponent } from './patrocinador-carousel/patrocinador-carousel.component';



@NgModule({
  declarations: [PatrocinadorCarouselComponent],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    PatrocinadorRoutingModule,
    MatCarouselModule.forRoot(),
    CarouselModule
  ],
  providers: [RouterModule]
  ,exports: [PatrocinadorCarouselComponent]
})
export class PatrocinadorModule { }
