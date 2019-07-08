import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { TreeNode } from 'primeng/components/common/treenode';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  constructor(private api: ApiService) { }
  getMenus() {
    return this.api.get("/elasticsearch/menu")
  }


  addMenu(id,menu){
    return this.api.post("/elasticsearch/dashboard",{
      dashboard_id:id,
      label:menu.label,
      data:menu.data
    })
  }

  saveMenus(menus:Array<any>) {
    return this.api.post("/elasticsearch/menu", menus)
  }
}
