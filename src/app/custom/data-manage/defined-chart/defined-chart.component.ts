import { Component, OnInit } from '@angular/core';
import { CATEGORY_A } from "../categorya.mock";
import { DefinedChartService } from './defined-chart.service';
import { ConfirmationService } from 'primeng/api';
declare var ace: any;

@Component({
  selector: 'ngx-defined-chart',
  templateUrl: './defined-chart.component.html',
  styleUrls: ['./defined-chart.component.scss']
})
export class DefinedChartComponent implements OnInit {
  isEdit: boolean = false;
  defaultChart: any = {};
  category_a_items: Array<String> = CATEGORY_A;
  editor: any;
  charts: Array<any> = [];
  type: string;
  constructor(
    private definedChartService: DefinedChartService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.getTemplate();
  }

  getTemplate() {
    this.definedChartService.getCharts().subscribe(
      charts => {
        this.charts = charts
      }
    )
  }
  setEditor() {
    setTimeout(() => {
      this.editor = ace.edit("editor");
      this.editor.setTheme("ace/theme/monokai");
      this.editor.session.setMode("ace/mode/json");
      this.editor.setValue(JSON.stringify(this.defaultChart.esjson, null, 2))
    }, 50)


  }
  editDefinedChart(event) {
    this.definedChartService.getChart(event.id).subscribe(res => {
      this.type = "edit";
      this.defaultChart = res;
      this.setEditor()
      this.isEdit = true;
      console.log(res)
    })
  }
  delDefinedChart(id) { }
  addDefinedChart() {
    this.defaultChart = {}
    this.type = "add";
    this.setEditor()
    this.isEdit = true;
  }
  setChartImg(event) {
    this.defaultChart.chart_img = event.originalEvent.body.src;
    console.log(event);
  }
  changeChart(type) {
    this.defaultChart.default_chart_type = type;
  }
  handleClick() {
    this.defaultChart.esjson = this.editor.getValue()
    if (this.type === "edit") {
      this.save();
    } else {
      this.add();
    }

  }

  del(chart) {
    this.confirmationService.confirm({
      message: '你确定要删除此模板么？',
      accept: () => {
        this.definedChartService.delChart(chart.id).subscribe(res => {
          this.getTemplate
        });
      }
    });

  }

  add() {
    this.definedChartService.addCharts(this.defaultChart).subscribe(res => {
      this.isEdit = false
      this.getTemplate();
    })
  }
  save() {
    this.defaultChart.esjson = this.editor.getValue()
    this.definedChartService.saveCharts(this.defaultChart.id, this.defaultChart).subscribe(res => {
      this.isEdit = false
      this.getTemplate();
    })
  }

}
