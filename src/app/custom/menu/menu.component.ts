import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private menuService:MenuService) { }
  menus:Array<any>;
  menu:any;
  isAdd:boolean;
  ngOnInit() {
    this.menuService.getMenus().subscribe(
      menus=>this.menus = menus
    )
    this.menu={}
  }
  showAddMenu(){
    this.isAdd = true;
  }
  addMenus(){
    this.menus.push(this.menu)
  }

}
