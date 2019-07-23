import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartTemplateComponent } from "./chart-template/chart-template.component";
import { ChartTemplateListComponent } from "./chart-template/chart-template-list/chart-template-list.component";
import { DataManageRoutingModule } from "./data-manage-routing.module";
import { ThemeModule } from "../../@theme/theme.module";
import { ChartsModule } from "../dashboard/dashboard-charts/dashboard-charts.module";
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from 'primeng/dialog';
import { NbSelectModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { FileUploadModule } from "primeng/fileupload";
@NgModule({
  declarations: [
    ChartTemplateComponent,
    ChartTemplateListComponent],
  imports: [
    CommonModule,
    DataManageRoutingModule,
    ChartsModule,
    ConfirmDialogModule,
    DialogModule,
    NbSelectModule,
    FileUploadModule,
    NbInputModule,
    FormsModule,
    NbButtonModule
  ],
  providers: [
    ConfirmationService
  ],
  exports: [
    ChartTemplateListComponent
  ]
})
export class DataManageModule { }
