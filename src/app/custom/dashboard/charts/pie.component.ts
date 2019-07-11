import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { BaseChartComponent } from './base.charts.component';

@Component({
    selector: 'ngx-pie',
    template: `<div (chartClick)="onChartClick($event)" echarts [options]="options" style="height:100%;width:100%"></div>`
})
export class PieComponent implements OnInit, BaseChartComponent {
    updateOptions(options) {
        this.options = Object.assign({}, this.options, options);
        console.log(this.options);
        // 钻去配置
    }
    constructor() { }
    options = {
        dataset:{
            source:[
                {ip:"192.168.10.71",count:"171"},
                {ip:"192.168.10.203",count:"168"},
                {ip:"192.168.30.31",count:"31"},
                {ip:"192.168.13.229",count:"13"},
            ]
        },
        tooltip: {
            trigger: 'item',
            formatter: v=>{
                console.log(v);
                let data = v.data
                let percent = v.percent
                return `ip:${data.ip}<br/>value:${data.count}<br/>percent:${percent}%`
            }
        },
        series: [
            {
                name: '访问来源',
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
        ]
    };
    onChartClick(param){
        let url = '/#/custom'+param.data.url;
        window.location.href = url;
    }
    ngOnInit() {
    }

}
