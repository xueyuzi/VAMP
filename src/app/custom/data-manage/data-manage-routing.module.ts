import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChartTemplateComponent} from "./chart-template/chart-template.component"

import {AgenthbComponent} from "./agenthb/agenthb.component";
import {AgentComponent} from "./agent/agent.component";

const routes: Routes = [
    {path:"chart-template",component:ChartTemplateComponent},
    {path:"agenthb",component:AgenthbComponent},
    {path:"agent",component:AgentComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataManageRoutingModule { }
