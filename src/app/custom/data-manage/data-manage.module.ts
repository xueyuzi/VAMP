import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartTemplateComponent } from "./chart-template/chart-template.component";
import { ChartTemplateListComponent } from "./chart-template/chart-template-list/chart-template-list.component";
import { DataManageRoutingModule } from "./data-manage-routing.module";
import { ThemeModule } from "../../@theme/theme.module";
import { ChartsModule } from "../dashboard/charts/charts.module";
import { ConfirmationService } from 'primeng/api';
@NgModule({
  declarations: [
    ChartTemplateComponent,
    ChartTemplateListComponent],
  imports: [
    CommonModule,
    DataManageRoutingModule,
    ThemeModule,
    ChartsModule
  ],
  providers: [
    ConfirmationService
  ],
  exports: [
    ChartTemplateListComponent
  ]
})
export class DataManageModule { }
