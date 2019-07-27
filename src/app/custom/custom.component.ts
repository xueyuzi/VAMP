import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './custom-menu';
import { NbMenuItem } from '@nebular/theme';
import { MenuService } from './system-manage/menu/menu.service';

@Component({
  selector: 'ngx-custom',
  template: `
<ngx-one-column-layout>
  <nb-menu [items]="menus"></nb-menu>
  <router-outlet></router-outlet>
</ngx-one-column-layout>
`
})
export class CustomComponent implements OnInit {
  constructor(private menuService: MenuService) { }
  menus: Array<any> = [];
  ngOnInit() {
    this.menuService.getMenus().subscribe();
    this.menuService.menus$.subscribe(menus=>{
      this.menus = menus
    })
  }
}
