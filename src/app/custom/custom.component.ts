import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './custom-menu';
import { MenuService } from './menu/menu.service';

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
  menus:Array<any> = [];
  ngOnInit() {
    this.menuService.menusSource.subscribe(
      menus=>{
        this.menus = menus;
      }
    )
  }
}
