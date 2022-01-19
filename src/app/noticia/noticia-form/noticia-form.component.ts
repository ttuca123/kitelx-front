import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NoticiaService } from '../../services/noticia.service';
import { View } from '../../view';
import { Categoria } from '../../vo/categoria';
import { Foto } from '../../vo/foto';
import { Noticia } from '../../vo/noticia';

@Component({
  selector: 'app-noticia-form',
  templateUrl: './noticia-form.component.html',
  styleUrls: ['./noticia-form.component.css']
})
export class NoticiaFormComponent extends View implements OnInit, AfterViewInit {

  noticia: Noticia;
  categoria: Categoria;
  categorias$: Observable<any>;
  id: any;
  descricao: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  text1: string = '<h1 class="ql-align-center">Duotone x Cabrinha</h1><h2 class="ql-align-center">Noticias sobre as duas marcas.</h2><p>aqui</p><p class="ql-align-center"><img src="data:image/jpeg;base64,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"></p><p>fim</p>';
  
  //text2 = this.sanitized.bypassSecurityTrustHtml( `<embed src='https://www.youtube.com/embed/F9Bo89m2f6g' allowfullscreen='true' width='425' height='344'>`);
  //<h1 class="ql-align-center">Duotone x Cabrinha</h1><h2 class="ql-align-center">Noticias sobre as duas marcas.</h2><p class="ql-align-center">https://www.youtube.com/watch?v=ondexWGdOG4</p> teste
  
  //text2 = this.sanitized.bypassSecurityTrustHtml(this.text1);
  
  constructor(private sanitized: DomSanitizer, private noticiaService: NoticiaService, 
    public dialog: MatDialog, public route: Router, private routeActivated: ActivatedRoute ) { 

      super(dialog, route);
      this.noticia = this.noticiaService.novo();
    }
  ngAfterViewInit(): void {
    this.categorias$ = this.noticiaService.getCategorias();  
    

  }

  ngOnInit(): void {

    this.noticia = this.noticiaService.novo();
    this.iniciarInformacoes();
  }

  iniciarInformacoes() {
    
    
    
    this.routeActivated.params.subscribe(params => {
     
      this.id = params['id'];
      //const idEquipamento = params['idEquipamento'];        
      //const anuncioJSON = params['anuncio'];
      //const tipoAnuncio = params['tipo'];  
      this.carregarDados(this.id);
     
    }); 

  }


  carregarDados(id) {

    this.noticiaService.getNoticia(id)
    .subscribe(result=> {

      this.noticia = result;
    //  this.descricao = this.sanitized.bypassSecurityTrustHtml(this.noticia.descricao);
      console.log(result);
    });

  }

  getSafeUrl() {
    return this.sanitized.bypassSecurityTrustResourceUrl(this.noticia.descricao);     
}

  addNoticia() {    
    
    if(this.id==undefined){
      this.noticiaService.addNoticia(this.noticia);
      this.exibirSucesso('Noticia Salva com Sucesso.');
      this.noticia = this.noticiaService.novo();
    }else{
      
      this.noticiaService.setNoticia(this.noticia, this.id)
      .then((r)=> {

        alert('Alteração realizada com sucesso.');
      });
    }
  }  

  adicionarFoto(event) {   
  
    this.msgErro='';
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      console.clear();
      console.log(file);      
      if(file.size<2000000){
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {

            console.log(reader);
            
            const fotoBase64 = reader.result + '';
            const foto: Foto = {
              nome: fotoBase64,
              referencia: true,
              refFoto: file.name,
              ordem: i
            };

            if(this.noticia==null){
              this.noticia = this.noticiaService.novo();
            }

            this.noticia.foto = foto.nome;            
            
        };

        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }else{
        
        //this.exibirErro(1, 'Foto está acima do limite de 2MB permitida.');
        alert('erro');
        
      }      
    } 
  }

}
