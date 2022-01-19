import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParceiroFilterComponent } from './parceiro-filter/parceiro-filter.component';
import { ParceiroFormComponent } from './parceiro-form/parceiro-form.component';


const routes: Routes = [
  {
    path: 'filtro',
    component: ParceiroFilterComponent
  },
  {
    path: 'novo',
    component: ParceiroFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class ParceiroRoutingModule { }
