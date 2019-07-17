import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieComponent } from "./pie.component";
import { BarComponent } from './bar.component';
import { LineComponent } from './line.component';
import { RadarComponent } from './radar.component';
import { NgxEchartsModule } from 'ngx-echarts';

import { ChartsService } from './charts.service';
import { ChartListComponent } from './chart-list/chart-list.component';
@NgModule({
  declarations: [
    PieComponent,
    BarComponent,
    LineComponent,
    RadarComponent,
    ChartListComponent
  ],
  entryComponents: [PieComponent, BarComponent, LineComponent, RadarComponent],
  exports: [ChartListComponent],
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  providers: [ChartsService]
})
export class ChartsModule { }
