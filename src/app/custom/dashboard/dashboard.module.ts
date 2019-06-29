import { NgxEchartsModule } from 'ngx-echarts';
import { PieChart } from './../../@core/data/earning';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EditComponent } from './edit/edit.component';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';

import {GridStackModule} from "ngx-grid-stack";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule,NbActionsModule, NbPopoverModule } from '@nebular/theme';
import {PieComponent} from "./charts/pie.component";
import { BarComponent } from './charts/bar.component';
import { LineComponent } from './charts/line.component';
import { RadarComponent } from './charts/radar.component';
import {DashboardService} from "./dashboard.service";
@NgModule({
  declarations: [DashboardComponent, EditComponent,DashboardContainerComponent,PieComponent, BarComponent, LineComponent, RadarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    GridStackModule,
    NbInputModule,
    NbActionsModule,
    NbPopoverModule,
    
    NgxEchartsModule
  ],
  entryComponents:[DashboardContainerComponent,PieComponent,BarComponent, LineComponent, RadarComponent],
  providers:[DashboardService]
})
export class DashboardModule { }
