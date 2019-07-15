import { NgxEchartsModule } from 'ngx-echarts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';

import { GridStackModule } from "ngx-grid-stack";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbActionsModule, NbPopoverModule } from '@nebular/theme';
import { PieComponent } from "./charts/pie.component";
import { BarComponent } from './charts/bar.component';
import { LineComponent } from './charts/line.component';
import { RadarComponent } from './charts/radar.component';
import { DashboardService } from "./dashboard.service";
import { ThemeModule } from "../../@theme/theme.module";
import { ChartsSettingComponent } from './dashboard-container/setting/charts-setting.component';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DialogModule } from 'primeng/dialog';
import { ChartsService } from './charts/charts.service';
import { DashboardEditorComponent } from "./dashboard-container/setting/dashboard-editor.component";
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DataManageModule } from "../data-manage/data-manage.module";
import { ChartListComponent } from './charts/chart-list/chart-list.component';
@NgModule({
  declarations: [
    DashboardComponent,
    DashboardContainerComponent,
    PieComponent,
    BarComponent,
    LineComponent,
    RadarComponent,
    ChartsSettingComponent,
    DashboardViewComponent,
    DashboardEditorComponent,
    ChartListComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    GridStackModule,
    NbInputModule,
    NbActionsModule,
    NbPopoverModule,
    ThemeModule,
    NgxEchartsModule,
    ColorPickerModule,
    DialogModule,
    SelectButtonModule,
    DataManageModule
  ],
  entryComponents: [DashboardContainerComponent, PieComponent, BarComponent, LineComponent, RadarComponent],
  providers: [DashboardService, ChartsService],
  exports:[ChartListComponent]
}) 
export class DashboardModule { }
