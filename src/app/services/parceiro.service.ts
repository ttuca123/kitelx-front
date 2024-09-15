import { Injectable } from '@angular/core';
import { Parceiro } from '../vo/parceiro';

@Injectable({
  providedIn: 'root'
})
export class ParceiroService {

  constructor() { }


  novo(): Parceiro {
    
    const parceiro: Parceiro ={
      nome:'',
      fone:'',      
      tipo:null
    };
  return parceiro;
  }
}
