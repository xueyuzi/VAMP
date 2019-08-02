import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { map } from 'rxjs/operators';
import {ServerDataSource} from "ng2-smart-table";
@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor(private api:ApiService, private http: HttpClient) { }
  getList() {
    return new ServerDataSource(this.http, { totalKey: "total", pagerPageKey: "offset", pagerLimitKey: "limit", dataKey: "rows", endPoint: "/cep/rule/list" })
  }
  add(user:any){
    return this.api.post("/cep/rule/save",user)
  }

  save(user:any){
    return this.api.post("/cep/rule/update",user);
  }

  del(ids:number){
    return this.api.post("/cep/rule/remove",{ids:ids})
  }
}
