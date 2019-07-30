import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieComponent } from "./charts/pie.component";
import { BarComponent } from './charts/bar.component';
import { BarHorizontalstackComponent } from './charts/bar-horizontalstack.component';
import { BarNegativeComponent } from "./charts/bar-negative.component";
import { LineComponent } from './charts/line.component';
import { LineMultipleComponent } from "./charts/line-multiple.component";
import { LinestackComponent } from "./charts/line-stack.component";
import { RadarComponent } from './charts/radar.component';
import { FunnelComponent } from './charts/funnel.component';
import { GaugeComponent } from "./charts/gauge.component";
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartListComponent } from './chart-list/chart-list.component';
import { PieCustomComponent } from './charts/pie-custom.component';
import { MapComponent } from './charts/map.component';
import { TextComponent } from './charts/text.component';
import { NbSpinnerModule } from '@nebular/theme';
import { BarHorizontalComponent } from './charts/bar-horizontal.component';
import { LineAreaComponent } from './charts/line-area.component';
import { TableModule } from 'primeng/table';
import { TableComponent } from './charts/table.component';
@NgModule({
  declarations: [
    ChartListComponent,
    PieComponent,
    BarComponent,
    BarHorizontalstackComponent,
    BarNegativeComponent,
    BarHorizontalComponent,
    LineComponent,
    LinestackComponent,
    LineMultipleComponent,
    LineAreaComponent,
    RadarComponent,
    FunnelComponent,
    GaugeComponent,
    PieCustomComponent,
    MapComponent,
    TextComponent,
    TableComponent
  ],
  entryComponents: [
    PieComponent,
    BarComponent,
    BarHorizontalstackComponent,
    BarNegativeComponent,
    BarHorizontalComponent,
    LineComponent,
    LinestackComponent,
    LineMultipleComponent,
    LineAreaComponent,
    RadarComponent,
    FunnelComponent,
    GaugeComponent,
    PieCustomComponent,
    MapComponent,
    TextComponent, TableComponent
  ],
  exports: [ChartListComponent],
  imports: [
    CommonModule,
    NgxEchartsModule,
    NbSpinnerModule,
    TableModule
  ],
  providers: []
})
export class ChartsModule { }
