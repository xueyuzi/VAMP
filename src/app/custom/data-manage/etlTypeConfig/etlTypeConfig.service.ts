import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { map,tap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EtlTypeConfigService {

  constructor(private api: ApiService, private http: HttpClient) { }
  etlConfigList:BehaviorSubject<any> = new BehaviorSubject([]);
  getList() {
    return this.api.get("/cep/etlTypeConfig/list?offset=1&limit=100").pipe(
      map(v => v.rows),
      tap(list => this.etlConfigList.next(list))
    );
  }
  getAgent(agentId) {
    return this.api.get("/cep/etlTypeConfig/edit/" + agentId);
  }
  add(user: any) {
    return this.api.post("/cep/etlTypeConfig/save", user).pipe(
      tap(res => this.getList().subscribe())
    );
  }

  save(user: any) {
    return this.api.post("/cep/etlTypeConfig/update", user).pipe(
      tap(res => this.getList().subscribe())
    );;
  }

  del(ids: number) {
    return this.api.post("/cep/etlTypeConfig/remove", { id: ids }).pipe(
      tap(res => this.getList().subscribe())
    );
  }
}
