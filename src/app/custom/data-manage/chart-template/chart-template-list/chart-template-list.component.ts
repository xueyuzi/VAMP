import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ChartTemplateService } from '../chart-template.service';
import { CATEGORY_A } from "../../categorya.mock";
@Component({
  selector: 'ngx-chart-template-list',
  templateUrl: './chart-template-list.component.html',
  styleUrls: ["./chart-template-list.component.scss"]
})
export class ChartTemplateListComponent implements OnInit {
  @Output() onSelectChart = new EventEmitter<any>();
  @Output() onAddChart = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter();
  @Input() charts: Array<any>;
  @Input() isEdit: boolean = false;
  category_a_items: any = CATEGORY_A;
  category_a: string = "FireWall-ASA";
  constructor(
    private chartTemplateService: ChartTemplateService
  ) { }

  ngOnInit() {
    this.chartTemplateService.getTemplateCateGoryList().subscribe(res=>{
      let keys=Object.keys(res)
      this.category_a_items = keys;
      this.category_a = keys[0]
    });
  }
  selectedA(category_a) {
    this.category_a = category_a
  }

}
