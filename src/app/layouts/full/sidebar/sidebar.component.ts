import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';
import { View } from '../../../view';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../vo/usuario';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent  implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  public usuario: Usuario;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, public usuarioService: UsuarioService,
    public menuItems: MenuItems,
    private router: Router, public storage: StorageService
  ) {

    

    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(){  

    this.usuario = this.usuarioService.novo();
    
    let localUser = this.storage.getLocalUser();

    
      this.usuario.primeiroNome = localUser!=null?localUser.primeiroNome:'Anônimo';
      this.usuario.ultimoNome = localUser!=null?localUser.ultimoNome:''; 
      this.usuario.fotoUrl = localUser!=null?localUser.fotoUrl:null;  

    
    //this.preencherDadosUsuario(this.usuario); 

    
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
