import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatStepper } from '@angular/material';
import { SpotService } from '../../services/spot.service';
import { View } from '../../view';
import { Spot } from '../../vo/spot';
import { UsuarioService } from '../../services/usuario.service';
import { from, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FotoService } from '../../services/foto.service';
import { Foto } from '../../vo/foto';

@Component({
  selector: 'app-spot-form',
  templateUrl: './spot-form.component.html',
  styleUrls: ['./spot-form.component.scss']
})
export class SpotFormComponent extends View implements OnInit {  
  
  
  spot: Spot;  
  meses= [];  
  idiomas:any= [];  
  moedas:any= [];  
  estilosVelejo:any= [];
  ventos:any= [];  
  step = 0; 
  fotosNovas = [];
  fotos$: Observable<any>; 
  lastPage: any;
  bloqueio = true;

  constructor(private spotService: SpotService,
    private usuarioService: UsuarioService,
    private fotoService: FotoService,  private routeActivated: ActivatedRoute,
    dialog: MatDialog, route: Router,private  _snackBar: MatSnackBar) {

    super(dialog, route);

   }

  ngOnInit(): void {

    this.spot = this.spotService.novo();        
    this.titulo = 'Cadastro de Spot';
    this.usuarioService.getPing()
    .subscribe(()=> {        
      this.getComplementos();    
      this.iniciarInformacoesSpot();
    }, err => {
      console.error(err);
      this.loginComParametros('spot/novo');

    });
    
  }  

  iniciarInformacoesSpot() {
      
      
    this.routeActivated.params.subscribe(params => {
      const id = params['id'];               
      this.lastPage = params['page'];

      this.carregarDadosSpot(id);      

    }); 

  }

  carregarDadosSpot(id) {

    if(id !== undefined) {

      this.spotService.findById(+id).subscribe(result => {
  
        this.spot = result;          
        
      }, err => {
  
        this.exibirErro(1, 'Rede Indisponível. Não foi possível carregar os dados do spot.');
        console.log(err);
      });
  } 
}

  loginComParametros(parametro) {
     
    const dadosParametros = {
      redirectAfterTo: parametro
    }
    this.route.navigate(['login', dadosParametros]);
 }
  
 
 /**
  * Método responsável por buscar os complementos das informações dos spots 
  * 
  * @author Artur Cavalcante
  * @since 29/12/2020 10:22
  * 
  * */
 getComplementos(){

  this.spotService.getComplementos()
  .subscribe(compl=> {

    this.meses = compl.meses;
    this.ventos = compl.ventos;
    this.idiomas = compl.idiomas;
    this.moedas = compl.moedas; 
    this.estilosVelejo = compl.estilosVelejo;  
    console.log(JSON.stringify(this.estilosVelejo));
    
  });
 }   

  inserir() {
    console.clear();
    console.log(JSON.stringify(this.spot));
    this.subscription$ = new Subscription();
    this.fotosNovas = this.spot?.fotos.filter(item => item.id==null);   
    this.spot.fotos=[];
    
    if(this.spot.id==null || this.spot.id==undefined) { //Novo Spot
    
      this.exibirLoading();
      this.subscription$.add(this.spotService.insert(this.spot)
      .subscribe(result => {
        this.fecharLoading();  
        this._snackBar.open('Spot Registrado com Sucesso', 'Registrado', { duration: 500 });
        
        this.iniciarEnvioFotos(result.id);
        
        
      }, err => {
        console.error(err);
        this.fecharLoading();
        this.exibirErro(1, 'Erro ao cadastrar spot!');
      }));
    }else {
      
      this.editar(); //Editar

    } 
  }

  iniciarEnvioFotos(id){
    if(this.fotosNovas.length>0){
      this.enviarFotos(id);
    }else{
     
      this.finalizarSpot();
    }  

  }

  finalizarSpot(){

    this.route.navigate(['/spot/filtro']);
  }


  enviarFotos(id) {
   
    this.fotoService.totalIncrementar = 100/this.spot.fotos.length;
    console.log('Fotos Válidas ' + this.spot.fotos.length);
    this.loadFotos = this.fotosNovas.length > 0;
    this.exibirLoading();
    this.fotos$ = from(this.fotosNovas).pipe(tap((f) => f.anuncioId = id), 
     map((foto) => this.fotoService.insertFotoSpot(foto)));

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
          this.fecharLoading();
        }

      }, err=> {
        console.log(err);
        this.erro = true;
        this.fotoService.statusFoto = 'Ops, ocorreu um erro ao enviar as fotos!';
        this.fecharLoading();
      });

    }));

  }

  sincronizarFotosS3() {

    this.exibirLoading();
    this.fotoService.sincronizarS3().subscribe((r) => {
      
      this.fecharLoading();
      this._snackBar.open('Sincronização realizada com sucesso', 'Sincronização', { duration: 2000 });
      this.finalizarSpot();
    }, err => {
      this.fecharLoading();
      console.error(err);
      
    });

  }



  editar() {    
    
    this.exibirLoading();      
    this.subscription$.add(this.spotService.editar(this.spot, this.spot.id)
      .subscribe(result => {
        this.fecharLoading();  
        this._snackBar.open('Dados do Spot Atualizado com Sucesso', 'Registrado', { duration: 1200 });
        
        this.iniciarEnvioFotos(result.id);
        
      }, err => {
        this.loadFotos = false;
        this.exibirErro(1, 'Erro ao atualizar os dados do Spot.');
        console.log(err);
        this.fecharLoading();
      }));
      
  }  



  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  removerFotos(event) {
    
    const foto = event as Foto;

    this.removerFotosServidor(foto);
  } 

  removerFotosServidor(foto) {    
    
    if(foto.id!==undefined){
      this.exibirLoading();
      this.fotoService.removerFoto(foto.id).subscribe((result)=> {

        this.fecharLoading();
        this.spot.fotos = this.spot.fotos.filter(f => f.id != foto.id);
        this._snackBar.open('Foto Removida', 'Foto do Spot', { duration: 2000 });

      }, err=> {
        this.fecharLoading();
        console.error(err);
      });
    }else{
      
      this.spot.fotos = this.spot.fotos.filter(f => f !== foto);
    
    }   
  }

  limparForm() {
    this.spot = this.spotService.novo();
  }
}
