import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefinedChartComponent } from "./defined-chart/defined-chart.component";
import { DefinedChartlistComponent } from "./defined-chart/defined-chartlist/defined-chartlist.component";
import { DataManageRoutingModule } from "./data-manage-routing.module";
import { ThemeModule } from "../../@theme/theme.module";
import { ChartsModule } from "../dashboard/charts/charts.module";
import { ConfirmationService } from 'primeng/api';
@NgModule({
  declarations: [
    DefinedChartComponent,
    DefinedChartlistComponent],
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
    DefinedChartlistComponent
  ]
})
export class DataManageModule { }
