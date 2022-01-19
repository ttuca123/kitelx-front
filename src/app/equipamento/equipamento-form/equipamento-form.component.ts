import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { from, Observable, Subscription } from 'rxjs';
import { delay, map, take, tap } from 'rxjs/operators';
import { EquipamentoService } from '../../services/equipamento.service';
import { FotoService } from '../../services/foto.service';
import { LoginService } from '../../services/login.service';
import { MarcaService } from '../../services/marca.service';
import { ModeloService } from '../../services/modelo.service';
import { View } from '../../view';
import { Anuncio } from '../../vo/anuncio';
import { Equipamento } from '../../vo/equipamento';
import { Foto } from '../../vo/foto';
import { Marca } from '../../vo/marca';
import { TipoEquipamento } from '../../vo/tipo-equipamento';
import { Usuario } from '../../vo/usuario';

@Component({
  selector: 'app-equipamento-form',
  templateUrl: './equipamento-form.component.html',
  styleUrls: ['./equipamento-form.component.scss']
})
export class EquipamentoFormComponent extends View implements OnInit, OnDestroy {

  @Input() equipamento: Equipamento;
  @Input() usuario: Usuario; 
  @Input() titulo= 'Registro Equipamento';
  @Input() isAnuncio = false;
  @Input() anuncio: Anuncio;
  @Input() modelos = [];
  @Output() atualizarEquipamentos = new EventEmitter<any>();
  tipoEquipamentos$: Observable<TipoEquipamento>;
  marcas$: Observable<Marca>;
  toggleAberto = false;
  
  fotosNovas= [];
  fotosExcluidas= [];
  fotos$: Observable<any>;
  toppings = new FormControl();

  constructor( public equipamentoService: EquipamentoService, 
    private _snackBar: MatSnackBar, public fotoService: FotoService,
    public marcaService: MarcaService, public modeloService: ModeloService,
    public dialog: MatDialog, public route: Router, private loginService: LoginService) { 

      super(dialog, route);
    }

  ngOnInit(): void {
    
    this.subscription$ = new Subscription();
    //this.equipamentoService.carregarTiposEquipamento();
    this.marcaService.carregarMarcas();
    this.tipoEquipamentos$ = this.equipamentoService.findTipos();
    this.marcas$ = this.marcaService.findMarcas();
  }

  addEquipamento() {            
    

      this.equipamento.idUsuario = this.usuario.id;
      
        if(this.equipamento.id==null) { //Novo Equipamento
        
          this.exibirLoading();
          this.subscription$.add(this.equipamentoService.insert(this.equipamento)
          .subscribe(result => {
            this.fecharLoading();  
            this.usuario.equipamentos.push(result);
            this.verificarFotos(result.id);
            this._snackBar.open('Equipamento Registrado com Sucesso', 'Registrado', { duration: 2000 });
            
          }, err => {
            console.error(err);
            this.fecharLoading();
            this.exibirErro(1, 'Erro ao cadastrar novo equipamento!');
          }));
        }else{
          this.editar();
        }
  }

  editar() {    
    
    this.exibirLoading();      
    this.subscription$.add(this.equipamentoService.editar(this.equipamento, this.equipamento.id)
      .subscribe(result => {
        this.fecharLoading();        
        this.verificarFotos(result.id);
        this.atualizarEquipamentos.emit(this.equipamento);
        this._snackBar.open('Equipamento Atualizado', 'Registrado', { duration: 2000 });
        if(this.fotosNovas.length==0){
          window.location.reload();
        }

        
      }, err => {
        this.loadFotos = false;
        this.exibirErro(1, 'Erro ao atualizar os dados do Equipamento.');
        console.log(err);
        this.fecharLoading();
      })); 
  } 

  limparForm() {
    
    window.location.reload();
  }

  selecionarTipoEquipamento(tipo){

    this.equipamento.tipo = tipo;

  }

  selecionarModelo(modelo){

    this.equipamento.modelo = modelo;
  }

