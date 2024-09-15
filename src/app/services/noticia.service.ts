import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categoria } from '../vo/categoria';
import { Noticia } from '../vo/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private noticiasCollection = this.afs.list('noticias');
  private categoriasCollection = this.afs.list('categorias');


  constructor(private afs: AngularFireDatabase, private sanitized: DomSanitizer) { }

  novo() {
    let noticia: Noticia = {
      titulo: '',
      subtitulo: '',
      creditos: '',
      descricao: '',
      foto: '',
      categoria: {
        id: 0,
        desc: ''
      },
      data: new Date().getTime()   
    }

    return noticia;
  }

  novoCategoria() {
    let categoria: Categoria = {
      id: 0,
      desc: ''
    }

    return categoria;
  }
  

  getNoticiasCategoria(categoria) : Observable<any>{    
    

    return  this.afs.list('noticias', ref => ref.orderByChild('categoria').equalTo(categoria).limitToFirst(2)).snapshotChanges()
    .pipe(map(action => action.map(a => {
      const key = a.payload.key;
      const data = {
        key: key,
        valor: a.payload.val()
      };
      return data;
    })
  ));   
  }

  getNoticia(chave): Observable<any>{

    return  this.afs.object('noticias/'+chave).valueChanges();
  }  

  getCategorias(): Observable<any> {
    
    return this.categoriasCollection.valueChanges();
  }

  addNoticia(noticia: Noticia) {
    this.noticiasCollection.push(noticia);
  }

  setNoticia(noticia: Noticia, chave):Promise<void> {

    return this.afs.object('noticias/'+chave).update(noticia);
  }

  excluirNoticia(chave):Promise<any> {
    
    return this.afs.object('noticias/'+chave).remove();
  }

  imprimirBodyNoticiaHTML(noticia: Noticia) {
    
   return this.sanitized.bypassSecurityTrustHtml(noticia.descricao);
  }
}
