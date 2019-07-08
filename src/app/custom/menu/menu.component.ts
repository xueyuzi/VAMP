import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private menuService: MenuService) { }
  menu: any;

  menus: Array<any>;
  userCondition = new Subject<any>();
  isAdd: boolean;
  ngOnInit() {
    this.menu = {};
    let that = this;
    this.menuService.getMenus().subscribe(
      menus => {
        console.log(menus);
        that.menus = menus;
      }
    )
  }
  showAddMenu() {
    this.isAdd = true;
  }
  addMenus() {
    this.menu.data = "/#/custom/dashboard/" + (this.menus.length + 1)
    this.menus.push(this.menu);
    this.menuService.addMenu(this.menus.length + 1, this.menu).subscribe(res=>{})
    this.isAdd = false
  }

  saveMenus() {
    this.menuService.saveMenus(this.menus).subscribe(res => { })
  }

}
