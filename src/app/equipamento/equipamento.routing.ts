import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";


const routes: Routes = [           
    /*{      
      path: 'anunciar/:id',
      component: AnuncioFormComponent,
      pathMatch: 'full'
    },
    {
      path: 'anunciar',
      component: AnuncioFormComponent
    },
    {
      path: 'filtro/:id',
      component: AnuncioFilterComponent
    },
    {
      path: 'filtro',
      component: AnuncioFilterComponent
    },
    {
      path: 'meus-anuncios',
      component: MyAnunciosComponent
    },
    {
      path: 'detalhe/:id',
      component: AnuncioDetailComponent,
      pathMatch: 'full'
    } */  
   
  ];
  
 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipamentoRoutingModule {}