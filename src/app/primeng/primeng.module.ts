import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileUploadModule} from 'primeng/fileupload';
import {BlockUIModule} from 'primeng/blockui';
import { SkeletonModule } from 'primeng/skeleton';
import {CardModule} from 'primeng/card';
import {TabMenuModule} from 'primeng/tabmenu';
import {ListboxModule} from 'primeng/listbox';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {EditorModule} from 'primeng/editor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FileUploadModule,
    BlockUIModule,
    SkeletonModule,
    CardModule,
    TabMenuModule,
    ListboxModule,
    AutoCompleteModule,
    EditorModule,    
  ],
  exports: [
    FileUploadModule,
    BlockUIModule,
    SkeletonModule,
    CardModule,
    TabMenuModule,
    ListboxModule,
    AutoCompleteModule,
    EditorModule
  ]
})
export class PrimengModule { }
