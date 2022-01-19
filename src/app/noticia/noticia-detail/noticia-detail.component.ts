import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiaService } from '../../services/noticia.service';
import { StorageService } from '../../services/storage.service';
import { LocalUser } from '../../vo/local-user';
import { Noticia } from '../../vo/noticia';

@Component({
  selector: 'app-noticia-detail',
  templateUrl: './noticia-detail.component.html',
  styleUrls: ['./noticia-detail.component.css']
})
export class NoticiaDetailComponent implements OnInit {

  noticia: Noticia;
  edicao: boolean;
  localUser: LocalUser;
  id: any;

  constructor(public storage: StorageService, private routeActivated: ActivatedRoute, 
    private noticiaService: NoticiaService, public route: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.routeActivated.params.subscribe(params => {
      this.id = params['id'];
      this.getDadosNoticia(this.id);

    }); 

    this.localUser = this.storage.getLocalUser();
    this.edicao = (this.localUser != null && (this.localUser?.perfil == 1));
  }

  getDadosNoticia(id) {

    this.noticiaService.getNoticia(id)
    .subscribe(resultado => {
      this.noticia = resultado;
      
    });
  }

  editar() {
    this.route.navigate(['/noticia/editar/'+this.id]);

    
  }

  excluir() {
    
    this.noticiaService.excluirNoticia(this.id)
    .then(()=> {
      
      this._snackBar.open('Notícia Excluída com Sucesso.', 'Excluído', { duration: 1500 });  
            setTimeout(()=>{ 
              
              this.route.navigate(['/#/']);

            }, 1000);       
      //alert('Noticia excluida com sucesso.');
    });

  }

}
