import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Usuario } from '../vo/usuario';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EquipamentoService } from '../services/equipamento.service';
import { UsuarioService } from '../services/usuario.service';
import { View } from '../view';
import { isCPF, formatToPhone, formatToCPF } from 'brazilian-values';
import { LoginService } from '../services/login.service';
import { StorageService } from '../services/storage.service';
import { DialogTermosdeUsoComponent } from '../dialog/dialog-termos-de-uso/dialog-termos-de-uso.component';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent extends View implements OnInit {

  perfis : any;
  toppings = new FormControl();
  tipos: any;
  perfil: any;

  public cpfValido = true;

  constructor(private activatedRoute: ActivatedRoute, public route: Router, public dialog: MatDialog,
    private cdRef: ChangeDetectorRef, public equipamentoService: EquipamentoService,
    public usuarioService: UsuarioService, public loginService: LoginService, public storage: StorageService) {

    super(dialog, route);


   }


  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe( result =>{

        console.clear();
        this.usuario.email = result.email;
        this.usuario.cpf = result.cpf;
        this.usuario.primeiroNome = result.primeiroNome;
        this.usuario.ultimoNome = result.ultimoNome;
        this.usuario.fotoUrl = result.foto;

    });
   
    this.carregarPerfis();   

  }

  aceiteTermosUso() {    
   
      const dialogRef = this.dialog.open(DialogTermosdeUsoComponent, {
        disableClose: false,
        hasBackdrop:true,
        data: {
          usuario: this.usuario
        }

      });

      dialogRef.afterClosed().subscribe(result =>{
        console.log('The dialog was closed')
      })
  }


  prepararTela() {

    this.titulo = this.edit?'Editar Usuário':'Registrar Usuário';
    this.usuario.fone = formatToPhone(this.usuario.fone);
    this.usuario.cpf = formatToCPF(this.usuario.cpf);

  }

  carregarPerfis() {

    this.usuarioService.findPerfis().subscribe(perfis => {

      this.perfis = perfis;

    }, err => {

        console.log(err);
    });
  }


  irParaAnuncios() {

    this.route.navigate(["/pagina-inicial"]);
  }

  onSubmit() {

    this.prepararUsuario();
    this.exibirLoading();

    if(!this.edit){
      this.save();

    }else{
      this.editar();

    }
  }


  editar() {

    this.usuarioService.editar(this.usuario, this.usuario.id).subscribe( result => {

      this.fecharLoading();
      this.exibirSucesso('Dados do Usuário foram atualizados.');
      this.usuario.fone = formatToPhone(this.usuario.fone);
      this.usuario.cpf = formatToCPF(this.usuario.cpf);
    }, err => {
      this.fecharLoading();
      console.log(err);
      this.exibirErro(err.error.codigo, err.error.message);
    });

  }

  save() {

      this.usuarioService.insert(this.usuario).subscribe(result => {

      //this.usuario = result;
      this.fecharLoading();
      this.exibirSucesso('Usuário cadastrado com sucesso.');
      this.loginService.gravarCredenciaisFull(result);

      setTimeout(()=> {

        this.irParaAnuncios();

      }, 1000);

    }, err => {
      this.fecharLoading();
      console.log(err);
      this.exibirErro(err.error.codigo, err.error.message);


    //  alert('Ocorreu um erro ao cadastrar o usuário!!!');
    });
  }


  prepararUsuario(){

    this.usuario.cpf = this.usuario.cpf.replace('.', '').replace('-', ''). replace(' ', '');
    this.usuario.fone = this.usuario.fone.replace('.', '').replace('-', '').replace('(', '').replace(')', '').replace(' ', '');
  }


  meusEquipamentos() {

    this.route.navigate(["/equipamento-proprietario"]);

   }

   meusAnuncios() {

    alert('Funcionalidade não disponível');
   }




  validarCpf(cpf: string) {

    this.usuario.cpf = cpf.replace(",", "").replace("-", "");
    this.cpfValido = isCPF(cpf);
    this.usuario.cpf = formatToCPF(cpf);

  }

  formatarFone(fone: string): any{

    this.usuario.fone = formatToPhone(fone);


  }


  ngOnDestroy(): void {

    this.limpar();
    this.usuario = null;

  }

  ngAfterViewChecked(): void {
    console.log('! Mudanças de estado do componente !');
    this.cdRef.detectChanges();
  }




}
