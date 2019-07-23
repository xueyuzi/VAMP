import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import chartListData from "./chart-list.data";
@Component({
  selector: 'ngx-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.scss']
})
export class ChartListComponent implements OnInit {
  list: Array<any> = [];
  constructor() { }
  @Input() selected: string;
  @Output() onSelectChart = new EventEmitter();
  ngOnInit() {
    this.list = Object.keys(chartListData).map(key => chartListData[key])
  }
  onSelect(key) {
    this.onSelectChart.emit(key);
  }

}
