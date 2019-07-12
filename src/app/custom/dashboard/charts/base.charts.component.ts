import { Output, EventEmitter } from '@angular/core';

export class BaseChartComponent {
    options: any;
    setData(data:any) {
        console.log("setData",data)
        this.options.dataset = data;
    }
}
