import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { map, tap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
@Injectable({
  providedIn: 'root'
})
export class ActiveListDetailService {

  constructor(private api: ApiService, private http: HttpClient) { }
  activeList: BehaviorSubject<any> = new BehaviorSubject([]);
  listId: number;
  getList(listId = null) {
    if (listId !== null) {
      this.listId = listId;
    }
    return this.api.get("/cep/activeListDetails/list?offset=1&limit=100&listId=" + this.listId).pipe(
      map(v => v.rows),
      tap(list => this.activeList.next(list))
    );
  }
  getAgent(agentId) {
    return this.api.get("/cep/activeListDetails/edit/" + agentId);
  }
  add(user: any) {
    return this.api.post("/cep/activeListDetails/save", user).pipe(
      tap(res => this.getList().subscribe())
    )
  }

  save(user: any) {
    return this.api.post("/cep/activeListDetails/update", user).pipe(
      tap(res => this.getList().subscribe())
    );
  }

  del(ids: number) {
    return this.api.post("/cep/activeListDetails/remove", { id: ids }).pipe(
      tap(res => this.getList().subscribe())
    )
  }
}
