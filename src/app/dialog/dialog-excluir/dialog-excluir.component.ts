import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AnuncioService } from '../../services/anuncio.service';
import { Anuncio } from '../../vo/anuncio';
import { Foto } from '../../vo/foto';

@Component({
  selector: 'app-dialog-excluir',
  templateUrl: './dialog-excluir.component.html'
})
export class DialogExcluirComponent implements OnInit {  
  
  motivos$: Observable<any>;
  anuncio: Anuncio;
  fotoPrincipal: Foto;
  confirmaExclusao:boolean = false;

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 10;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 5;
  vertical = false;
  tickInterval = 1;

 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<DialogExcluirComponent>, public anuncioService: AnuncioService) { }

  ngOnInit(): void {

    this.motivos$ = this.anuncioService.getMotivosExclusao();
    this.anuncio = this.data.anuncio;    
    this.fotoPrincipal = this.anuncio.fotos[0];
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  confirmar() {
    this.confirmaExclusao = true;
    this.dialogRef.close({ anuncio: this.anuncio, confirmaExclusao: this.confirmaExclusao});

  }

  cancelar(){

    this.confirmaExclusao = false;
    this.dialogRef.close({ confirmaExclusao: this.confirmaExclusao});
  }

}
