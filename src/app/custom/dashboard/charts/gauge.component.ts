import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base.charts.component';

@Component({
    selector: 'ngx-gauge',
    template: `<div echarts [options]="options" style="height:100%;width:100%"></div>`
})
export class GaugeComponent extends BaseChartComponent implements OnInit {
    constructor() {
        super();
    }
    options = {
        dataset: {
            source: [
                { value: 50 }
            ]
        },
        series: [
            {
                type: 'gauge',
                detail: { formatter: '{value}%' }
            }
        ]
    };


    ngOnInit() {
    }
}
