import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SpotFormComponent } from './spot-form/spot-form.component';
import { SpotFilterComponent } from './spot-filter/spot-filter.component';
import { SpotDetailComponent } from './spot-detail/spot-detail.component';
import { AuthGuard } from '../guards/auth-guard.service';
import { PermGuardService } from '../guards/perm-guard.service';



const routes: Routes = [           
   
    {
      path: 'novo',
      component: SpotFormComponent,
      canActivate: [PermGuardService]
      
    },
    {
      path: 'filtro/:id',
      component: SpotFilterComponent
    },
    {
      path: 'filtro',
      component: SpotFilterComponent
    },
    {
      path: 'detalhe/:id',
      component: SpotDetailComponent,
      pathMatch: 'full'
    },
    {
      path: 'editar/:id',
      component: SpotFormComponent,
      pathMatch: 'full',
      canActivate: [PermGuardService]
    }    
   
  ];
  
 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpotRoutingModule {}