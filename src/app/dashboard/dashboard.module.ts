import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { ChartistModule } from 'ng-chartist';
import { AnuncioModule } from '../anuncio/anuncio.module';
import { MaterialComponentsModule } from '../material-component/material.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CarouselModule } from 'primeng/carousel';
import { PatrocinadorModule } from '../patrocinador/patrocinador.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpotModule } from '../spot/spot.module';
import { NoticiaModule } from '../noticia/noticia.module';


@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    MaterialComponentsModule,
    //MatButtonModule,    
    RouterModule.forChild(DashboardRoutes),
    AnuncioModule,
    SpotModule,
    NoticiaModule,
    PatrocinadorModule,
    MatCarouselModule.forRoot(),
    CarouselModule,  
    FormsModule,
    ReactiveFormsModule
    
  ],
  exports: [DashboardComponent],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
