import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermGuardService } from '../guards/perm-guard.service';
import { NoticiaDetailComponent } from './noticia-detail/noticia-detail.component';
import { NoticiaFormComponent } from './noticia-form/noticia-form.component';


const routes: Routes = [
  {
    path: 'novo',
    component: NoticiaFormComponent,
    canActivate: [PermGuardService]    
  },
  {      
    path: 'noticia/:id',
    component: NoticiaDetailComponent,
    pathMatch: 'full'
  },
  {
    path: 'editar/:id',
    component: NoticiaFormComponent,    
    pathMatch: 'full',    
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticiaRoutingModule { }
