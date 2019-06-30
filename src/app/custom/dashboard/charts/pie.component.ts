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
        if (options.special !== null) {
            options.special.jumpUrl.forEach((v,i)=>{
                this.options.series[0].data[i].url = v;
            })
        }
    }
    constructor() { }
    options = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '磁盘', url:""},
                    { value: 310, name: 'CPU' ,url:""},
                    { value: 234, name: '内存' ,url:""},
                    { value: 135, name: '日志' ,url:""},
                ],
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
