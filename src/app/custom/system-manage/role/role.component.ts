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
  roleList: Observable<any>;
  role: any;
  cols: any[];
  isEdit: boolean = false;
  menus: TreeNode[];

  constructor(private roleService: RoleService,
    private menuService: MenuService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.role = {};
    this.cols = [
      { field: 'roleId', header: 'ID' },
      { field: 'roleName', header: '角色名称' },
      { field: 'roleSort', header: '排序' },
      { field: 'status', header: '状态' },
      { field: 'createTime', header: '创建时间' }
    ]
    this.roleService.getList().subscribe();
    this.roleList = this.roleService.roleList;

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
  handleChange(e) {
    this.role.status = e.checked ? 0 : 1;
  }
  del(role) {
    this.confirmationService.confirm({
      message: '你确定要删除此角色么？',
      accept: () => {
        this.roleService.del(role.roleId).subscribe()
      }
    });
  }
  showEdit(role) {
    this.role = role;
    this.menuService.getMenusWithTreeData(this.role.roleId).subscribe(
      menus => {
        this.menus = menus;
        this.isEdit = true;
      }
    );
  }


  changeMenus(event, node) {
    console.log(node);
    let i = this.menus.indexOf(node);
    if (i === -1) {
      return false;
    }
    this.menus[i].children.forEach(
      (v, k) => {
        this.menus[i].children[k].data.checked = event;
      }
    )
  }
  checkParentIsChecked(node) {
    if (node.children == undefined) {
      return false;
    }
    return node.children.filter(cnode => cnode.data.checked).length > 0
  }
  save() {
    let menuIds = [];
    this.menus.forEach(menu1 => {
      menu1.data.checked && menuIds.push(menu1.data.id);
      menu1.children.forEach(
        menu2 => menu2.data.checked && menuIds.push(menu2.data.id)
      )
    })
    this.role.menuIds = menuIds.join(',');
    this.roleService.save(this.role).subscribe(res => {
      this.isEdit = false;
    });

  }

}
