import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { map,tap } from 'rxjs/operators';
import {ServerDataSource} from "ng2-smart-table";
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor(private api:ApiService, private http: HttpClient) { }
  ruleList = new BehaviorSubject([]);
  getList() {
    return this.api.get("/cep/rule/list?offset=1&limit=100").pipe(
      map(v => v.rows),
      tap(list => this.ruleList.next(list))
    );
  }
  add(user:any){
    return this.api.post("/cep/rule/save",user).pipe(
      tap(res=>this.getList().subscribe())
    )
  }

  save(user:any){
    return this.api.post("/cep/rule/update",user).pipe(
      tap(res=>this.getList().subscribe())
    );
  }

  del(ids:number){
    return this.api.post("/cep/rule/remove",{ids:ids}).pipe(
      tap(res=>this.getList().subscribe())
    )
  }

  getRule(ruleId) {
    return this.api.get("/cep/rule/edit/" + ruleId);
  }
}
