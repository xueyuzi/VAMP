import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';
import { ChartsService } from '../dashboard-charts.service';

@Component({
    selector: 'ngx-bar-negative',
    templateUrl: "base-charts.component.html"
})
export class BarNegativeComponent extends BaseChartComponent implements OnInit {
    constructor(protected chartsService:ChartsService) {
        super(chartsService);
    }
    options = {
        dataset: {
            source: [
                { name: '无数据', value: 0 }
            ]
        },
        tooltip: {
            confine: true,
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            show: true
        },
        xAxis: [
            {
                type: 'value'
            }
        ],
        yAxis: [
            {
                type: 'category',
                axisTick: { show: false },
            }
        ],
        series: [
            {
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
            },
            {
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true
                    }
                },
            },
            {
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'left'
                    }
                },
            }
        ]
    };

    ngOnInit() {
    }

}
