import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { map } from 'rxjs/operators';
import { TreeNode } from 'primeng/components/common/treenode';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private api : ApiService) { }
  getMenus(){
    return this.api.get("assets/mock/menus.json")
  }
}
