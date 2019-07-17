import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { BaseChartComponent } from './base.charts.component';

@Component({
    selector: 'ngx-pie',
    template: `<div (chartClick)="onChartClick($event)" echarts [options]="options" style="height:100%;width:100%"></div>`
})
export class PieComponent extends BaseChartComponent implements OnInit {
    constructor() { super(); }
    options = {
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ],
        tooltip: {
            trigger: 'item',
        },
    };
    onChartClick(param){
        let url = '/#/custom'+param.data.url;
        window.location.href = url;
    }
    ngOnInit() {
    }

}
