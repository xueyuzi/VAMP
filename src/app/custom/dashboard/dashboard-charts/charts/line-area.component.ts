import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';
import { ChartsService } from '../dashboard-charts.service';

@Component({
    selector: 'ngx-line',
    templateUrl: "base-charts.component.html",
})
export class LineAreaComponent extends BaseChartComponent implements OnInit {
    constructor(protected chartsService: ChartsService) {
        super(chartsService);
    }
    options = {
        dataset: {
            source: [
                { name: '无数据', value: 0 }
            ]
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            type: 'line',
            smooth: true,
            areaStyle: {}
        }]
    };
    ngOnInit() {
    }

}
