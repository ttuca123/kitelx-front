
import { Subscription } from 'rxjs';
import { LoadingComponent } from './loading/loading.component';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from './vo/usuario';
import { LocalUser } from './vo/local-user';
import { Router } from '@angular/router';
import { TipoFoto } from './vo/tipoFoto';
import { DialogTermosdeUsoComponent } from './dialog/dialog-termos-de-uso/dialog-termos-de-uso.component';

/**
 * @description Classe responsável por oferecer métodos e atributos comuns entre os componentes
 *
 * @author Artur Cavacante
 * @since 23/05/2020 22:39
 * @export
 * @class View
 */
export class View {

    versao = '1.0.3';
    pagina = 1;
    titulo = '';
    lblBtnSalvar = 'Cadastrar';
    lblBtnGravar = 'Gravar';
    lblBtnBuscar = 'Buscar';
    lblBtnLimpar = 'Limpar';
    lblBtnNovo = 'Novo *';
    lblBtnExcluir = 'Excluir';
    lblPageAnt = 'Anterior';
    lblPageProx = 'Próximo';
    public submitted = false;
    error = false;
    cidadeSub: Subscription;
    estadoSub: Subscription;
    modeloSub: Subscription;
    MOEDA = 'BRL';
    DATA_HORA = 'dd/MM/yyyy HH:mm';
    DATA = 'dd/MM/yyyy ';
    isAdmin: boolean;
    msgErro = '';
    statusErro = -1;
    msgSucesso = '';
    hide = true;
    fotoUrl: any;
    loginSocial: boolean;
    edit: boolean;
    loadFotos: boolean;
    erro: boolean;
    subscription$: Subscription;
    viewLoading: boolean = false;

    usuario: Usuario = {
        id: null,
        authToken: '',
        hashSocial: '',
        nome: '',
        primeiroNome: '',
        ultimoNome: '',
        email: '',
        fone: '',
        cpf: '',
        senha: '',
        contraSenha: '',
        fotoUrl: '',
        foto: [],
        perfil : {
          id: null,
          nome: ''
        },
        tipo: null,
        equipamentos: [],
        anuncios: [],
        totalEquipamentos: 0,
        senhaHash: '',
        termosDeUso: false

      };

    constructor(public dialog: MatDialog, public route: Router) {

    }

    

    exibirLoading() {
        this.viewLoading = true;
        this.dialog.open(LoadingComponent, {
            width: '200px',            
            disableClose: true,
            hasBackdrop:true
          });
    }

    exibirLoadingMensagem(message) {
        this.dialog.open(LoadingComponent, {
            width: '200px',
            height: '200px',
            data: {message:message},
            disableClose: true,
            hasBackdrop:true

          });
    }

    fecharLoading() {
        this.viewLoading = false;
        this.dialog.closeAll();
    }

    exibirErro(codigo, msg) {

        this.statusErro = codigo;
        this.msgErro = msg;
        this.submitted = false;
        this.error = true;
    }

    exibirSucesso(msg) {

        this.submitted = true;
        this.error = false;
        this.msgSucesso = msg;
    }


    modificarLabelsEditar() {
        //this.titulo = 'Dados de ' + this.tela;
        //this.lblBtnSalvar = 'Gravar';
      }

    limpar() {
        this.submitted = false;
        this.error = false;        
    }

    checkPermissionAction(permissao): boolean{

        /*if (this.storage.getLocalUser().permissoes.indexOf(permissao) > -1) {
            return true;
        }*/

        return false;
    }

    setDefaultPic() {
        this.usuario.fotoUrl = 'assets/images/users/no_user.png';
    }


    preencherDadosUsuario(localUser: LocalUser){
        if(localUser!=null){
            this.usuario.id = localUser.id;
            this.usuario.fotoUrl = localUser.fotoUrl;
            this.usuario.email = localUser.email;
            this.usuario.primeiroNome = localUser.primeiroNome;
            this.usuario.ultimoNome = localUser.ultimoNome;
            this.usuario.fone = localUser.fone;
            this.usuario.cpf = localUser.cpf;
            this.usuario.totalEquipamentos = localUser.totalEquipamentos;
            this.usuario.tipo = localUser.perfil;
            this.edit = true;
        }

    }

    getBase64(event) {
        let me = this;
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          //me.modelvalue = reader.result;
          console.log(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }

     voltar() {     

        this.route.navigate(["/pagina-inicial"]);    
      }

      getTipoFoto(tipo: TipoFoto): any {

        if (tipo == null) {
            return { key: -1, value: '' };
        }

        switch (tipo) {
            case TipoFoto.ANUNCIO:
                return { key: 0, value: 'Anúncio' };
            case TipoFoto.EQUIPAMENTO:
                return { key: 1, value: 'Equipamento' };
            case TipoFoto.SPOT:
                return { key: 2, value: 'Spot' };

        }
    }
    
    compare(c1: {nome: string}, c2: {nome: string}) {
        return c1 && c2 && c1.nome === c2.nome;
      }
}
