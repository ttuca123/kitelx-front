import { Component, OnInit, Inject, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MarcaService } from '../services/marca.service';
import { EquipamentoService } from '../services/equipamento.service';
import { ModeloService } from '../services/modelo.service';
import { Equipamento } from '../vo/equipamento';
import { Modelo } from '../vo/modelo';
import { View } from '../view';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { UsuarioService } from '../services/usuario.service';
import { StorageService } from '../services/storage.service';
import { LoginService } from '../services/login.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'angularx-social-login';
import { MenuEquipamentoComponent } from '../menus/menu-equipamento.component';
import { TipoEquipamento } from '../vo/tipo-equipamento';

@Component({
  selector: 'equipamento-proprietario',
  templateUrl: './equipamento-proprietario.component.html',
  styleUrls: ['./equipamento-proprietario.component.scss']

})
export class EquipamentoProprietarioComponent extends View implements OnInit, OnDestroy {


  titulo = 'Registro de  Equipamento';
  @Output() carregarModelo = new EventEmitter<any>();
  /*tipos: any;
  marcas: any;
  modelos: any; */
  modelos = [];
  myControl = new FormControl();
  equipamento?: Equipamento;  
  value = 0;
  toppings = new FormControl();  
  
  
  equipamentoSubscription = new Subscription;
  idFotoAtual: any = -1;

  constructor(

    public marcaService: MarcaService, public modeloService: ModeloService,
    public loginService: LoginService,
    public equipamentoService: EquipamentoService, public dialog: MatDialog,
    public activatedRoute: ActivatedRoute, public route: Router, public storage: StorageService,
    public usuarioService: UsuarioService, private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar,
    private googleService: AuthService) {
    super(dialog, route);    
    
    }  


  ngOnInit ():void {

    this.equipamento = this.equipamentoService.novo();
    this.checkUsuario('/equipamento-proprietario');
    

  }

  checkUsuario(parametro) {
    this.usuarioService.getPing().subscribe(result => {
      this.prepararInformacoesEquipamento();
    }, err => {
      if (err.status == 403) {
        this.logout();
        this.loginComParametros(parametro);
      }
    });
  }

  prepararInformacoesEquipamento(){
    
    this.equipamento = this.equipamentoService.novo();
    const localUser = this.storage.getLocalUser();
    this.preencherDadosUsuario(localUser);
    this.carregarDadosUsuario(localUser.id);
  }

  carregarDadosUsuario(id) {

    this.exibirLoading();
    this.usuarioService.findById(id).subscribe(result => {

      this.fecharLoading();      
      this.usuario = result;
      console.log(JSON.stringify(this.usuario));

    }, err => {
      this.fecharLoading();
      console.error(err);

      if (err.status == 403) {

        this._snackBar.open('Sessão Expirada, por favor logue novamente', 'Sessão Expirada', { duration: 2000 });

        setTimeout(() => {

          this.route.navigate(["login"]);

        }, 3000);

        this.storage.setLocalUser(null);

      }

    });
  }  

  filtrarAcao($event) {
    const equipamento = $event as Equipamento;    
    this.openBottomSheet(equipamento);
    
  }

  _reload = true;

  openBottomSheet(equipamento): void {

    const menu = this._bottomSheet.open(MenuEquipamentoComponent, {
      data: { equipamento: equipamento },
    });

    menu.afterDismissed().subscribe(result => {

        if (result != undefined) {

          this.equipamento = result.equipamento;

          if (result.acao === 1) { //Anúnciar
            
            const anuncio = this.equipamentoService.transformarAnuncio(this.equipamento);            
           
            this.route.navigate(["/anuncio/anunciar",
              { 'anuncio': JSON.stringify(anuncio), 'idEquipamento' : this.equipamento.id }]);
          }

          if (result.acao === 2) { //Exclusão

            this.excluirItem(this.equipamento);
          }

          if (result.acao === 3) { //Editar

            this.edit = true;  
            this._reload=false; 
            this._reload=true; 
            
          }

          if (result.acao === 4) { //Detalhar

            this.route.navigate(['/equipamento-detail/' + this.equipamento.id]);
          }
        }
      },
    err => {
      console.log(err);
    });
  } 
  
  atualizarEquipamentos(event) {

    const equipamento = event as Equipamento;
    
    this.usuario.equipamentos = this.usuario.equipamentos.map(e => e.id==equipamento.id? e=equipamento:e);
    this._reload=false;
    this._reload=true;
  }  
  

