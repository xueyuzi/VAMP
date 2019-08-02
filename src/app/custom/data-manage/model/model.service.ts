import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private api:ApiService) { }
  getList(condition:any={}){
    return this.api.get("/cep/model/list?offset=0&limit=100").pipe(
      map(v=>v.rows)
    );
  }
  add(user:any){
    return this.api.post("/cep/model/save",user)
  }

  save(user:any){
    return this.api.post("/cep/model/update",user);
  }

  del(ids:number){
    return this.api.post("/cep/model/remove",{ids:ids})
  }
}
