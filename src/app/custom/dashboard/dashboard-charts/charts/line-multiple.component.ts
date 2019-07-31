import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';
import { ChartsService } from '../dashboard-charts.service';

@Component({
    selector: 'ngx-line-multiple',
    templateUrl: "base-charts.component.html",
})
export class LineMultipleComponent extends BaseChartComponent implements OnInit {
    constructor(protected chartsService:ChartsService) {
        super(chartsService);
    }
    options = {
        color: ['#5793f3', '#d14a61', '#675bba'],
        dataset: {
            source: [
                { name: '无数据', value: 0 }
            ]
        },
        tooltip: {
            confine:true,
            trigger: 'axis',
        },
        legend: {
            show: true
        },
        grid: {
            top: 70,
            bottom: 50
        },
        xAxis: [
            {
                type: 'category',
            },
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
            }
        ],
        yAxis:
        {
            type: 'value'
        },
        series: [
            {
                type: 'line',
                xAxisIndex: 1,
                smooth: true,
            },
            {
                type: 'line',
                smooth: true,
            }
        ]
    };


    ngOnInit() {
    }
}
