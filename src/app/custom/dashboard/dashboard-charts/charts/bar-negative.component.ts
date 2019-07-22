import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';

@Component({
    selector: 'ngx-bar-negative',
    templateUrl: "base-charts.component.html"
})
export class BarNegativeComponent extends BaseChartComponent implements OnInit {
    constructor() {
        super();
    }
    options = {
        dataset: {
            source: [
                { key: "周一", "利润": 200, "收入": 320, "支出": -120 },
                { key: "周二", "利润": 170, "收入": 302, "支出": -132 },
                { key: "周三", "利润": 240, "收入": 341, "支出": -101 },
                { key: "周四", "利润": 244, "收入": 374, "支出": -134 },
                { key: "周五", "利润": 200, "收入": 390, "支出": -190 },
                { key: "周六", "利润": 220, "收入": 450, "支出": -230 },
                { key: "周日", "利润": 210, "收入": 420, "支出": -210 },
            ]
        },
        tooltip: {
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
