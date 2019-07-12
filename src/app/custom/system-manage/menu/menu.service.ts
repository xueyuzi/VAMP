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
    this.initMenus().subscribe()
  }

  menus:Array<any>;
  menusSource= new BehaviorSubject<Array<any>>([]);
  setMenus(menus:Array<any>){
    this.menus = Object.assign([],menus);
    this.menusSource.next(menus);
  }
  initMenus() {
    return this.api.get("/elasticsearch/menu").pipe(
      tap(menus=>this.setMenus(menus))
    )
  }


  addMenu(id,menu){
    this.menus.push(menu);
    this.menusSource.next(this.menus);
    return this.api.post("/elasticsearch/dashboard",{
      dashboard_id:id,
    })
  }
  delMenu(v){
    this.menus = this.menus.filter(menu=>menu!==v);
    this.menusSource.next(this.menus);
  }

  saveMenus() {
    this.menusSource.next(this.menus);
    return this.api.post("/elasticsearch/menu", this.menus)
  }
}
