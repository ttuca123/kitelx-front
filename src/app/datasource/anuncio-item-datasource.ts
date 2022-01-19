import { DataSource } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material';
import { map, catchError, finalize } from 'rxjs/operators';
import {
  Observable,
  of as observableOf,
  merge,
  BehaviorSubject,
  of
} from 'rxjs';

import { Anuncio } from '../vo/anuncio';
import { AnuncioService } from '../services/anuncio.service';
import { PageForm } from './page-form';
import { LoadingComponent } from '../loading/loading.component';

/**
 *
 * @description DataSource para implementar a lista de ítens de compra
 * @export
 * @class CompraDataSource
 * @extends {DataSource<Anuncio>}
 */
export class AnuncioItemDataSource implements DataSource<Anuncio> {
  data: Anuncio[] = [];
  pager = new PageForm();

  public itensSubject = new BehaviorSubject<Anuncio[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private anuncioSrv: AnuncioService,    
    public loading: MatDialog
  ) {}

  connect(): Observable<Anuncio[]> {
    return this.itensSubject.asObservable();
  }

  disconnect(): void {
    this.itensSubject.complete();
    this.loadingSubject.complete();
  }

  load(pageIndex = 0, anuncio): any {

    if (this.pager.size === undefined) {
      this.pager = new PageForm();
    }

    this.exibirLoading();
    this.loadingSubject.next(true);
    this.anuncioSrv
      .filter(pageIndex, this.pager.size, anuncio)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(page => {
        this.pager = page;
        this.data = page.content;
        this.itensSubject.next(page.content);
        this.fecharLoading();
      });
  }  

  refreshConteudo() {
    this.itensSubject.next(this.data);
  }

  exibirLoading() {
    this.loading.open(LoadingComponent, {
      width: '150px'
    });
  }

  fecharLoading() {
    this.loading.closeAll();
  }
}
