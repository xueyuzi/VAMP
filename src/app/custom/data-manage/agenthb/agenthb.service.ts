import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AgenthbService {

  constructor(private api:ApiService) { }
  getList(condition:any={}){
    return this.api.get("/cep/agentHeartbeat/list?offset=0&limit=10").pipe(
      map(v=>v.rows)
    );
  }
  add(user:any){
    return this.api.post("/system/user/add",user)
  }

  save(user:any){
    return this.api.post("/system/user/edit",user);
  }

  del(ids:number){
    return this.api.post("/system/user/remove",{ids:ids})
  }
}