  carregarModelos(marca, tipo) {

    console.log('Marca: ' + JSON.stringify(marca) + ', Tipo de Equipamento '+ JSON.stringify(tipo));
  /* this.modeloService.findModelosByMarcaByTipo(marca.id, tipo)
    .subscribe(modelos => {
          
          this.modelos = modelos;
          
  
        }, err => {
          
          console.log(err);
      }); */
    
  }

  excluirItem(data_item) {
    
   /* console.clear();
    console.log(JSON.stringify(data_item));
    this.usuario.equipamentos = this.usuario.equipamentos.filter(item => item.id !== data_item.id); */

    //this.loginService.gravarTotalEquipamentos(this.usuario.equipamentos.length);
    this.equipamentoService.remover(data_item.id).subscribe((r) => {
      this.usuario.equipamentos = this.usuario.equipamentos.filter(item => item.id !== data_item.id);
      this._snackBar.open('Equipamento Excluído com Sucesso', 'Exclusão', { duration: 2000 });
      this.equipamento = this.equipamentoService.novo();
    }, err=> console.error(err));
    
    
  }


 /* excluirFoto(data_item) {

    /*this.equipamento.fotosList = this.equipamento.fotosList.filter(item => item.id != data_item.id);
    this.equipamento.fotosExcluidas.push(data_item.id); */

  //}

  /*carregarMarcas() {
    this.exibirLoading();
    this.marcaService.findAll().subscribe(marcas => {
      this.fecharLoading();
      this.marcas = marcas;

    }, err => {
      this.fecharLoading();
      console.log(err);
      if (err.status == 403) {

        this._snackBar.open('Sessão Expirada, por favor logue novamente', 'Sessão Expirada', { duration: 2000 });

        setTimeout(() => {

          this.route.navigate(["login"]);

        }, 3000);

        this.storage.setLocalUser(null);

      }
    });

  }

  carregarTiposEquipamento() {

    this.exibirLoading();
    this.equipamentoService.findTipos()
      .subscribe(tipos => {
        this.fecharLoading();
        this.tipos = tipos;

      }, err => {
        this.fecharLoading();
        console.log(err);
        console.log('Erro ao carregar os tipos de equipamento');

      });
  }*/

 /* atualizar(tamanho) {

    this.equipamento.tamanho = tamanho;
  }

  detalharModelo(modelo) {

    this.modeloSelecionado = modelo;

    if (this.modeloSelecionado.id != 999) {

      this.equipamento.outroModelo = '';
    }
  } */


  /*prepararListas() {

    this.tipos.forEach(element => {
      if (element.id === this.equipamento.tipo.id) {
        this.equipamento.tipo.descricao = element.descricao;
      }
    });

    this.marcas.forEach(element => {
      if (element.id === this.equipamento.marca.id) {
        this.equipamento.marca.descricao = element.descricao;
      }
    });

    this.modelos.forEach(element => {
      if (element.id === this.equipamento.modelo.id) {
        this.equipamento.modelo.descricao = element.descricao;
      }
    });

    this.equipamento.ano = +this.equipamento.ano;
    this.equipamento.tamanho = this.equipamento.tamanho;

  } */

  editar() {

    this.exibirLoading();
    console.log(this.equipamento);
    this.equipamentoService.editar(this.equipamento, this.equipamento.id)
      .subscribe(result => {
        this.fecharLoading();
        this.exibirSucesso('Equipamento atualizado com sucesso.');
        this.limpar();
        this.usuario.equipamentos.map(item => {

          item.id === this.equipamento.id ? item = this.equipamento : item = item

        }, err => {

          console.log(err);

        });

      }, err => {

        this.exibirErro(1, 'Erro ao atualizar os dados do Equipamento.');
        console.log(err);
        this.fecharLoading();
      });
  } 

  cancelarEdit() {

    this.limpar();
  }

  

  limpar() {

    this.equipamento = this.equipamentoService.novo();

  } 

  voltar() {

    this.route.navigate(["/pagina-inicial"]);
  }


  ngOnDestroy() {

    this.equipamentoSubscription.unsubscribe();
    this.usuario = null;
  }


  


  logout() {

    this.setDefaultPic();
    this.storage.setLocalUser(null);
    this.usuario.id = null;
    console.clear();

    this.googleService.signOut().then(result => {
    }, err => {
      console.log(err);
    });
  }

  loginComParametros(parametro) {
    if (this.storage.getLocalUser() != undefined || this.storage.getLocalUser() != null) {
      this.route.navigate([parametro]);
    } else {
      const dadosParametros = {
        redirectAfterTo: parametro
      }
      this.route.navigate(['login', dadosParametros]);
    }
  }
}
