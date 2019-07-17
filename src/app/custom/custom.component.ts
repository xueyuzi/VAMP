import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './custom-menu';
import { NbMenuItem } from '@nebular/theme';
import { MenuService } from './system-manage/menu/menu.service';

@Component({
  selector: 'ngx-custom',
  template: `
<ngx-sample-layout>
  <nb-menu [items]="menus"></nb-menu>
  <router-outlet></router-outlet>
</ngx-sample-layout>`
})
export class CustomComponent implements OnInit {
  constructor(private menuService: MenuService) { }
  menus: NbMenuItem[] = MENU_ITEMS;
  ngOnInit() {
    console.log(this.menuService.menusSource);
    this.menuService.menusSource.subscribe(
      menus => {
        
        this.menus[0].children = menus['dashboard'];
        this.menus[1].children = menus['situation'];
        this.menus[2].children = menus['devops'];
        console.log("custom menu",this.menus);
      }
    )
  }
}
