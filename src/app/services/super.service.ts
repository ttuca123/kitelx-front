import { Observable } from "rxjs";

export interface SuperService {


    findById(object): Observable<any>;

    getLista(object): Observable<any>;

    insert(object):Observable<any>;

    editar(object, id):Observable<any>;

    remover(object, id):Observable<any>;
}