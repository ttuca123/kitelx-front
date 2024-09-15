import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { View } from '../view';
import { Foto } from '../vo/foto';
import {NgxImageCompressService} from 'ngx-image-compress';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.scss']
})
export class FotoComponent extends View {

  @Input()
  titulo: '';
  @Input()
  fotos = [];  
  MAX_SIZE=1000000;
  @Output() excluir = new EventEmitter<any>();
  @Output() adicionar = new EventEmitter<any>();
  imgResultBeforeCompress:string;
  imgResultAfterCompress:string;
  
  totalFotos: number;

  constructor(public dialog: MatDialog, public route: Router, private imageCompress: NgxImageCompressService) { 

    super(dialog, route);
  }  

  

  adicionarFoto(event) {   
  
    this.msgErro='';
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      console.clear();
      console.log(file);      
      //if(file.size<5000000){
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {         

            console.log(reader);
            
            const fotoBase64 = reader.result + '';

            this.imageCompress.compressFile(fotoBase64, 50, 50).then(
              result => {
                this.imgResultAfterCompress = result;

                  const foto: Foto = {
                    nome: this.imgResultAfterCompress,
                    referencia: true,
                    refFoto: file.name,
                    ordem: i
                  };
                  this.fotos.push(foto);

                console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
              }
            );           
            
        };

        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
    /*  }else{
        this.exibirErro(1, 'Foto está acima do limite de 5MB permitida.');
        
      }     */ 
    } 
  }

  
 
  compressFile() {
  
    this.imageCompress.uploadFile().then(({image, orientation}) => {
    
      this.imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      
      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          this.imgResultAfterCompress = result;
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
        }
      );
      
    });
    
  }

  excluirFoto(data_item) {
    
    this.fotos = this.fotos.filter(item => item.nome !== data_item.nome);
    this.excluir.emit(data_item);
  }

}
