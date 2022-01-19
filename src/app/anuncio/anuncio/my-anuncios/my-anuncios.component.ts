import { Component, OnInit, Output } from '@angular/core';
import { AnuncioService } from '../../../services/anuncio.service';
import { UsuarioService } from '../../../services/usuario.service';
import { View } from '../../../view';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-anuncios',
  templateUrl: './my-anuncios.component.html',
  styleUrls: ['./my-anuncios.component.scss']
})
export class MyAnunciosComponent extends View implements OnInit {

  titulo = 'Meus Anúncios';  
  bloqueio = false;  

  constructor(public anuncioService: AnuncioService, public usuarioService: UsuarioService,
     public dialog: MatDialog, public storage: StorageService,
     public route: Router, private _snackBar: MatSnackBar     
     ) {

    super(dialog, route);
   }

  ngOnInit() {

    this.exibirLoading();
    let localUser = this.storage.getLocalUser();

    this.usuarioService.findById(localUser.id).subscribe(result => {

      this.fecharLoading();
      console.clear();
      console.log(result);
      this.usuario = result;

    }, err => {
      this.fecharLoading();
      console.log(err);

      if(err.status==403){

        this._snackBar.open('Sessão Expirada, por favor logue novamente', 'Sessão Expirada', {duration:2000});
        
        setTimeout(()=> {

          this.route.navigate(["login"]);
  
        }, 3000);

        this.storage.setLocalUser(null);
        
      }

    });  
  }

 /* detalharAnuncio(anuncio){  

    this.dialog.open(AnuncioDialogComponent, {
      width: '650px',
      maxHeight: '450px',
      data: {'anuncio': anuncio,
             'usuario': this.usuario,
            'bloqueio': false}
    });     

    } */
    
    
    anunciar() {
    
      this.route.navigate(["/anuncio/anunciar"]);    
  
    }

}
