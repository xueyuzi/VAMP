import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { TreeNode } from 'primeng/components/common/treenode';
import { Subject, BehaviorSubject } from 'rxjs';
import { ApiService } from '../../../api.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  constructor(private api: ApiService) {
  }

  menus: Object;
  menusSource = new BehaviorSubject<Object>([]);
  setMenus(menus: Object) {
    this.menus = Object.assign({}, menus);
    this.menusSource.next(menus);
  }
  initMenus() {
    return this.api.get("/elasticsearch/menu").pipe(
      tap(menus => this.setMenus(menus))
    )
  }


  addMenu(id, menu, key) {
    if (this.menus[key] == undefined) {
      this.menus[key] = []
    }
    this.menus[key].push(menu);
    this.setMenus(this.menus)
    return this.api.post("/elasticsearch/dashboard", {
      dashboard_id: id,
      parent_menu:key
    })
  }
  delMenu(v, key) {
    this.menus[key] = this.menus[key].filter(menu => menu !== v);
    this.setMenus(this.menus);
    this.menusSource.next(this.menus);
  }

  saveMenus() {

    return this.api.post("/elasticsearch/menu", this.menus).pipe(
      tap(v => this.setMenus(this.menus))
    )
  }
}
