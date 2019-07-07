import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomRoutingModule } from './custom-routing.module';

import { ThemeModule } from '../@theme/theme.module';
import { CustomComponent } from './custom.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserComponent } from './user/user.component';
import {UserService} from "./user/user.service"
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';

import {TreeModule} from 'primeng/tree';
import { MenuComponent } from './menu/menu.component';
import { MenuService } from './menu/menu.service';


import {OrderListModule} from 'primeng/orderlist';

@NgModule({
  declarations: [CustomComponent, UserComponent, MenuComponent],
  imports: [
    CommonModule,
    CustomRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    TableModule,
    DialogModule,
    TreeModule,
    OrderListModule
  ],
  providers:[UserService,MenuService]
})
export class CustomModule { }
