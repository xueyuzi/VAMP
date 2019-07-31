import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';
import { ChartsService } from '../dashboard-charts.service';

@Component({
    selector: 'ngx-bar-negative',
    templateUrl: "base-charts.component.html"
})
export class BarHorizontalComponent extends BaseChartComponent implements OnInit {
    constructor(protected chartsService:ChartsService) {
        super(chartsService);
    }
    options = {
        dataset: {
            source: [
                { name: '无数据', value: 0 }
            ]
        },
        grid:{
            left:100,
            top:10,
            bottom:20
        },
        tooltip: {
            confine:true,
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis: { type: 'value' },
        yAxis: { type: 'category', inverse: true },
        series: [
            {
                type: 'bar',
            }
        ]
    };


    ngOnInit() {
    }

}
