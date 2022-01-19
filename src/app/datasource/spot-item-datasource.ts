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

import { PageForm } from './page-form';
import { LoadingComponent } from '../loading/loading.component';
import { Spot } from '../vo/spot';
import { SpotService } from '../services/spot.service';


/**
 *
 * @description DataSource para implementar a lista de ítens de compra
 * @export
 * @class CompraDataSource
 * @extends {DataSource<Anuncio>}
 */
export class SpotItemDataSource implements DataSource<Spot> {
  data: Spot[] = [];
  pager = new PageForm();

  public itensSubject = new BehaviorSubject<Spot[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private servico: SpotService,    
    public loading: MatDialog
  ) {}

  connect(): Observable<Spot[]> {
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
    this.servico
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
