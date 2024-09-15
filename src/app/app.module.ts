
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {  AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { MaterialComponentsModule } from './material-component/material.module';
import { AuthComponent } from './auth/auth.component';
import { GoogleLoginProvider, AuthServiceConfig, LoginOpt } from 'angularx-social-login';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { LoadingComponent } from './loading/loading.component';
import { MenuEquipamentoComponent } from './menus/menu-equipamento.component';
import { ResetSenhaComponent } from './reset-senha/reset-senha.component';
import { AuthIntercaptorProvider } from './interceptors/auth-interceptor';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { NovaSenhaComponent } from './nova-senha/nova-senha.component';
import { FileInputConfig, NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { PainelAdministrativoComponent } from './painel-administrativo/painel-administrativo.component';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import {NgxImageCompressService} from 'ngx-image-compress';
import { Config } from './config/app.config';
import { Ambiente } from './config/ambiente';
import { DialogTermosdeUsoComponent } from './dialog/dialog-termos-de-uso/dialog-termos-de-uso.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RedirectTokenComponent } from './redirect-token/redirect-token.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { DialogExcluirComponent } from './dialog/dialog-excluir/dialog-excluir.component';
import { MatInputModule } from '@angular/material/input';
import { DialogComoUsarComponent } from './dialog/dialog-como-usar/dialog-como-usar.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { RelatorioAdminComponent } from './report/relatorio-admin/relatorio-admin.component';
import { SEOService } from './services/seo.service';
import { AngularFireModule} from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { MyFilesComponent } from './my-files/my-files.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { MarcaModeloComponent } from './marca-modelo/marca-modelo.component';
import {DataViewModule} from 'primeng/dataview';
import { MarcaFormComponent } from './marca-modelo/marca-form/marca-form.component';
import { ModeloFormComponent } from './marca-modelo/modelo-form/modelo-form.component';
import { MarcaFilterComponent } from './marca-modelo/marca-filter/marca-filter.component';
import { MarcaListComponent } from './marca-modelo/marca-list/marca-list.component';
import { MarcaItemComponent } from './marca-modelo/marca-item/marca-item.component';
import { ModeloFilterComponent } from './marca-modelo/modelo-filter/modelo-filter.component';
import { ModeloListComponent } from './marca-modelo/modelo-list/modelo-list.component';
import { ModeloItemComponent } from './marca-modelo/modelo-item/modelo-item.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { firebaseConfigProd } from '../environments/environment.prod';
import { environment } from '../environments/environment';
import { firebaseConfigTeste } from '../environments/environment.test';
import { ByPassSecurityPipe } from './pipe/byPassSecurity.pipe.';
import { DialogFiltroResumoVendasComponent } from './dialog/dialog-filtro-resumo-vendas/dialog-filtro-resumo-vendas.component';

const googleLoginOptions: LoginOpt = {
  scope: 'profile email',
  offline_access: false
};

const config = new AuthServiceConfig(
  [

    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("573731572191-g7tqsvf8fb0cq0u1bvq6a447ibj7tet5.apps.googleusercontent.com", googleLoginOptions)
    }
  ]
);

export const configFile: FileInputConfig = {
  sizeUnit: 'Octet'
};

export function provideConfig() {
  return config;
}

export function provideKeyAnalitics() {

  let googleAnalitics;

  switch(Config.AMBIENTE){

    case Ambiente.DEV:

      googleAnalitics = 'UA-1009'

    break;

    case Ambiente.TEST:
      googleAnalitics = 'G-1H6J6GT2YY'
    break;

    case Ambiente.PROD:
      googleAnalitics = 'UA-190618846-1'
    break;
    
  }

  return googleAnalitics;
}

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    AuthComponent,
    RegistroUsuarioComponent,
    LoadingComponent,
    MenuEquipamentoComponent,
    ResetSenhaComponent,
    PerfilUsuarioComponent,
    NovaSenhaComponent,
    PainelAdministrativoComponent,
    DialogTermosdeUsoComponent,
    DialogFiltroResumoVendasComponent,
    RedirectTokenComponent,
    DialogExcluirComponent,
    DialogComoUsarComponent,
    RelatorioAdminComponent,
    UploadFilesComponent,
    MyFilesComponent,
    DropzoneComponent,
    MarcaModeloComponent,  
    MarcaFormComponent,
    ModeloFormComponent,
    MarcaFilterComponent,
    MarcaListComponent,
    MarcaItemComponent,
    ModeloFilterComponent,
    ModeloListComponent,
    ModeloItemComponent,
    ByPassSecurityPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MaterialComponentsModule,
    BrowserAnimationsModule,
    FormsModule,   
    HttpClientModule,
    SharedModule,    
    AppRoutingModule,
    MatCarouselModule.forRoot(),    
    NgxGoogleAnalyticsModule.forRoot(provideKeyAnalitics()),
    NgxGoogleAnalyticsRouterModule,
    MatDialogModule,
    ConfirmDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.production?firebaseConfigProd:firebaseConfigTeste),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    DataViewModule,
    ScullyLibModule,
    MaterialComponentsModule

  ],
  exports: [
   // ParceiroComponent
   CommonModule

  ],
  providers: [ConfirmDialogModule,ConfirmationService,
    { provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }, AuthIntercaptorProvider,
    { provide: NGX_MAT_FILE_INPUT_CONFIG, useValue: config },
    NgxImageCompressService,
    SEOService
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
