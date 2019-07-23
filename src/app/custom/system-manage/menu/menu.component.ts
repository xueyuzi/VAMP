import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MenuService } from './menu.service';
import { Subject, Observable } from 'rxjs';
import { NbIconLibraries, NbIconComponent } from '@nebular/theme';

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
  menus: Observable<any>;
  menuIcons = [];
  userCondition = new Subject<any>();
  isAdd: boolean;
  isEdit: boolean;
  key: string = "dashboard";
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
    this.menus = this.menuService.menusSource;

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
  showAddMenu() {
    this.menu = {};
    this.isAdd = true;
  }
  showEdit(event) {
    this.isAdd = true;
    this.isEdit = true;
    this.menu = event.data;
    this.setIconComponent(event.data.icon);
  }
  delMenu(event) {
    this.menuService.delMenu(event.data, this.key)
    this.saveMenus();
  }
  addMenus() {
    let id = Math.ceil(Math.random() * 100000)
    this.menu.link = "/custom/dashboard/view/" + id
    this.menuService.addMenu(id, this.menu, this.key).subscribe()
    this.saveMenus();
  }

  saveMenus() {

    this.menuService.saveMenus().subscribe(res => {
      this.isAdd = false; this.isEdit = false;
    })
  }

}
