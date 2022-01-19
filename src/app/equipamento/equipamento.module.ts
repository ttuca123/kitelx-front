import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnuncioRoutingModule } from '../anuncio/anuncio.routing';
import { EquipamentoProprietarioComponent } from './equipamento-proprietario.component';
import { EquipamentoFormComponent } from './equipamento-form/equipamento-form.component';
import { EquipamentoItemComponent } from './equipamento-item/equipamento-item.component';
import { EquipamentoDetailComponent } from './equipamento-detail/equipamento-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from '../material-component/material.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CarouselModule } from 'primeng/carousel';
import { FotoModule } from '../foto/foto.module';



@NgModule({
  declarations: [EquipamentoProprietarioComponent,EquipamentoItemComponent,
    EquipamentoDetailComponent, EquipamentoFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    AnuncioRoutingModule,
    MatCarouselModule.forRoot(),
    CarouselModule,
    FotoModule
  ],
  exports: [EquipamentoFormComponent]
})
export class EquipamentoModule { }
