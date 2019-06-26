import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-line',
  template: `<div echarts [options]="options" style="height:100%;width:100%"></div>`
})
export class LineComponent implements OnInit {

  constructor() { }
  options = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }]
  };

  ngOnInit() {
  }

}
