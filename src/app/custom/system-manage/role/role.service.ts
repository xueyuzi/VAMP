import { Injectable } from '@angular/core';
import { ApiService } from '../../../api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private api: ApiService) { }

  transListDataToSubmit(role) {
    let data: any = {}
    role.roleId !== undefined ? data.roleId = role.roleId : 0;
    role.roleName !== undefined ? data.roleName = role.roleName : 0;
    role.roleKey !== undefined ? data.roleKey = role.roleKey : 0;
    role.roleSort !== undefined ? data.roleSort = role.roleSort : 0;
    role.status !== undefined ? data.status = role.status : 0;
    role.remark !== undefined ? data.remark = role.remark : 0;
    role.menuIds !== undefined ? data.menuIds = role.menuIds : 0;
    return data;
  }
  getList(condition: any = {}) {
    return this.api.post("/system/role/list", condition).pipe(
      map(v => v.rows)
    );
  }


  save(role: any) {
    let reqUrl = ""
    if (role.roleId === undefined) {
      reqUrl = "/system/role/add"
    } else {
      reqUrl = "/system/role/edit"
    }
    role = this.transListDataToSubmit(role);
    role = this.api.transToFormData(role);
    return this.api.post(reqUrl, role);
  }

  del(ids: number) {
    let data = this.api.transToFormData({ ids: ids });
    return this.api.post("/system/role/remove", data)
  }
}
