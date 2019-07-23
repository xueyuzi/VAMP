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
                { name: '周一', value: 335 },
                { name: '周二', value: 310 },
                { name: '周三', value: 234 },
                { name: '周四', value: 135 },
                { name: '周五', value: 1548 }
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
