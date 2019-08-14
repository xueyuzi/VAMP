import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { map,tap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AgenthbService {

  constructor(private api:ApiService, private http: HttpClient) { }
  agenthbList:BehaviorSubject<any> = new BehaviorSubject([]);
  getList() {
    return this.api.get("/cep/agentHeartbeat/list?offset=1&limit=100").pipe(
      map(v => v.rows),
      tap(list => this.agenthbList.next(list))
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
