import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noticia } from '../../vo/noticia';

@Component({
  selector: 'app-noticia-item',
  templateUrl: './noticia-item.component.html',
  styleUrls: ['./noticia-item.component.css']
})
export class NoticiaItemComponent implements OnInit {

  @Input('noticia')
  noticia: Noticia;

  @Input('chave')
  chave: '';

  constructor(public router: Router) { }

  ngOnInit(): void {
    
  }

  detalhar() {
    
    this.router.navigate(['/noticia/noticia/' +this.chave ]);
  }

}
