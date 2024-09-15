import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import * as FileSaver from 'file-saver';
import { Config } from '../../config/app.config';
import { View } from '../../view';
import { Router } from '@angular/router';
import { DialogFiltroResumoVendasComponent } from '../../dialog/dialog-filtro-resumo-vendas/dialog-filtro-resumo-vendas.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-relatorio-admin',
  templateUrl: './relatorio-admin.component.html',
  styleUrls: ['./relatorio-admin.component.scss']
})
export class RelatorioAdminComponent  extends View { 
  

  constructor(public dialog: MatDialog, private reportService: ReportService, public route: Router) {    
    super(dialog, route);      

   }  

  downloadRelAnunciosDia() {

    this.exibirLoading();

    this.reportService.getAnunciosDia()
      .subscribe((file: Blob) => {
        this.fecharLoading();
        FileSaver.saveAs(file, 'anuncios_dia' + new Date().getTime() + '.pdf');

      }, err => {
        this.fecharLoading();
        console.log(err);
      });
  }

  downloadRelAnunciosExcluidosDia() {

    this.dialog.open(DialogFiltroResumoVendasComponent, {
      height: '400px',
      width: '600px',
    });
  }


}
