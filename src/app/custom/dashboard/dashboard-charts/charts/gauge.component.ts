import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';
import { ChartsService } from '../dashboard-charts.service';

@Component({
    selector: 'ngx-gauge',
    templateUrl: "base-charts.component.html",
})
export class GaugeComponent extends BaseChartComponent implements OnInit {
    constructor(protected chartsService: ChartsService) {
        super(chartsService);
    }
    options = {
        dataset: {
            source: [
                { value: 50 }
            ]
        },
        series: [
            {
                type: 'gauge',
                detail: { formatter: '{value}%' }
            }
        ]
    };


    ngOnInit() {
    }
}
