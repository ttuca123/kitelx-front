import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiaRoutingModule } from './noticia-routing.module';
import { NoticiaFormComponent } from './noticia-form/noticia-form.component';
import { NoticiaFilterComponent } from './noticia-filter/noticia-filter.component';
import { NoticiaListComponent } from './noticia-list/noticia-list.component';
import { NoticiaItemComponent } from './noticia-item/noticia-item.component';
import { NoticiaDetailComponent } from './noticia-detail/noticia-detail.component';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from '../material-component/material.module';
import { RouterModule } from '@angular/router';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CarouselModule } from 'primeng/carousel';
import { FotoModule } from '../foto/foto.module';


@NgModule({
  declarations: [NoticiaFormComponent, NoticiaFilterComponent, NoticiaListComponent, NoticiaItemComponent, NoticiaDetailComponent],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    NoticiaRoutingModule,
    MatCarouselModule.forRoot(),
    CarouselModule,
    FotoModule
  ],
  providers: [RouterModule],
  exports: [NoticiaListComponent, NoticiaItemComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NoticiaModule { }
