import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../config/storage_keys.config';
import { LocalUser } from '../vo/local-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {

  }

  getLocalUser(): LocalUser {

      const usr = localStorage.getItem(STORAGE_KEYS.localUser);

      return usr != null ? JSON.parse(usr) : null;
  }

  setLocalUser(obj: LocalUser) {
      
      if (obj != null) {

        localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
      } else {
        localStorage.removeItem(STORAGE_KEYS.localUser);
          
      }
  }


  verificarUsuarioLogado(): boolean {

    return this.getLocalUser() != null;
  }


  verificarAdmin():boolean {

    return this.getLocalUser().perfil==1;
  }
}
