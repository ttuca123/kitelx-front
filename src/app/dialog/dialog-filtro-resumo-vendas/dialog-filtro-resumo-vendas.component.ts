import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ReportService } from '../../services/report.service';
import { View } from '../../view';
import * as FileSaver from 'file-saver';


 interface ResumoVenda {
  dataInicioExclusao: Date;
  dataFimExclusao: Date;

}

@Component({
  selector: 'app-dialog-filtro-resumo-vendas',
  templateUrl: './dialog-filtro-resumo-vendas.component.html',
  styleUrls: ['./dialog-filtro-resumo-vendas.component.scss']
})
export class DialogFiltroResumoVendasComponent extends View  {

  constructor(public dialogRef: MatDialogRef<DialogFiltroResumoVendasComponent>, public reportService: ReportService,
    public route: Router,  public loading: MatDialog) { 

      
      super(null, route);   
      this.loading = loading;
    }

  resumoVendas: ResumoVenda = {
    dataInicioExclusao: null,
    dataFimExclusao: null
  };
  

  onSubmit() {

    //this.exibirLoading();

    console.log(this.resumoVendas);

    this.reportService.getAnunciosExcluidosDia(this.resumoVendas)
    .subscribe((file) => {

      //this.fecharLoading();
      FileSaver.saveAs(file, 'anuncios_excluidos_dia' + new Date().getTime() + '.pdf');
      //this.closeModal();

    }, (err) => {
       this.fecharLoading();
       console.error(err);

      }    
    );     
  } 

   closeModal() {

      this.dialogRef.close();   
  }

}
