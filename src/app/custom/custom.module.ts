import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomRoutingModule } from './custom-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { CustomComponent } from './custom.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {TreeModule} from 'primeng/tree';
import {OrderListModule} from 'primeng/orderlist';
import { DashboardService } from './dashboard/dashboard.service';
import { UserComponent } from './system-manage/user/user.component';
import { MenuComponent } from './system-manage/menu/menu.component';
import { UserService } from '../@core/mock/users.service';
import { MenuService } from './system-manage/menu/menu.service';

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
  providers:[UserService,MenuService,DashboardService]
})
export class CustomModule { }
