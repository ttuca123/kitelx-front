import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from '../../services/marca.service';
import { View } from '../../view';
import { Marca } from '../../vo/marca';

@Component({
  selector: 'app-marca-form',
  templateUrl: './marca-form.component.html',
  styleUrls: ['./marca-form.component.scss']
})
export class MarcaFormComponent extends View implements OnInit { 
  
  marca: Marca;
  msgSucesso: string;
  msgErro: string;

  constructor(public marcaService: MarcaService, private routeActivated: ActivatedRoute,
    public dialog: MatDialog, public route: Router) {

      super(dialog, route);

     }

  ngOnInit(): void {

    this.routeActivated.params.subscribe(parametros => {

      const id = parametros['id'];
      this.carregarDados(id);

    }, err => {

      console.error(err);
    });

    this.marca = this.marcaService.novo();
  }


  carregarDados(id) {

    if(id !== undefined) {

      this.marcaService.findById(id).subscribe(result => {
  
        this.marca = result;        
        
      }, err => {
  
        this.exibirErro(1, 'Rede Indisponível. Não foi possível carregar os dados da marca.');
        console.log(err);
      });
  } 
}

  limparForm() {
    this.marca = {
      id: undefined,
      descricao: ''
    };
    this.limpar();
  }

  salvar () {
    this.exibirLoadingMensagem('Salvando dados da Marca.');

    if(this.marca.id==undefined){     

      this.marcaService.insert(this.marca)
      .subscribe((r)=> {
        this.fecharLoading();        
        this.exibirSucesso('Marca ' + r.descricao +' cadastrada com sucesso');
      }, err => {
        this.fecharLoading();        
        console.error(err);
        this.msgErro = 'Ocorreu um erro ao cadastrar a marca ' + this.marca.descricao;
        this.exibirErro(err.status, err.error);
      })
      
    }else{
      
      this.marcaService.editar(this.marca, this.marca.id)
      .subscribe((r)=> {
        this.fecharLoading();        
        this.exibirSucesso('Marca ' + r.descricao +' cadastrada com sucesso');
      }, err => {
        this.fecharLoading();        
        console.error(err);
        this.msgErro = 'Ocorreu um erro ao cadastrar a marca ' + this.marca.descricao;
        this.exibirErro(err.status, err.error);
      })

    }

  }


}
