import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefinedChartComponent} from "./defined-chart/defined-chart.component"
const routes: Routes = [
    {path:"defined-chart",component:DefinedChartComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataManageRoutingModule { }
