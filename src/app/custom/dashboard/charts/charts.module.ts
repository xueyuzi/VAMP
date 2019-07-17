import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieComponent } from "./pie.component";
import { BarComponent } from './bar.component';
import { BarHorizontalstackComponent } from './bar-horizontalstack.component';
import { BarNegativeComponent } from "./bar-negative.component";
import { LineComponent } from './line.component';
import { LineMultipleComponent } from "./line-multiple.component";
import { LinestackComponent } from "./line-stack.component";
import { RadarComponent } from './radar.component';
import { FunnelComponent } from './funnel.component';
import { GaugeComponent } from "./gauge.component";
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartListComponent } from './chart-list/chart-list.component';
@NgModule({
  declarations: [
    ChartListComponent,
    PieComponent,
    BarComponent,
    BarHorizontalstackComponent,
    BarNegativeComponent,
    LineComponent,
    LinestackComponent,
    LineMultipleComponent,
    RadarComponent,
    FunnelComponent,
    GaugeComponent
  ],
  entryComponents: [
    PieComponent,
    BarComponent,
    BarHorizontalstackComponent,
    BarNegativeComponent,
    LineComponent,
    LinestackComponent,
    LineMultipleComponent,
    RadarComponent,
    FunnelComponent,
    GaugeComponent],
  exports: [ChartListComponent],
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  providers: []
})
export class ChartsModule { }
