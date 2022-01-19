import { Component, OnInit } from '@angular/core';
import { DataSnapshot } from '@angular/fire/database/interfaces';

import { from, fromEvent, Observable, Observer, of } from 'rxjs';

import { filter, map, mergeAll, mergeMap, switchAll, tap } from 'rxjs/operators';
import { NoticiaService } from '../../services/noticia.service';
import { Categoria } from '../../vo/categoria';
import { Noticia } from '../../vo/noticia';


@Component({
  selector: 'app-noticia-list',
  templateUrl: './noticia-list.component.html',
  styleUrls: ['./noticia-list.component.css']
})
export class NoticiaListComponent implements OnInit {
  
  cats:any;  

  constructor(private noticiaService: NoticiaService) { 
    
    
    
  }

  ngOnInit(): void {  

    this.cats = [];

    this.getNoticiasByCategoria('Reviews');
    this.getNoticiasByCategoria('Trips');
    this.getNoticiasByCategoria('News');
    
  }


  getNoticiasByCategoria(categoria){ 

    this.noticiaService.getNoticiasCategoria(categoria)
    .subscribe(result=> {
      this.cats.push({nome: categoria, listaNoticias: result})           
      console.log(this.cats);
    }); 
  }

  detalhar(key) {    

  }

}
