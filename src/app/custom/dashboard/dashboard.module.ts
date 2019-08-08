import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';

import { GridStackModule } from "ngx-grid-stack";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbInputModule, NbActionsModule, NbPopoverModule, NbSpinnerModule, NbButtonModule, NbIconModule, NbSelectModule } from '@nebular/theme';

import { ThemeModule } from "../../@theme/theme.module";
import { ColorPickerModule } from 'primeng/colorpicker';
import { DialogModule } from 'primeng/dialog';
import { DashboardEditorComponent } from "./dashboard-editor.component";
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DataManageModule } from "../data-manage/data-manage.module";
import { ChartsModule } from "./dashboard-charts/dashboard-charts.module"
import { DashboardSettingComponent } from './dashboard-setting/dashboard-setting.component';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardContainerComponent,
    DashboardViewComponent,
    DashboardEditorComponent,
    DashboardSettingComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    GridStackModule,
    NbInputModule,
    NbActionsModule,
    NbPopoverModule,
    ColorPickerModule,
    DialogModule,
    SelectButtonModule,
    DataManageModule,
    ChartsModule,
    FormsModule,
    DialogModule,
    NbSpinnerModule,
    ButtonModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule
  ],
  entryComponents: [DashboardContainerComponent],
  providers: [],
})
export class DashboardModule { }

