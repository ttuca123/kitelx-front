import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaInicialComponent } from './pagina-inicial.component';
import { RouterModule } from '@angular/router';
import { PaginaInicialRouting } from './pagina-inicial.routing';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    PaginaInicialComponent,
    RouterModule.forChild(PaginaInicialRouting)
  ],
  declarations: [PaginaInicialComponent],
})
export class PaginaInicialModule { }
