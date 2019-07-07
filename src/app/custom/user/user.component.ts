import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from './user.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {

  constructor(private userService: UserService) { }
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
  userList: Observable<any>;
  userCondition = new Subject<any>();
  ngOnInit() {
    this.userList = this.userCondition.pipe(
      switchMap(condition => this.userService.getList(condition)),
    )

  }
  ngAfterViewInit() {
    this.userCondition.next({});
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
      this.userService.save(this.user).subscribe(res => { });
    }
    if (this.type === "new") {
      this.userService.add(this.user).subscribe(res => { });

    }
  }

  delUser(id: number) {
    this.userService.del(id).subscribe(res => { });
  }


}
