import { Output, EventEmitter, OnInit } from '@angular/core';
import { ChartsService } from '../dashboard-charts.service.js';

export class BaseChartComponent {
    theme: string;
    mapLoaded: boolean = false;
    options: any;
    container:any;
    constructor(
        protected chartsService: ChartsService
    ) {
        this.chartsService.themeSource.subscribe(
            theme => { this.theme = theme; console.log('echarts-theme', theme); }
        )
    }
    setData(data: any) {
        if(data.source === undefined){
            return;
        }
        console.log("setData", data)
        data.source = Object.assign([], data.source.map(val => {
            let array = []
            Object.keys(val).forEach(
                key => {
                    if (isNaN(Number(val[key]))) {
                        // 字符串
                        array[0] = val[key]
                    } else {
                        if (key !== "key") {
                            array[1] = val[key]
                        }
                    }
                }
            )
            return array
        }))
        this.options.dataset = data;
        this.options = Object.assign({}, this.options)
        console.log("echarts options", this.options)
    }
    setContainer(container){
        this.container = container;
        console.log(this.container);
    }
}
