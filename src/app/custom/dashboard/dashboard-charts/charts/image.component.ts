import { BaseChartComponent } from "./base-charts.component";
import { OnInit, Component } from '@angular/core';
import { ChartsService } from '../dashboard-charts.service';
declare const $:any;
@Component({
    selector: 'ngx-image',
    template: `
    <div
    style="
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    width: 100%;"
    [style.backgroundImage]="'url('+container.panelData.chartStyle.img_src+')'"
    >
        <div *ngIf="container.panelData.chartStyle.img_src===undefined">请设置url</div>
    </div>
    `
})
export class ImageComponent extends BaseChartComponent implements OnInit {
    constructor(protected chartsService:ChartsService) {
        super(chartsService);
    }
    ngOnInit() {
    }
}