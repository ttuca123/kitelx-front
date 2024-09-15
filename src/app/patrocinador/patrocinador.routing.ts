import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PatrocinadorCarouselComponent } from "./patrocinador-carousel/patrocinador-carousel.component";


const routes: Routes = [           
    {
      path: 'patrocinadores',
      component: PatrocinadorCarouselComponent,
      pathMatch: 'full'
    }
  ];
  
 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatrocinadorRoutingModule {}