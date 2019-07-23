import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';
import { ChartsService } from '../dashboard-charts.service';
import * as echarts from 'echarts';

@Component({
    selector: 'ngx-map',
    templateUrl: "base-charts.component.html",
})
export class MapComponent extends BaseChartComponent implements OnInit {
    constructor(protected chartsService:ChartsService) {
        super(chartsService);
    }

    ngOnInit() {
        this.chartsService.getMapData().subscribe(geoJson => {
            echarts.registerMap('world', geoJson);
            console.log(echarts);
            this.options = {
                series: [
                    {
                        type: 'map',
                        mapType: 'world', // map type should be registered
                    }
                ]
            };
            console.log(this.options)
        })
    }
}
