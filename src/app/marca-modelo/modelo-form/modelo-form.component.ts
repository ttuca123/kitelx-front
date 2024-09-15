import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipamentoService } from '../../services/equipamento.service';
import { MarcaService } from '../../services/marca.service';
import { ModeloService } from '../../services/modelo.service';
import { View } from '../../view';
import { Modelo } from '../../vo/modelo';
@Component({
  selector: 'app-modelo-form',
  templateUrl: './modelo-form.component.html',
  styleUrls: ['./modelo-form.component.scss']
})
export class ModeloFormComponent extends View implements OnInit { 
  
  modelo: Modelo;
  msgSucesso: string;
  msgErro: string;
  tipos = [];
  marcas = [];

  constructor(public modeloService: ModeloService, private routeActivated: ActivatedRoute, public marcaService: MarcaService,
    public dialog: MatDialog, public route: Router, private equipamentoService: EquipamentoService) {

      super(dialog, route);

     }

  ngOnInit(): void {

    this.carregarEquipamentos();
    this.carregarMarcas();

    this.routeActivated.params.subscribe(parametros => {

      const id = parametros['id'];
      this.carregarDados(id);

    }, err => {

      console.error(err);
    });

    this.modelo = this.modeloService.novo();
  }

  carregarEquipamentos() {

    this.equipamentoService.findTipos()
    .subscribe( (result)=> {
      
      this.tipos = result;

    }, err=> {
      
      this.exibirErro(1, 'Erro ao carregar os tipos do equipamento.');

    })
  }

  public carregarMarcas(){
    
    this.marcaService.carregarMarcas()
    .subscribe(marcas => {
      this.marcas = marcas;      
    }, err => console.error(err));

 }


  carregarDados(id) {

    if(id !== undefined) {

      this.modeloService.findById(id).subscribe(result => {
  
        this.modelo = result;        
        
      }, err => {
  
        this.exibirErro(1, 'Rede Indisponível. Não foi possível carregar os dados do modelo.');
        console.log(err);
      });
  } 
}

  limparForm() {
    
    this.limpar();
    this.modelo.categoria = null;
    this.modelo.idMarca = null;
    this.modelo.descricao = null;
  }

  salvar () {
    this.exibirLoadingMensagem('Salvando dados do Modelo.');

    if(this.modelo.id==undefined){     

      this.modeloService.insert(this.modelo)
      .subscribe((r)=> {
        this.fecharLoading();        
        this.exibirSucesso('Modelo ' + r.descricao +' cadastrado com sucesso');
      }, err => {
        this.fecharLoading();        
        console.error(err);
        this.msgErro = 'Ocorreu um erro ao cadastrar o modelo ' + this.modelo.descricao;
        this.exibirErro(err.status, err.error);
      })
      
    }else{
      
      this.modeloService.editar(this.modelo, this.modelo.id)
      .subscribe((r)=> {
        this.fecharLoading();        
        this.exibirSucesso('Modelo ' + r.descricao +' cadastrado com sucesso');
      }, err => {
        this.fecharLoading();        
        console.error(err);
        this.msgErro = 'Ocorreu um erro ao cadastrar o modelo ' + this.modelo.descricao;
        this.exibirErro(err.status, err.error);
      })

    }

  }


}

