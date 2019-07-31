import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';
import { ChartsService } from '../dashboard-charts.service';

@Component({
    selector: 'ngx-line-stack',
    templateUrl: "base-charts.component.html",
})
export class LinestackComponent extends BaseChartComponent implements OnInit {
    constructor(protected chartsService: ChartsService) {
        super(chartsService);
    }
    options = {
        dataset: {
            source: [
                { name: '无数据', value: 0 }]
        },
        tooltip: {
            confine: true,
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            show: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {

                type: 'line',
                stack: '总量',
                areaStyle: {},
            },
            {

                type: 'line',
                stack: '总量',
                areaStyle: {},
            },
            {

                type: 'line',
                stack: '总量',
                areaStyle: {},
            },
            {

                type: 'line',
                stack: '总量',
                areaStyle: { normal: {} },
            },
            {
                type: 'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: { normal: {} },
            }
        ]
    };

    ngOnInit() {
    }
}
