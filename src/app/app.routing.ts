import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AuthComponent } from './auth/auth.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { EquipamentoProprietarioComponent } from './equipamento/equipamento-proprietario.component';
import { ResetSenhaComponent } from './reset-senha/reset-senha.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { NovaSenhaComponent } from './nova-senha/nova-senha.component';
import { NgModule } from '@angular/core';
import { EquipamentoDetailComponent } from './equipamento/equipamento-detail/equipamento-detail.component';
import { PermGuardService } from './guards/perm-guard.service';
import { PainelAdministrativoComponent } from './painel-administrativo/painel-administrativo.component';
import { RedirectTokenComponent } from './redirect-token/redirect-token.component';
import { RelatorioAdminComponent } from './report/relatorio-admin/relatorio-admin.component';
import { MarcaFormComponent } from './marca-modelo/marca-form/marca-form.component';
import { MarcaFilterComponent } from './marca-modelo/marca-filter/marca-filter.component';
import { ModeloFilterComponent } from './marca-modelo/modelo-filter/modelo-filter.component';
import { ModeloFormComponent } from './marca-modelo/modelo-form/modelo-form.component';

export const AppRoutes: Routes = [
  
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'registro-usuario',
    component: RegistroUsuarioComponent,
  },
  {
    path: 'reset-senha',
    component: ResetSenhaComponent,
  },
  {
    path: 'nova-senha2/:email',
    component: NovaSenhaComponent,
  }, 
  {
    path: 'redirect_token/:token',
    component: RedirectTokenComponent
  },  
  { path: ' ', redirectTo: 'pagina-inicial', pathMatch: 'full'},
  {    
    path: '',
    component: FullComponent,
      
    children: [
      {
        path: '',
        redirectTo: '/pagina-inicial',
        pathMatch: 'full'
      },
      {
        path: 'nova-senha',
        component: NovaSenhaComponent,
      },
      
      {
        path: 'nova-senha/:email',
        component: NovaSenhaComponent,
      },
      {
        path: 'painel-administrativo',
        component: PainelAdministrativoComponent,
        canActivate: [PermGuardService]       
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'pagina-inicial',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          title: 'KiteLX - Plataforma digital de compra/venda de kite',
          description:'Plataforma digital de compra/venda de equipamento de kitesurf, kite, prancha, trapézio, barra, com todas as marcas, veja na seção de Destaques aqui.',
          url: 'https://kitelx.com.br/'
        }
      },
      {        
          path: 'equipamento-proprietario',
          component: EquipamentoProprietarioComponent,        
      },
      {
        path: 'equipamento-detail/:id',
        component: EquipamentoDetailComponent,
      },     
      {        
        path: 'perfil-usuario',
        component: PerfilUsuarioComponent, 
        
      }, 
      {        
        path: 'report-admin',
        component: RelatorioAdminComponent,
        canActivate: [PermGuardService] 
         
        
      },      
      {
        path: 'equipamento',
        loadChildren: () => import('./equipamento/equipamento.module').then(m => m.EquipamentoModule)
      },
      {
        path: 'anuncio',
        loadChildren: () => import('./anuncio/anuncio.module').then(m => m.AnuncioModule),
        
      },
      {
        path: 'spot',
        loadChildren: () => import('./spot/spot.module').then(m => m.SpotModule)
      },
     
      {
        path: 'patrocinador',
        loadChildren: () => import('./patrocinador/patrocinador.module').then(m => m.PatrocinadorModule)
      },
      {
        path: 'parceiro',
        loadChildren: () => import('./parceiro/parceiro.module').then(m => m.ParceiroModule)
      },
      {
        path: 'noticia',
        loadChildren: () => import('./noticia/noticia.module').then(m => m.NoticiaModule)
      },
      {
        path: 'marcas/filtro',
        component: MarcaFilterComponent
      },
      {
        path: 'marcas/novo',
        component: MarcaFormComponent
      },
      {
        path: 'marcas/editar/:id',
        component: MarcaFormComponent
      },
      {
        path: 'modelos/filtro',
        component: ModeloFilterComponent
      },
      {
        path: 'modelos/novo',
        component: ModeloFormComponent
      },
      {
        path: 'modelos/editar/:id',
        component: ModeloFormComponent
      }      
      
    ],
  }
];


@NgModule({
  imports: [ RouterModule.forRoot(AppRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
