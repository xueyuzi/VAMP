import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';
import { ChartsService } from '../dashboard-charts.service';

@Component({
  selector: 'ngx-line',
  templateUrl: "base-charts.component.html",
})
export class LineComponent extends BaseChartComponent implements OnInit {
  constructor(protected chartsService: ChartsService) {
    super(chartsService);
  }
  options = {
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'line',
      smooth: true
    }]
  };

  ngOnInit() {
  }

}
