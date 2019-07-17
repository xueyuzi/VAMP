import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ngx-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.scss']
})
export class ChartListComponent implements OnInit {
  list = [
    { label: "饼图", key: "pie" },
    { label: "直方图", key: "bar" },
    { label: "折线图", key: "line" },
    { label: "雷达图", key: "radar" },
  ]
  constructor() { }
  @Input() selected: string;
  @Output() onSelectChart = new EventEmitter();
  ngOnInit() {
  }
  onSelect(key) {
    this.onSelectChart.emit(key);
  }

}
