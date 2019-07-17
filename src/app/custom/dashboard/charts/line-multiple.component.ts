import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';

@Component({
    selector: 'ngx-line-multiple',
    templateUrl: "base-charts.component.html",
})
export class LineMultipleComponent extends BaseChartComponent implements OnInit {
    constructor() {
        super();
    }
    options = {
        color: ['#5793f3', '#d14a61', '#675bba'],
        dataset: {
            source: [
                { key: '2016-1', "2015降水量": 2.6, "2016降水量": 3.9 },
                { key: '2016-2', "2015降水量": 5.9, "2016降水量": 11.1 },
                { key: '2016-3', "2015降水量": 8.6, "2016降水量": 3.9 },
                { key: '2016-4', "2015降水量": 11.6, "2016降水量": 0.9 },
                { key: '2016-5', "2015降水量": 11.6, "2016降水量": 12.9 },
                { key: '2016-6', "2015降水量": 5.6, "2016降水量": 8.9 },
                { key: '2016-7', "2015降水量": 2.6, "2016降水量": 11.9 },
                { key: '2016-8', "2015降水量": 10.6, "2016降水量": 2.9 },
                { key: '2016-9', "2015降水量": 2.6, "2016降水量": 7.9 },
                { key: '2016-10', "2015降水量": 16, "2016降水量": 4.9 },
                { key: '2016-11', "2015降水量": 6.6, "2016降水量": 12.9 },
                { key: '2016-12', "2015降水量": 2.6, "2016降水量": 1.9 },
            ]
        },
        tooltip: {
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
