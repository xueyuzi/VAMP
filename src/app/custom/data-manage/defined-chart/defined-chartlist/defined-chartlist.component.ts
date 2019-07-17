import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Output() onDelete = new EventEmitter();
  @Input() charts: Array<any>;
  @Input() isEdit: boolean = false;
  category_a_items: any = CATEGORY_A;
  category_a: string = "FireWall-ASA";
  constructor(
    private definedChartService: DefinedChartService
  ) { }

  ngOnInit() {

  }
  selectedA(category_a) {
    this.category_a = category_a
  }

}
