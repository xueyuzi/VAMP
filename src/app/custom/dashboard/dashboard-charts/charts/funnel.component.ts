import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';
import { ChartsService } from '../dashboard-charts.service';

@Component({
    selector: 'ngx-funnel',
    templateUrl:"base-charts.component.html",
})
export class FunnelComponent extends BaseChartComponent implements OnInit {
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
            confine:true,
            trigger: 'item',
            formatter: v => v.percent + "%"
        },
        legend: {
            show: true
        },
        calculable: true,
        series: [
            {
                name: '漏斗图',
                type: 'funnel',
                left: '10%',
                top: 60,
                bottom: 60,
                width: '80%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    show: true,
                    position: 'inside'
                },
                labelLine: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 20
                    }
                }
            }
        ]
    };
    ngOnInit() {
    }
}