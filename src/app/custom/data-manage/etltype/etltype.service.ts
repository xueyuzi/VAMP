import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EtltypeService {

  constructor(private api:ApiService) { }
  getList(condition:any={}){
    return this.api.get("/cep/etlType/list?offset=0&limit=100").pipe(
      map(v=>v.rows)
    );
  }
  add(user:any){
    return this.api.post("/cep/etlType/save",user)
  }

  save(user:any){
    return this.api.post("/cep/etlType/update",user);
  }

  del(ids:number){
    return this.api.post("/cep/etlType/remove",{id:ids})
  }
}