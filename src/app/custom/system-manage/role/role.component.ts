import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleService } from './role.service';
import { TreeNode, ConfirmationService } from 'primeng/api';
import { MenuService } from '../menu/menu.service';

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
    },
    delete: {
      confirmDelete: true,
    }
  }
  roleList: Array<any>;
  role: any;
  isEdit: boolean = false;
  menus: TreeNode[];

  constructor(private roleService: RoleService,
    private menuService: MenuService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.role = {};
    this.getList();

  }
  showNew() {
    this.role = {
      roleSort: 1,
      status: 0,
    };
    this.menuService.getMenusWithTreeData().subscribe(
      menus => {
        this.menus = menus;
        this.isEdit = true;
      }

    );
  }
  delRole($event) {
    this.confirmationService.confirm({
      message: '你确定要删除此用户么？',
      accept: () => {
        this.roleService.del($event.data.roleId).subscribe(
          res => {
            this.getList();
          }
        )
      }
    });
  }
  showEdit($event) {
    this.role = $event.data;
    this.menuService.getMenusWithTreeData(this.role.roleId).subscribe(
      menus => {
        this.menus = menus;
        this.isEdit = true;
      }
    );
  }


  changeMenus(event, node) {
    let i = this.menus.indexOf(node);
    this.menus[i].children.forEach(
      (v, k) => {
        this.menus[i].children[k].data.checked = event;
      }
    )
  }
  getList() {
    this.roleService.getList().subscribe(
      roles => this.roleList = roles
    );
  }
  saveRole() {
    let menuIds = [];
    this.menus.forEach(menu1 => {
      menu1.data.checked && menuIds.push(menu1.data.id);
      menu1.children.forEach(
        menu2 => menu2.data.checked && menuIds.push(menu2.data.id)
      )
    })
    this.role.menuIds = menuIds.join(',');
    this.roleService.save(this.role).subscribe(res => {
      this.getList();
      this.isEdit = false;
    });

  }

}
