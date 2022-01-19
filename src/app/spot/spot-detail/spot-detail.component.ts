import { supportsPassiveEventListeners } from '@angular/cdk/platform';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotService } from '../../services/spot.service';
import { StorageService } from '../../services/storage.service';
import { View } from '../../view';
import { LocalUser } from '../../vo/local-user';
import { Spot } from '../../vo/spot';

@Component({
  selector: 'app-spot-detail',
  templateUrl: './spot-detail.component.html',
  styleUrls: ['./spot-detail.component.scss']
})
export class SpotDetailComponent extends View implements OnInit {

  @Input('spot')  spot: Spot;
  localUser: LocalUser;
  responsiveOptions: any;
  @Input('bloqueio') bloqueio = false;

  constructor(public dialog: MatDialog, public route: Router,
    private routeActivated: ActivatedRoute,
    public spotService: SpotService, public storage: StorageService) { 

      super(dialog, route);
      this.localUser = this.storage.getLocalUser();
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
    }

  ngOnInit(): void {

    this.routeActivated.params.subscribe(parametros => {

      const id = parametros['id'];
      this.carregarSpot(id);
    }, err => {

      console.log(err);
    });

  }


  carregarSpot(id) {

    this.spotService.findById(id).subscribe(result => {

      this.spot = result;      
      
      
    }, err => {
      console.log(err);
    });

  }

  editar() {


    this.route.navigate(["spot/editar/" + this.spot.id]);

  }

  excluir() {

    this.exibirLoading();
    this.spotService.remover(this.spot.id).subscribe(result => {

      this.fecharLoading();
      this.exibirSucesso('Spot Excluido com sucesso');      


      setTimeout(() => {
        this.route.navigate(["spot/filtro"]);

      }, 1500);

    }, err => {
      this.fecharLoading();
      console.log(err);
    })

  }

}
