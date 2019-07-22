import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';

@Component({
    selector: 'ngx-bar-negative',
    template: `<div echarts [options]="options" style="height:100%;width:100%"></div>`
})
export class BarHorizontalComponent extends BaseChartComponent implements OnInit {
    constructor() {
        super();
    }
    options = {
        dataset: {
            source: [
                { name: '直接访问', value: 335 },
                { name: '邮件营销', value: 310 },
                { name: '联盟广告', value: 234 },
                { name: '视频广告', value: 135 },
                { name: '搜索引擎', value: 1548 }
            ]
        },
        xAxis: { name: 'value' },
        yAxis: { type: 'category' },
        series: [
            {
                type: 'bar',
            }
        ]
    };


    ngOnInit() {
    }

}
