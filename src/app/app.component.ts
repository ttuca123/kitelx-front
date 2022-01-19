import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SEOService } from './services/seo.service';
import { SEOData } from './vo/seo';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private metaService: Meta, 
    private primengConfig: PrimeNGConfig,
    public _seoService: SEOService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit() {
    
    this.primengConfig.ripple = true;

    // this.metaService.addTags([
    //   {
    //     name: 'keywords',
    //     // tslint:disable-next-line: max-line-length
    //     content: 'Kite, kitesurf, kitesurfing, praia, esporte, picos de kite, spots, spots kitesurf, kiteboarding, kiteboard, prancha, board, trapézio, duotone, Cabrinha, f-one , core, compra e venda, equipamento kitesurf, vento, previsão vento, classificados'}
    // ]);
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
     )
     .subscribe((event: SEOData) => {
       this._seoService.updateMetaTags(event);
     });
  }

 
}
