import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefinedChartComponent } from "./defined-chart/defined-chart.component";
import { DefinedChartlistComponent } from "./defined-chart/defined-chartlist/defined-chartlist.component";
import { DataManageRoutingModule } from "./data-manage-routing.module";
import { ThemeModule } from "../../@theme/theme.module";
import { ChartListComponent } from "../dashboard/charts/chart-list/chart-list.component";
@NgModule({
  declarations: [
    DefinedChartComponent,
    ChartListComponent,
    DefinedChartlistComponent],
  imports: [
    CommonModule,
    DataManageRoutingModule,
    ThemeModule,
  ],
  providers: [

  ],
  exports: [
    DefinedChartlistComponent
  ]
})
export class DataManageModule { }
