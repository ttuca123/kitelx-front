import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnuncioFilterComponent } from './anuncio-filter/anuncio-filter.component';
import { AnuncioDestaqueComponent } from './anuncio-destaque/anuncio-destaque.component';
import { AnuncioFormComponent } from './anuncio-form/anuncio-form.component';
import { AnuncioComponent } from './anuncio/anuncio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialComponentsModule } from '../material-component/material.module';
import { MyAnunciosComponent } from './anuncio/my-anuncios/my-anuncios.component';
import { AnuncioRoutingModule } from './anuncio.routing';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {CarouselModule} from 'primeng/carousel';
import { AnuncioListComponent } from './anuncio-list/anuncio-list.component';
import { AnuncioItemComponent } from './anuncio-item/anuncio-item.component';
import { AnuncioDetailComponent } from './anuncio-detail/anuncio-detail.component';
import { FotoComponent } from '../foto/foto.component';
import { AppModule } from '../app.module';
import { FotoModule } from '../foto/foto.module';
import { EquipamentoModule } from '../equipamento/equipamento.module';
import { AnuncioFilterDashComponent } from './anuncio-filter-dash/anuncio-filter-dash.component';
import { PrimengModule } from '../primeng/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
  AnuncioFilterComponent, 
  AnuncioDestaqueComponent, 
  AnuncioFormComponent, 
  AnuncioComponent, 
  MyAnunciosComponent,   
  AnuncioListComponent,
  AnuncioItemComponent,
  AnuncioDetailComponent,
  AnuncioFilterDashComponent  
  ],
  imports: [    
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    AnuncioRoutingModule,
    MatCarouselModule.forRoot(),
    CarouselModule,
    FotoModule,
    EquipamentoModule,
    PrimengModule,
    
    
  ], providers: [RouterModule],
  exports: [AnuncioDestaqueComponent, AnuncioFilterComponent, AnuncioFilterDashComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA ]
  
})
export class AnuncioModule { }
