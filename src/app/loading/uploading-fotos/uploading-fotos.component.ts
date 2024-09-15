import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-uploading-fotos',
  templateUrl: './uploading-fotos.component.html',
  styleUrls: ['./uploading-fotos.component.scss']
})
export class UploadingFotosComponent implements OnInit {

  uploadedFiles: any[] = [];

  constructor() { }

  ngOnInit(): void {

    
  }

  onUpload(event) {
    
    let i=0;
    for(let file of event.files) {
        this.uploadedFiles.push(file);
        i++;
        alert('upload foto '+i);        
    }    
  }

}
