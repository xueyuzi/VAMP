import { Injectable } from '@angular/core';
import { ApiService } from '../../../api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private api: ApiService) { }
  getList(condition: any = {}) {
    return this.api.post("/system/role/list", condition).pipe(
      map(v => v.rows)
    );
  }

  add(user:any){
    return this.api.post("/system/role/add",user)
  }

  save(user:any){
    return this.api.post("/system/role/edit",user);
  }

  del(ids:number){
    return this.api.post("/system/role/remove",{ids:ids})
  }
}
