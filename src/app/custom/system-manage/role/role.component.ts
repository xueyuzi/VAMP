import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleService } from './role.service';

@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
})
export class RoleComponent implements OnInit {
  settings = {
    columns: {
      roleId: {
        title: 'ID',
        type: 'number',
      },
      roleName: {
        title: '角色名称',
        type: 'string',
      },
      roleSort: {
        title: '排序',
        type: 'number',
      },
      status: {
        title: "状态",
        type: "number",
      },
      createTime: {
        title: '创建时间',
        type: 'string',
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,

    }
  }
  roleList: Observable<Array<any>>
  role: any;
  type:string;
  isEdit: boolean = false;
  constructor(private roleService: RoleService) { }

  ngOnInit() {
    this.role={}
    this.roleList = this.roleService.getList();
  }
  showNew() {
    this.type = "add";
    this.role = {};
    this.isEdit = true;
  }
  showEdit($event) {
    this.type = "edit";
    this.role = $event.data;
    this.isEdit = true;
  }
  saveRole(){

  }

}
