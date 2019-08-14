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
  isEdit: boolean = false;
  user: any = {};
  type: string;
  userList: Observable<any>;
  roleList: Observable<any>;
  deptList: Array<any>;
  cols: any[];
  ngOnInit() {
    this.cols = [
      { field: 'userId', header: 'ID' },
      { field: 'loginName', header: 'name' },
      { field: 'phonenumber', header: 'phonenumber' },
      { field: 'userName', header: 'userName' },
      { field: 'status', header: 'status' },
      { field: 'email', header: 'email' }
    ]
    this.userService.getList().subscribe();
    this.roleService.getList().subscribe();
    this.deptService.getList().subscribe(
      list => this.deptList = list
    )
    this.userList = this.userService.userList;
    this.roleList = this.roleService.roleList;
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
  showEdit(user) {
    this.type = "edit";
    this.user = user;
    this.isEdit = true;
  }

  save() {

    if (this.type === "edit") {
      this.userService.save(this.user).subscribe(res => { this.isEdit = false; });
    }
    if (this.type === "add") {
      this.userService.add(this.user).subscribe(res => { this.isEdit = false; });
    }
  }

  del(id: number) {
    this.userService.del(id).subscribe();
  }


}
