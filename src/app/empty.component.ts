import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './custom/dashboard/charts/base-charts.component';

@Component({
  selector: 'ngx-empty',
  template: `
<div style="font-size:50px;height:500px;width:500px;display:flex;justify-content: center;align-items: center;">{{options.dataset.source.value}}</div>
  `
})
export class EmptyComponent extends BaseChartComponent implements OnInit {
  options = {
    dataset: {
      source: {
        value: "2019-02-01 1000"
      }
    }
  }
  constructor() {
    super();
  }


  ngOnInit(): void {
  }
}
