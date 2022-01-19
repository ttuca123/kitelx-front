import { TestBed } from '@angular/core/testing';


import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';

describe('PermGuardService', () => {
  beforeEach(async() => TestBed.configureTestingModule({
    declarations: [],
    imports: [HttpClientModule],
    providers: [HttpClient, StorageService]
  }));

});
