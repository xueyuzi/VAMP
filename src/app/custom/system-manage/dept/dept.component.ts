import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeptService } from './dept.service';
import { TreeNode, ConfirmationService } from 'primeng/api';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'ngx-dept',
  templateUrl: './dept.component.html',
})
export class DeptComponent implements OnInit {
  settings = {
    columns: {
      deptId: {
        title: 'ID',
        type: 'number',
      },
      deptName: {
        title: '角色名称',
        type: 'string',
      },
      deptSort: {
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
    },
    delete: {
      confirmDelete: true,
    }
  }
  deptList: Array<any>;
  dept: any;
  showEdit: boolean = false;
  menus: TreeNode[];

  constructor(private deptService: DeptService,
    private menuService: MenuService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.dept = {};
    this.getList();
  }

  getList() {
    this.deptService.getTreeList().subscribe(
      depts => this.deptList = depts
    );
  }
  onEdit(event) {
    console.log(event);
    this.dept = event.node.data;
    this.dept.parentName = event.parent == null ? "无" : event.parent.data.title;
    this.dept.parentId = event.parent == null ? 0 : event.parent.data.deptId;
    this.showEdit = true;
  }
  onAdd(event) {
    console.log(event)
    this.dept = {};
    this.dept.parentdept = event !== undefined ? event.node.data.title : "无"
    this.dept.parentId = event !== undefined ? event.node.data.deptId : 0;

    this.showEdit = true;
  }

  savedept() {

    this.deptService.save(this.dept).subscribe(res => {
      this.showEdit = false;
      this.deptService.getTreeList().subscribe(
        list => this.deptList = list
      );
    })
  }
}
