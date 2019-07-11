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

  menus;
  menuIcons = ['nb-alert', 'nb-angle-double-left', 'nb-angle-double-right',
    'nb-arrow-down', 'nb-arrow-dropdown', 'nb-arrow-dropleft',
    'nb-arrow-dropright', 'nb-arrow-dropup', 'nb-arrow-left', 'nb-arrow-retweet', 'nb-arrow-right',
    'nb-arrow-thin-down', 'nb-arrow-thin-left', 'nb-arrow-thin-right', 'nb-arrow-thin-up',
    'nb-arrow-up', 'nb-audio', 'nb-bar-chart', 'nb-checkmark', 'nb-chevron-down',
    'nb-chevron-down-outline', 'nb-chevron-left', 'nb-chevron-left-outline', 'nb-chevron-right',
    'nb-chevron-right-outline', 'nb-chevron-up', 'nb-chevron-up-outline', 'nb-close',
    'nb-close-circled', 'nb-cloudy', 'nb-coffee-maker', 'nb-compose', 'nb-edit', 'nb-email',
    'nb-flame-circled', 'nb-gear', 'nb-grid-a', 'nb-grid-a-outline', 'nb-grid-b', 'nb-grid-b-outline',
    'nb-heart', 'nb-home', 'nb-keypad', 'nb-layout-centre', 'nb-layout-default', 'nb-layout-one-column',
    'nb-layout-sidebar-left', 'nb-layout-sidebar-right', 'nb-layout-two-column', 'nb-lightbulb',
    'nb-list', 'nb-location', 'nb-locked', 'nb-loop', 'nb-loop-circled', 'nb-menu', 'nb-notifications',
    'nb-paper-plane', 'nb-partlysunny', 'nb-pause', 'nb-pause-outline', 'nb-person', 'nb-phone',
    'nb-play', 'nb-play-outline', 'nb-plus', 'nb-plus-circled', 'nb-power', 'nb-power-circled',
    'nb-rainy', 'nb-roller-shades', 'nb-search', 'nb-shuffle', 'nb-skip-backward',
    'nb-skip-backward-outline', 'nb-skip-forward', 'nb-skip-forward-outline', 'nb-snowy-circled',
    'nb-square', 'nb-square-outline', 'nb-star', 'nb-sunny', 'nb-sunny-circled', 'nb-tables', 'nb-title',
    'nb-trash', 'nb-volume-high', 'nb-volume-mute', 'nb-drop', 'nb-drops', 'nb-info', 'nb-expand', 'nb-collapse',
    'nb-e-commerce', 'nb-danger', 'nb-checkmark-circle', 'nb-help']
  userCondition = new Subject<any>();
  isAdd: boolean;
  isEdit: boolean
  settings = {
    columns: {
      title: {
        title: '菜单名',
        type: 'string',
      },
      link: {
        title: '路径',
        type: 'string',
      },
    },
    actions: {
      add: false,
      edit: false,
    },
    delete: {
      confirmDelete: true
    }
  }
  ngOnInit() {
    this.menu = {};
    this.menuService.menusSource.subscribe(
      menus => { this.menus = Object.assign([], menus) }
    )
  }
  setIcon(icon: string) {
    this.menu.icon = icon;
  }
  showAddMenu() {
    this.menu = {};
    this.isAdd = true;
  }
  showEdit(event) {
    this.isAdd = true;
    this.isEdit = true;
    this.menu = event.data;
  }
  delMenu(event) {
    this.menuService.delMenu(event.data)
    this.saveMenus();
  }
  addMenus() {
    this.menu.link = "/custom/dashboard/" + (this.menus.length + 1)
    this.menuService.addMenu(this.menus.length + 1, this.menu).subscribe()
    this.saveMenus();
  }

  saveMenus() {

    this.menuService.saveMenus().subscribe(res => {
      this.isAdd = false; this.isEdit = false;
    })
  }

}
