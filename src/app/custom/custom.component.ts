import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './custom-menu';

@Component({
  selector: 'ngx-custom',
  template: `
<ngx-sample-layout>
  <nb-menu [items]="menu"></nb-menu>
  <router-outlet></router-outlet>
</ngx-sample-layout>`
})
export class CustomComponent {

  menu = MENU_ITEMS;

}
