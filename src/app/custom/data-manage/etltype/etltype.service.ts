import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EtltypeService {

  constructor(private api: ApiService) { }
  etlTypeList: BehaviorSubject<any> = new BehaviorSubject([]);
  getList() {
    return this.api.get("/cep/etlType/list?offset=0&limit=100").pipe(
      map(v => v.rows),
      tap(list => this.etlTypeList.next(list))
    );
  }
  add(user: any) {
    return this.api.post("/cep/etlType/save", user).pipe(
      tap(res => this.getList().subscribe())
    );
  }

  save(user: any) {
    return this.api.post("/cep/etlType/update", user).pipe(
      tap(res => this.getList().subscribe())
    );;
  }

  del(ids: number) {
    return this.api.post("/cep/etlType/remove", { id: ids }).pipe(
      tap(res=>this.getList().subscribe())
    );
  }
}
