import { Component, OnInit } from '@angular/core';
import { CATEGORY_A } from "../categorya.mock";
import { ChartTemplateService } from './chart-template.service';
import { ConfirmationService } from 'primeng/api';
import chartListData from "../../dashboard/charts/chartListData";
declare var ace: any;

@Component({
  selector: 'ngx-chart-template',
  templateUrl: './chart-template.component.html',
  styleUrls: ['./chart-template.component.scss']
})
export class DefinedChartComponent implements OnInit {
  isEdit: boolean = false;
  defaultChart: any = {};
  category_a_items: Array<String> = CATEGORY_A;
  editor: any;
  charts: Array<any> = [];
  type: string;
  constructor(
    private chartTemplateService: ChartTemplateService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.getTemplate();
  }

  getTemplate() {
    this.chartTemplateService.getCharts().subscribe(
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
      this.editor.setValue(this.defaultChart.esjson)
    }, 50)


  }
  editDefinedChart(event) {
    this.chartTemplateService.getChart(event.id).subscribe(res => {
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
    this.defaultChart.chart_img = chartListData[type].img;
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
        this.chartTemplateService.delChart(chart.id).subscribe(res => {
          this.getTemplate
        });
      }
    });

  }

  add() {
    this.chartTemplateService.addCharts(this.defaultChart).subscribe(res => {
      this.isEdit = false
      this.getTemplate();
    })
  }
  save() {
    this.chartTemplateService.saveCharts(this.defaultChart.id, this.defaultChart).subscribe(res => {
      this.isEdit = false
      this.getTemplate();
    })
  }

}
