import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Anuncio } from '../../vo/anuncio';
import { AnuncioService } from '../../services/anuncio.service';
import { formatToPhone } from 'brazilian-values';
import { View } from '../../view';
import { MatDialog, MatSnackBar } from '@angular/material';
import { StorageService } from '../../services/storage.service';
import { LocalUser } from '../../vo/local-user';
import { DialogExcluirComponent } from '../../dialog/dialog-excluir/dialog-excluir.component';
import { map, mergeAll } from 'rxjs/operators';
import { SEOService } from '../../services/seo.service';
import { SEOData } from '../../vo/seo';
import { Config } from '../../config/app.config';
import { animateChild } from '@angular/animations';
import { fadeInAnimation, slideInOutAnimation } from '../../vo/animations';
import { Meta } from '@angular/platform-browser';


@Component({
  selector: 'anuncio-detail',
  templateUrl: './anuncio-detail.component.html',
  styleUrls: ['./anuncio-detail.component.scss'],
  animations: [fadeInAnimation],

    // attach the slide in/out animation to the host (root) element of this component
    
})
export class AnuncioDetailComponent extends View implements OnInit {

  @Input()
  anuncio: Anuncio;
  localUser: LocalUser;
  pagina: number;
  responsiveOptions: any;
  edicao: any;
  linkZap: any;
  seoData: SEOData;
  private URL = Config.DOMINIO;
  compartilhamento: string;
  compartilhamentoZap: string;
  

  constructor(
    public dialog: MatDialog,
    private routeActivated: ActivatedRoute,
    public route: Router,
    public anuncioService: AnuncioService,
    public storage: StorageService,
    private _snackBar: MatSnackBar,
    public _seoService: SEOService,
    private meta:Meta
    ) {


    super(dialog, route);
    this.anuncio = this.anuncioService.novo();
   

  }

  ngOnInit(): void {
    console.log(this.route);
    animateChild();
    this.localUser = this.storage.getLocalUser();
    this.compartilhamento = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent('https://kitelx.com.br/#'+this.route.url);
    this.compartilhamentoZap = 'https://api.whatsapp.com/send?image='+encodeURIComponent('https://anuncios-kitelx.s3.us-west-1.amazonaws.com/103_1614444159816.jpg') + '&text=Veja este anúncio: '  + encodeURIComponent('https://kitelx.com.br/#'+this.route.url);
    this.routeActivated.params.subscribe(parametros => {

      const id = parametros['id'];
      this.carregarAnuncio(id);

    }, err => {

      console.error(err);
    });

    console.log(`$localUser.id`);

    

  }

  compartilharAnuncio() {

    window.open(
      'https://api.whatsapp.com/send?text=Veja este anúncio: https://kitelx.com.br/#/'+this.route.url,
      '_system', 'location=yes'); return false;

  }

  carregarAnuncio(id) {
    
    this.anuncioService.findById(id)
      .subscribe(result => {
        
        this.anuncio = result;
        //this.setSEO(this.anuncio);
        this.meta.addTags([
          { name: 'description', 
              // tslint:disable-next-line: max-line-length
            content: 'Isso é um teste'},
          {
            name: 'og:image',            
            content: 'https://img.olx.com.br/images/22/227130301181141.jpg'},
        ]);        

        if (this.localUser != null) {
          this.linkZap = 'https://wa.me/55' + this.anuncio.zapAnunciante + '?text=Olá, vi seu anúncio de ' + this.anuncio.tipo.descricao + ' na KiteLX e estou interessado(a).'          
          
          this.anuncio.zapAnunciante = this.anuncio.zapAnunciante;
          this.formatarFone(this.anuncio.zapAnunciante);

        } else {
          this.linkZap = '/#/login';
          this.anuncio.zapAnunciante = this.anuncio.zapAnunciante.substring(0, 8) + '-****';

        }
        this.edicao = (this.localUser != null && (this.localUser?.perfil == 1 || this.anuncio.idUsuario == this.localUser.id));
        

      }, err => {
        console.log(err);
      });

  }

  formatarFone(fone: string): any {

    this.anuncio.zapAnunciante = formatToPhone(fone);

  }


  editar() {


    this.route.navigate(["anuncio/anunciar/" + this.anuncio.id]);

  }

  excluir() {

    this.exibirLoading();
    const dialogRef = this.dialog.open(DialogExcluirComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });   

  }

  getFormattedPrice(price) {

    price = price.split(',').join('.');
    this.anuncio.valor = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

  }

  voltar() {

    this.route.navigate([this.pagina == null ? 'pagina-inicial' : 'anuncio/filtro']);

  }

  excluirAnuncio() {
    const dialogRef = this.dialog.open(DialogExcluirComponent, {
      width: '550px'
      , data: { anuncio: this.anuncio },
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.confirmaExclusao != undefined && result.confirmaExclusao) {

        this.exibirLoadingMensagem('Excluindo Anúncio '+result.anuncio.id);
        let edit$ = this.anuncioService.editar(result.anuncio, result.anuncio.id);
        let fetch$ = edit$.pipe(map((anuncio) => this.anuncioService.remover(anuncio.id)));

        fetch$.pipe(mergeAll())
          .subscribe(() => {
            this.fecharLoading();
            this._snackBar.open('Anúncio Excluído com Sucesso.', 'Excluído', { duration: 1500 });  
            setTimeout(()=>{ 
              
              this.route.navigate(['/anuncio/meus-anuncios']);

            }, 1000);       
            
          }, err=> {

            this._snackBar.open('Ocorreu um erro ao excluír um anúncio.', 'Erro', { duration: 1500 });            
          });
      }
    });
  }

  setSEO(anuncio) {
    const {id, tipo, marca, modelo, observacao, estado, fotos } = anuncio;

    this.seoData = {
      title: `Detalhes anúncio ${tipo.descricao} marca ${marca.descricao} modelo ${modelo.descricao}`,
      description: `Anúncio equipamento kitefusrf, ${tipo.descricao} marca ${marca.descricao} modelo ${modelo.descricao}, ${observacao}, localização ${estado.nome}, ${estado.sigla}`,
      url: `${this.URL}/#/anuncio/detalhe/${id}`,
      image: fotos[0].nome,
      locale: "pt-BR"
    };

    this._seoService.updateMetaTags(this.seoData);
  }
}
