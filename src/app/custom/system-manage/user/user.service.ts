import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api:ApiService) { }
  userList:BehaviorSubject<any> = new BehaviorSubject([]);
  getList(condition:any={}){
    return this.api.post("/system/user/list",condition).pipe(
      map(v=>v.rows),
      tap(list=>this.userList.next(list))
    );
  }
  add(user:any){
    return this.api.post("/system/user/add",user).pipe(
      tap(res=>this.getList().subscribe())
    )
  }

  save(user:any){
    return this.api.post("/system/user/edit",user).pipe(
      tap(res=>this.getList().subscribe())
    );
  }

  del(ids:number){
    return this.api.post("/system/user/remove",{ids:ids}).pipe(
      tap(res=>this.getList().subscribe())
    )
  }
}
