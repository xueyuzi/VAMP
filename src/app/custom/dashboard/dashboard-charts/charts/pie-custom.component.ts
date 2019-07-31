import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';
import { ChartsService } from '../dashboard-charts.service';
@Component({
    selector: 'ngx-pie-custom',
    templateUrl: "base-charts.component.html",
})
export class PieCustomComponent extends BaseChartComponent implements OnInit {
    constructor(protected chartsService:ChartsService) {
        super(chartsService);
    }
    options = {
        dataset: {
            source: [
                { name: '无数据', value: 0 }]
        },
        tooltip: {
            confine:true,
            trigger: 'item',
        },
        legend: {
            show: false
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,

            }
        ]
    };
    ngOnInit() {
    }
}
