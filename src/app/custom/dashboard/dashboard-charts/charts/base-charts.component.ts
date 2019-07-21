import { Output, EventEmitter } from '@angular/core';
import "../echarts-theme/walden.js";
export class BaseChartComponent {
    theme: string = "walden";
    mapLoaded: boolean = false;
    options: any;
    setData(data: any) {
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
}
