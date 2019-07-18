import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';
import { ChartsService } from './charts.service';
import * as echarts from 'echarts';

@Component({
    selector: 'ngx-map',
    templateUrl: "base-charts.component.html",
})
export class MapComponent extends BaseChartComponent implements OnInit {
    constructor(
        private chartsService: ChartsService
    ) {
        super();
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
