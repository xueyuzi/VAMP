import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { map,tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SourceService {

  constructor(private api:ApiService) { }
  sourceList = new BehaviorSubject([]);
  getList(condition:any={}){
    return this.api.get("/cep/source/list?offset=0&limit=100").pipe(
      map(v => v.rows),
      tap(list => this.sourceList.next(list))
    );
  }
  add(user:any){
    return this.api.post("/cep/source/save",user).pipe(
      tap(res=>this.getList().subscribe())
    )
  }

  save(user:any){
    return this.api.post("/cep/source/update",user).pipe(
      tap(res=>this.getList().subscribe())
    );
  }

  del(ids:number){
    return this.api.post("/cep/source/remove",{id:ids}).pipe(
      tap(res=>this.getList().subscribe())
    )
  }
}
