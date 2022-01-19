import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../../services/noticia.service';

@Component({
  selector: 'app-noticia-filter',
  templateUrl: './noticia-filter.component.html',
  styleUrls: ['./noticia-filter.component.css']
})
export class NoticiaFilterComponent implements OnInit {

  noticias: [];

  constructor(private noticiaService: NoticiaService) { }

  ngOnInit(): void {


  }

}
