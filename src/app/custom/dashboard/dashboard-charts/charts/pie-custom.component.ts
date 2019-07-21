import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';
@Component({
    selector: 'ngx-pie-custom',
    templateUrl: "base-charts.component.html",
})
export class PieCustomComponent extends BaseChartComponent implements OnInit {
    constructor() {
        super();
    }
    options = {
        dataset: {
            source: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' }]
        },
        tooltip: {
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
