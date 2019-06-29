import { Component, OnInit } from '@angular/core';
import { ChartsSettingService } from '../charts-setting/charts-setting.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'ngx-bar',
  template: `<div echarts [options]="options" style="height:100%;width:100%"></div>`
})
export class BarComponent implements OnInit {

  constructor() { 
  }
  options = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220]
      }
    ]
  };

  ngOnInit() {
  }

}
