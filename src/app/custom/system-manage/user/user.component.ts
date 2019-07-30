import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from './user.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RoleService } from '../role/role.service';
import { TemperatureHumidityService } from '../../../@core/mock/temperature-humidity.service';
import { DeptService } from '../dept/dept.service';
import { ServerDataSource, LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private roleService: RoleService,
    private deptService: DeptService) { }
  settings = {
    columns: {
      userId: {
        title: 'ID',
        type: 'number',
      },
      loginName: {
        title: 'name',
        type: 'string',
      },
      phonenumber: {
        title: 'phonenumber',
        type: 'string',
      },
      userName: {
        title: "userName",
        type: "string",
      },
      status: {
        title: 'status',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,

    }
  }
  isEdit: boolean = false;
  user: any = {};
  type: string;
  userSource: LocalDataSource;
  roleList: Array<any>;
  deptList: Array<any>;
  ngOnInit() {
    this.userSource = new LocalDataSource();
    this.userService.getList().subscribe(
      list => this.userSource.load(list)
    );
    this.roleService.getList().subscribe(
      list => this.roleList = list
    )
    this.deptService.getList().subscribe(
      list => this.deptList = list
    )
  }
  changeRoles(event) {
    this.user.roleIds = event;
  }
  changeDept(event) {
    this.user.deptId = event;
  }
  showNew() {
    this.type = "add";
    this.user = {};
    this.isEdit = true;
  }
  showEdit($event) {
    this.type = "edit";
    this.user = $event.data;
    this.isEdit = true;
  }

  saveUser() {

    if (this.type === "edit") {
      this.userService.save(this.user).subscribe(res => { this.isEdit = false; });
    }
    if (this.type === "add") {
      this.userService.add(this.user).subscribe(res => { this.isEdit = false; });
    }
  }

  delUser(id: number) {
    this.userService.del(id).subscribe(res => { });
  }


}
