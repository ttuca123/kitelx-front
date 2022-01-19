import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../vo/usuario';


@Component({
  selector: 'app-dialog-termos-de-uso',
  templateUrl: './dialog-termos-de-uso.component.html',
  styleUrls: ['./dialog-termos-de-uso.component.scss']
})
export class DialogTermosdeUsoComponent implements OnInit {  

  termosUso: boolean;
  usuario: Usuario;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<DialogTermosdeUsoComponent>) { }

  ngOnInit(): void {
    
    this.usuario = this.data.usuario;
   
  }

  confirmar() {
    
    this.usuario.termosDeUso = true;
    this.dialogRef.close({ usuario: this.usuario});

  }

  closeModal() {

    this.dialogRef.close();
  }

}
