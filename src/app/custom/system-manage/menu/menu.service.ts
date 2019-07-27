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
          m.children = m.children.map(c => { delete c.children; return c });
        }
        return m
      })),
      tap(menus => this.setMenus(menus))
    )
  }

  getMenusWithTreeData() {
    return this.api.post("/menu").pipe(
      map(menus => {
        let tree: TreeNode[] = [];
        menus.map((m, i) => {
          let treeData: TreeNode = {
            data: m,
            children: [],
            expanded: true,
          }
          if (m.children.length > 0) {
            m.children.map(c => {
              let treeDataDeep: TreeNode = {
                data: c,
              }
              delete treeDataDeep.data.children;
              treeData.children.push(treeDataDeep);
            })
          }
          delete treeData.data.children;
          tree.push(treeData);
        })
        return tree;
      }
      )
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
}
