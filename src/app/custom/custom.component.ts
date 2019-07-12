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
  menus:NbMenuItem[] = MENU_ITEMS;
  ngOnInit() {
    this.menuService.menusSource.subscribe(
      menus=>{
        this.menus[0].children = menus;
      }
    )
  }
}
