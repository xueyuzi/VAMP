import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { map,tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SinkService {

  constructor(private api:ApiService) { }
  sinkList = new BehaviorSubject([])
  getList(condition:any={}){
    return this.api.get("/cep/sink/list?offset=0&limit=100").pipe(
      map(v => v.rows),
      tap(list => this.sinkList.next(list))
    );
  }
  add(user:any){
    return this.api.post("/cep/sink/save",user).pipe(
      tap(res=>this.getList().subscribe())
    )
  }

  save(user:any){
    return this.api.post("/cep/sink/update",user).pipe(
      tap(res=>this.getList().subscribe())
    );
  }

  del(ids:number){
    return this.api.post("/cep/sink/remove",{ids:ids}).pipe(
      tap(res=>this.getList().subscribe())
    )
  }
}
