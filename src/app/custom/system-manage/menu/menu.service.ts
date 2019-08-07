import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { TreeNode } from 'primeng/api';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../../api.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  constructor(private api: ApiService) {
  }

  private menusSource = new BehaviorSubject<Array<any>>([]);
  menus$: Observable<Array<any>> = this.menusSource.asObservable();
  menus: Array<any> = [];


  setMenus(menus: Array<any>) {
    this.menus = menus;
    this.menusSource.next(menus);
  }

  getMenus() {
    return this.api.post("/menu").pipe(
      // 删除menu中 空children
      map(res => res.map(m => {
        if (m.children.length > 0) {
          m.children = m.children.map(c => {
            if (c.children.length == 0) {
              delete c.children;
            } else {
              c.children.forEach(d => delete d.children)
            } return c
          });
        }
        return m
      })),
      tap(menus => this.setMenus(menus))
    )
  }

  getMenusWithTreeTableData() {
    return this.api.get("/system/menu/list").pipe(
      map(menus => {
        let tree: TreeNode[] = [];
        let tmpIds: number[] = [0];
        let hashIds: any = { 0: [{ menuId: 0 }] };
        let level = 0;
        while (level < 4) {
          if (level == 0) {
            menus.map(
              menu => {
                if (menu.parentId == 0) {
                  tree.push({
                    data: menu,
                    children: []
                  })
                }
              }
            )
          }
          if (level == 1) {
            menus.forEach(
              menu => {
                tree.forEach(
                  (tre, i) => {
                    if (tre.data.menuId == menu.parentId) {
                      tree[i].children.push({
                        data: menu,
                        children: []
                      })
                    }
                  }
                )
              }
            )
          }
          if (level == 2) {
            menus.forEach(
              menu => {
                tree.forEach(
                  (tre, i) => {
                    tre.children.forEach(
                      (tr, l) => {
                        if (tr.data.menuId == menu.parentId) {
                          tree[i].children[l].children.push({
                            data: menu
                          })
                        }
                      }
                    )
                  }
                )
              }
            )
          }
          level++;
        }
        console.log(tree)
        return tree
      }
      )
    )
  }

  getMenusWithTreeData(roleId = undefined) {
    // 只支持两层
    let reqUrl = ""
    if (roleId !== undefined) {
      reqUrl = "/system/menu/roleMenuTreeData?roleId=" + roleId;
    } else {
      reqUrl = "/system/menu/roleMenuTreeData";
    }
    return this.api.get(reqUrl).pipe(
      map(res => {
        let treeData: TreeNode[] = new Array();
        let hash = {};
        res = res.sort((a, b) => a.pId - b.pId);
        console.log(res)
        res.forEach(
          role => {
            try {
              if (role.pId === 0) {
                // 最外层

                let node: TreeNode = {
                  label: role.title,
                  data: role,
                  children: []
                };
                treeData.push(node);
                hash[role.id] = treeData.length - 1
              } else {
                let node: TreeNode = {
                  label: role.title,
                  data: role,
                }
                treeData[hash[role.pId]].children.push(node);
              }
            } catch (e) {
              return
            }

          }
        )
        console.log("treeData", treeData);
        return treeData;
      })
    )
  }

  saveMenus(menu) {

    let menuForm = this.api.transToFormData(menu);
    let postUrl = ""
    if (menu.menuId === undefined) {
      postUrl = "/system/menu/add"
    } else {
      postUrl = "/system/menu/edit"
    }
    return this.api.post(postUrl, menuForm).pipe(
      tap(v => this.getMenus().subscribe())
    );
  }

  delMenu(menuId: number) {
    return this.api.post('/system/menu/remove/' + menuId);
  }
}
