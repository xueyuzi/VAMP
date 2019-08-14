import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { map, tap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private api: ApiService, private http: HttpClient) { }
  agentList: BehaviorSubject<any> = new BehaviorSubject([]);
  getList() {
    return this.api.get("/cep/agent/list?offset=1&limit=100").pipe(
      map(v => v.rows),
      tap(list => this.agentList.next(list))
    );
  }
  getAgent(agentId) {
    return this.api.get("/cep/agent/edit/" + agentId);
  }
  add(agent: any) {
    return this.api.post("/cep/agent/save", agent).pipe(
      tap(res=>this.getList().subscribe())
    )
  }

  save(agent: any) {
    return this.api.post("/cep/agent/update", agent).pipe(
      tap(res=>this.getList().subscribe())
    );
  }

  del(ids: number) {
    return this.api.post("/cep/agent/remove", { ids: ids }).pipe(
      tap(res=>this.getList().subscribe())
    )
  }

  getAgentChart(ids: number) {
    return this.api.post("/cep/agent/getChart", { id: ids })
  }
}
