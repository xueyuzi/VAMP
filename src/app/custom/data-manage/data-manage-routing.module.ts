import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChartTemplateComponent} from "./chart-template/chart-template.component"

import {AgenthbComponent} from "./agenthb/agenthb.component";
import {AgentComponent} from "./agent/agent.component";
import {DesenRuleComponent} from "./desenRule/desenRule.component";
import {ActiveListComponent} from "./activeList/activeList.component";
import {ActiveListDetailComponent } from './activeListDetail/activeListDetail.component';
import {RuleComponent} from "./rule/rule.component";
import {SinkComponent} from "./sink/sink.component";
import {SourceComponent} from "./source/source.component";

const routes: Routes = [
    {path:"chart-template",component:ChartTemplateComponent},
    {path:"agenthb",component:AgenthbComponent},
    {path:"desenRule",component:DesenRuleComponent},
    {path:"activeList",component:ActiveListComponent},
    {path:"activeListDetail",component:ActiveListDetailComponent},
    {path:"rule",component:RuleComponent},
    {path:"sink",component:SinkComponent},
    {path:"source",component:SourceComponent},
    {path:"agent",component:AgentComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataManageRoutingModule { }
