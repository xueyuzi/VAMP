import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomRoutingModule } from './custom-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { CustomComponent } from './custom.component';

import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { OrderListModule } from 'primeng/orderlist';
import { DataManageModule } from "./data-manage/data-manage.module";

@NgModule({
  declarations: [CustomComponent],
  imports: [
    CommonModule,
    CustomRoutingModule,
    ThemeModule,
    TableModule,
    TreeModule,
    OrderListModule,
    DataManageModule
  ],
  providers: []
})
export class CustomModule { }
