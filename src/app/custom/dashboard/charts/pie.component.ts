import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'ngx-pie',
  template:`<div echarts [options]="options" style="height:100%;width:100%"></div>`
})
export class PieComponent implements OnInit {

  constructor() { }
  options = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'磁盘'},
                {value:310, name:'CPU'},
                {value:234, name:'内存'},
                {value:135, name:'日志'},
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

  ngOnInit() {
  }

}