  carregarModelos(marca, tipo) {

    this.equipamento.marca = marca;
    
   // console.log('Marca: ' + JSON.stringify(marca) + ', Tipo de Equipamento '+ JSON.stringify(tipo));
   this.modeloService.findModelosByMarcaByTipo(marca.id, tipo)
    .subscribe(modelos => {
          
          this.modelos = modelos;
  
        }, err => {
          
          console.log(err);
      });
    
  }


  /**
   * Método responsável por adicionar numa lista de fotosExcluidas todas as fotos removidas da view.
   *
   * 
   * @author Artur Cavalcante
   * @param event 
   */
  removerFotos(event) {

    const foto = event as Foto;

    this.removerFotosServidor(foto);
  }  

  removerFotosServidor(foto) {    
    
    if(foto.id!==undefined){
      this.exibirLoading();
      this.fotoService.removerFoto(foto.id).subscribe((result)=> {

        this.fecharLoading();
        this.equipamento.fotos = this.equipamento.fotos.filter(f => f.id != foto.id);
        this._snackBar.open('Foto Removida', 'Foto do Equipamento', { duration: 2000 });
        this.atualizarEquipamentos.emit(this.equipamento);

      }, err=> {
        this.fecharLoading();
        console.error(err);
      });
    }else{
      this.equipamento.fotos = this.equipamento.fotos.filter(f => f.nome != foto.nome);
      this.atualizarEquipamentos.emit(this.equipamento);
    }   
  }

  sincronizarFotosS3(){

    this.exibirLoading();
    this.fotoService.sincronizarS3().subscribe((r) => {
      
      this.fecharLoading();
      this._snackBar.open('Sincronização realizada com sucesso', 'Sincronização', { duration: 2000 });
      setTimeout(()=>window.location.reload(), 2000);       
    }, err => {
      this.fecharLoading();
      console.error(err);
      
    });

  }

  validarFotos(): boolean{

    return true;
  }

  enviarFotos(idEquipamento) {
   
    this.fotoService.totalIncrementar = 100/this.equipamento.fotos.length;
    console.log('Fotos Válidas ' + this.equipamento.fotos.length);
    this.loadFotos = this.fotosNovas.length > 0;

    this.fotos$ = from(this.fotosNovas).pipe(tap((f) => f.equipamentoId = idEquipamento), 
     map((foto) => this.fotoService.insertFotoEquipamento(foto)));

     this.subscription$.add(this.fotos$.subscribe((fotoSubscribe: Observable<any>) => {

      fotoSubscribe.subscribe((f) => {

        this.fotoService.porcentTotalFotosEnviadas+=this.fotoService.totalIncrementar;
        this.fotoService.totalFotosEnviadas++;
        if(this.fotoService.totalFotosEnviadas<this.fotosNovas.length) {

          this.fotoService.statusFoto = 'Enviando fotos para Servidor!';
          

        }else{

          this.fotoService.statusFoto = 'Todas as fotos foram enviadas com sucesso!';          
          this.loadFotos=!this.loadFotos;
          this.sincronizarFotosS3();
          
        }

      }, err=> {
        console.log(err);
        this.erro = true;
        this.fotoService.statusFoto = 'Ops, ocorreu um erro ao enviar as fotos!';
      });

    }));

  }


  verificarFotos(idEquipamento){
  
    this.fotosNovas = this.equipamento.fotos.filter(item => item.id==null);
    
    
      if(this.validarFotos() ){
        console.log('Fotos Enviadas');
        this.enviarFotos(idEquipamento);         
      }else{
        console.log('Fotos Inválidas ' + this.equipamento.fotos.length);
        this.exibirErro(1, 'Limite de  5 fotos excedido!');
        throw new Error('Erro de validação com as fotos');
      }    
  }  

  ngOnDestroy(): void {
    
    this.subscription$.unsubscribe();
    this.subscription$ = new Subscription();

  }

}
