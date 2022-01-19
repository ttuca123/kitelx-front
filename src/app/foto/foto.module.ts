import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FotoComponent } from './foto.component';
import { UploadingFotosComponent } from '../loading/uploading-fotos/uploading-fotos.component';
import { MaterialComponentsModule } from '../material-component/material.module';
import {NgxImageCompressService} from 'ngx-image-compress';

@NgModule({
  declarations: [FotoComponent, UploadingFotosComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule
  ], 
  exports: [
    FotoComponent,
    UploadingFotosComponent
  ],
  providers: [NgxImageCompressService],
})
export class FotoModule { }
