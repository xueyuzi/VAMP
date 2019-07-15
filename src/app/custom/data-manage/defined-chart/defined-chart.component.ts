import { Component, OnInit } from '@angular/core';
import { CATEGORY_A } from "../categorya.mock";
@Component({
  selector: 'ngx-defined-chart',
  templateUrl: './defined-chart.component.html',
  styleUrls: ['./defined-chart.component.scss']
})
export class DefinedChartComponent implements OnInit {
  isEdit: boolean = false;
  defaultChart: any = {};
  category_a_items: Array<String> = CATEGORY_A;
  constructor() { }

  ngOnInit() {
  }
  editDefinedChart(event) {
    this.isEdit = true;
    console.log(event)
  }
  addDefinedChart(event) {
    this.isEdit = true;
    console.log(event)
  }
  setChartImg(event) {
    this.defaultChart.chart_img = event.text;
    console.log(event.text);
  }

}
