import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotFilterComponent } from './spot-filter/spot-filter.component';
import { SpotDetailComponent } from './spot-detail/spot-detail.component';
import { SpotListComponent } from './spot-list/spot-list.component';
import { SpotFormComponent } from './spot-form/spot-form.component';
import { SpotItemComponent } from './spot-item/spot-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from '../material-component/material.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule } from '@angular/router';
import { SpotRoutingModule } from './spot.routing';
import { FotoModule } from '../foto/foto.module';
import { SpotDestaqueComponent } from './spot-destaque/spot-destaque.component';



@NgModule({
  declarations: [SpotFilterComponent, SpotDetailComponent, SpotListComponent, SpotFormComponent, SpotItemComponent, SpotDestaqueComponent],
  imports: [    
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    SpotRoutingModule,
    MatCarouselModule.forRoot(),
    CarouselModule,
    FotoModule
    
  ], providers: [RouterModule],
  exports: [SpotFilterComponent, SpotDestaqueComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA ]
})
export class SpotModule { }
