import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioFilterComponent } from './usuario-filter/usuario-filter.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioItemComponent } from './usuario-item/usuario-item.component';


@NgModule({
  declarations: [UsuarioFormComponent, UsuarioFilterComponent, UsuarioListComponent, UsuarioItemComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
