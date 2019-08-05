import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MenuService } from './menu.service';
import { Subject, Observable } from 'rxjs';
import { NbIconLibraries, NbIconComponent } from '@nebular/theme';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private menuService: MenuService,
    private iconsLibrary: NbIconLibraries,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.menuIcons = Array.from(iconsLibrary.getPack('eva').icons.keys())
      .filter(icon => icon.indexOf('outline') === -1);
  }
  @ViewChild('icon', { read: ViewContainerRef, static: false }) icon;

  menu: any;
  menuIcons = [];
  showEdit: boolean;
  customColumn = 'title';
  defaultColumns = ['menuId', 'icon', 'link'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  data: TreeNode[] = [];
  ngOnInit() {
    this.menu = {};
    this.menuService.getMenusWithTreeTableData().subscribe(
      menus => this.data = menus
    )
  }

  onEdit(event) {
    console.log(event);
    this.menu = event.node.data;
    this.menu.parentMenu = event.parent == null ? "无" : event.parent.data.title;
    this.menu.parentId = event.parent == null ? 0 : event.parent.data.menuId;
    this.menu.menuType = "M";
    this.menu.menuName = this.menu.title;
    this.menu.url = this.menu.link;
    this.menu.orderNum = 1;
    this.menu.visible = 0;
    this.setIcon(this.menu.icon);
    this.showEdit = true;
  }
  onAdd(event) {
    console.log(event)
    this.menu = {};
    this.menu.parentMenu = event !== undefined ? event.node.data.title : "无"
    this.menu.parentId = event !== undefined ? event.node.data.menuId : 0;
    this.menu.url = "/custom/dashboard/view/" + Math.ceil(Math.random() * 100000);
    this.menu.menuType = "M";
    this.menu.visible = 0;
    this.menu.orderNum = 1;

    this.showEdit = true;
  }

  setIcon(icon: string) {
    console.log(icon);
    this.menu.icon = icon;
    this.setIconComponent(icon)
  }

  setIconComponent(icon) {
    this.icon.clear();
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(NbIconComponent);
    let componentRef = this.icon.createComponent(componentFactory);
    componentRef.location.nativeElement.style = `height: 50px;width: 50px;`;
    (<NbIconComponent>componentRef.instance).icon = icon;
  }
  getMenus() {
    this.menuService.getMenusWithTreeTableData().subscribe(
      menus => this.data = menus
    );
  }

  saveMenus() {

    this.menuService.saveMenus(this.menu).subscribe(res => {
      this.showEdit = false;
      this.getMenus();
    })
  }
  onDel(menuId) {
    this.menuService.delMenu(menuId).subscribe(res => {
      this.getMenus();
    });
  }

}
