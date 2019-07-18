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
import { PieCustomComponent } from './pie-custom.component';
import { MapComponent } from './map.component';
import { TextComponent } from './text.component';
import { NbSpinnerModule } from '@nebular/theme';
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
    GaugeComponent,
    PieCustomComponent,
    MapComponent,
    TextComponent
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
    GaugeComponent,
    PieCustomComponent,
    MapComponent,
    TextComponent
  ],
  exports: [ChartListComponent],
  imports: [
    CommonModule,
    NgxEchartsModule,
    NbSpinnerModule
  ],
  providers: []
})
export class ChartsModule { }
