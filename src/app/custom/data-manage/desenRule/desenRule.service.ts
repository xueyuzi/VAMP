import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DesenRuleService {

  constructor(private api: ApiService) { }
  desenRuleList: BehaviorSubject<any> = new BehaviorSubject([]);
  getList() {
    return this.api.get("/cep/desenRule/list?offset=0&limit=100").pipe(
      map(v => v.rows),
      tap(list => this.desenRuleList.next(list))
    );
  }
  add(user: any) {
    return this.api.post("/cep/desenRule/save", user).pipe(
      tap(res=>this.getList().subscribe())
    )
  }

  save(user: any) {
    return this.api.post("/cep/desenRule/update", user).pipe(
      tap(res=>this.getList().subscribe())
    );
  }

  del(ids: number) {
    return this.api.post("/cep/desenRule/remove", { id: ids }).pipe(
      tap(res=>this.getList().subscribe())
    )
  }
}
