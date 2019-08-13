import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { map, tap } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ActiveListService {

  constructor(private api: ApiService) { }
  activeList: Subject<any> = new BehaviorSubject([]);
  getList() {
    return this.api.get("/cep/activeList/list?offset=0&limit=100").pipe(
      map(v => v.rows),
      tap(list => this.activeList.next(list))
    );
  }
  add(user: any) {
    return this.api.post("/cep/activeList/save", user).pipe(
      tap(res => this.getList().subscribe())
    )
  }

  save(user: any) {
    return this.api.post("/cep/activeList/update", user).pipe(
      tap(res => this.getList().subscribe())
    );
  }

  del(ids: number) {
    return this.api.post("/cep/activeList/remove", { id: ids }).pipe(
      tap(res => this.getList().subscribe())
    )
  }
}
