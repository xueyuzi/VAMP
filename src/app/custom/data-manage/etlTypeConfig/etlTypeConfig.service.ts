import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { map } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
@Injectable({
  providedIn: 'root'
})
export class EtlTypeConfigService {

  constructor(private api: ApiService, private http: HttpClient) { }
  getList() {
    return new ServerDataSource(this.http, { totalKey: "total", pagerPageKey: "offset", pagerLimitKey: "limit", dataKey: "rows", endPoint: "/cep/etlTypeConfig/list" })
  }
  getAgent(agentId) {
    return this.api.get("/cep/etlTypeConfig/edit/" + agentId);
  }
  add(user: any) {
    return this.api.post("/cep/etlTypeConfig/save", user)
  }

  save(user: any) {
    return this.api.post("/cep/etlTypeConfig/update", user);
  }

  del(ids: number) {
    return this.api.post("/cep/etlTypeConfig/remove", { id: ids })
  }
}
