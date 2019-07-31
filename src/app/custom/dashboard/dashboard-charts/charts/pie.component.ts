import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';
import { ChartsService } from '../dashboard-charts.service';

@Component({
    selector: 'ngx-pie',
    templateUrl: "base-charts.component.html",
})
export class PieComponent extends BaseChartComponent implements OnInit {
    constructor(protected chartsService:ChartsService) {
        super(chartsService);
    }
    options = {
        dataset: {
            source: [
                { name: '无数据', value: 0 }]
        },
        grid:{
            top:10
        },
        series: [
            {
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
            confine:true,
            trigger: 'item',
        },
    };
    onChartClick(param) {
        let url = '/#/custom' + param.data.url;
        window.location.href = url;
    }
    ngOnInit() {
    }

}
