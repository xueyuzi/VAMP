import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DefinedChartService } from '../defined-chart.service';
import { NbMenuItem } from '@nebular/theme';
import { MenuItem } from 'primeng/components/common/menuitem';
import { CATEGORY_A } from "../../categorya.mock";
@Component({
  selector: 'ngx-defined-chartlist',
  templateUrl: './defined-chartlist.component.html',
  styleUrls: ["./defined-chartlist.component.scss"]
})
export class DefinedChartlistComponent implements OnInit {
  @Output() onSelectChart = new EventEmitter<any>();
  @Output() onAddChart = new EventEmitter<any>();
  charts: Array<any> = [];
  category_a_items: any = CATEGORY_A;
  category_a: string = "FireWall-ASA";
  constructor(
    private definedChartService: DefinedChartService
  ) { }

  ngOnInit() {
    this.definedChartService.getCharts().subscribe(
      charts => {
        this.charts = charts
      }
    )
  }
  selectedA(category_a) {
    this.category_a = category_a
  }

}
