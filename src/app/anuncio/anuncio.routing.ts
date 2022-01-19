import { Routes, RouterModule } from "@angular/router";
import { AnuncioFormComponent } from "./anuncio-form/anuncio-form.component";
import { MyAnunciosComponent } from "./anuncio/my-anuncios/my-anuncios.component";
import { NgModule } from "@angular/core";
import { AnuncioFilterComponent } from "./anuncio-filter/anuncio-filter.component";
import { AnuncioDetailComponent } from "./anuncio-detail/anuncio-detail.component";

const routes: Routes = [           
    {      
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
      component: AnuncioFilterComponent,
      
    },
    {
      path: 'meus-anuncios',
      component: MyAnunciosComponent,
      
    },
    {
      path: ':marca/detalhe/:id',
      component: AnuncioDetailComponent,
      pathMatch: 'full',      
      
    },
    {
      path: 'detalhar/:equipamento/:marca/:id',
      component: AnuncioDetailComponent,
      pathMatch: 'full',      
    }    
   
  ];
  
 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnuncioRoutingModule {}