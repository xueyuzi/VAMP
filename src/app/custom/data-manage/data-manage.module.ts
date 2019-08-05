import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartTemplateComponent } from "./chart-template/chart-template.component";
import { ChartTemplateListComponent } from "./chart-template/chart-template-list/chart-template-list.component";
import { DataManageRoutingModule } from "./data-manage-routing.module";

import { AgentComponent } from './agent/agent.component';
import { DesenRuleComponent } from './desenRule/desenRule.component';
import { AgenthbComponent } from './agenthb/agenthb.component';
import { ActiveListComponent } from './activeList/activeList.component';
import { ActiveListDetailComponent } from './activeListDetail/activeListDetail.component';
import { RuleComponent } from './rule/rule.component';
import { SinkComponent } from './sink/sink.component';
import { SourceComponent } from './source/source.component';
import { ModelComponent } from './model/model.component';
import { EtltypeComponent } from './etltype/etltype.component';
import { EtlTypeConfigComponent } from './EtlTypeConfig/EtlTypeConfig.component';

import { ThemeModule } from "../../@theme/theme.module";
import { ChartsModule } from "../dashboard/dashboard-charts/dashboard-charts.module";
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from 'primeng/dialog';
import { NbSelectModule, NbInputModule, NbCardModule, NbButtonModule, NbCheckboxModule, NbRadioModule, NbIconModule, NbIconComponent } from '@nebular/theme';
import { FileUploadModule } from "primeng/fileupload";
import {Ng2SmartTableModule} from "ng2-smart-table";

@NgModule({
  declarations: [
    ChartTemplateComponent,
    ChartTemplateListComponent,
    AgentComponent,
    DesenRuleComponent,
    ActiveListComponent,
    ActiveListDetailComponent,
    RuleComponent,
    SinkComponent,
    SourceComponent,
    ModelComponent,
    EtltypeComponent,
    EtlTypeConfigComponent,
    AgenthbComponent],
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
    NbButtonModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbRadioModule
  ],
  providers: [
    ConfirmationService
  ],
  exports: [
    ChartTemplateListComponent
  ]
})
export class DataManageModule { }
