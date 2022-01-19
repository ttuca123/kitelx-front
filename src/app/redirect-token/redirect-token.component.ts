import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { delay, map, mergeAll, switchMap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { View } from '../view';

@Component({
  selector: 'app-redirect-token',
  templateUrl: './redirect-token.component.html',
  styleUrls: ['./redirect-token.component.scss']
})
export class RedirectTokenComponent extends View implements OnInit {

  constructor(public dialog: MatDialog, public routeActivated: ActivatedRoute,
    public route: Router, private loginService: LoginService) {

    super(dialog, route);
   }

  ngOnInit(): void {

    this.exibirLoadingMensagem('Validando token usuário');

    let params = this.routeActivated.params;

    let fetch$ = params.pipe(map((p) => this.loginService.verificarToken(p['token'])));

    fetch$.pipe(mergeAll()).subscribe((result)=> {

      this.fecharLoading();
      this.loginService.gravarCredenciaisFull(result);
      this.route.navigate(['nova-senha']);

    }, err => {
      console.error(err);
      this.exibirErro(0, err.message);
      this.fecharLoading();
    });    
  } 

}
