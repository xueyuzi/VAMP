import { Component, OnInit, Output, EventEmitter, ViewContainerRef, ViewChild, ElementRef, OnChanges, AfterViewChecked, AfterContentInit, AfterContentChecked, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseChartComponent } from './base.charts.component';
import { DashboardService } from '../dashboard.service';
import { ChartsService } from './charts.service';
@Component({
  selector: 'ngx-bar',
  template: `
  <div echarts  [options]="options" style="height:100%;width:100%"></div>
  <div #chartConfig (mousedown)="$event.stopPropagation();"  style="position: absolute;top: 80px;right: 0px;"></div>
  `
})
export class BarComponent extends BaseChartComponent implements OnInit, AfterContentChecked, AfterViewInit {
  @ViewChild("chartConfig") chartConfig: ElementRef;

  config: any = {
    barWidth: 20,
    barCategoryGap: 20,
  };
  options: any = {
    color: ["red"],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      show: false,
      textStyle: {}
    },
    xAxis:
    {
      show: true,
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        show: true,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 12,
        rotate: 0,
      }
    },
    yAxis:
    {
      show: true,
      type: 'value',
      axisLabel: {
        show: true,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 12,
        rotate: 0,
      }
    }
    ,
    series: [
      {
        type: 'bar',
        barWidth: '60%',
        label: {
          show: true,
          rotate: 0,
          align: "center",
          verticalAlign: "middle",
          position: "insideBottom",
          distance: 15,
          color: "white"
        }
      }
    ]
  };
  gui: any;
  constructor(
    private dashboardService: DashboardService,
    private chartsService: ChartsService
  ) {
    super();
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.gui = this.chartsService.generateCommonGUI(this.options);
    const barStyle = this.gui.addFolder("直方图设置");

    barStyle.add(this.config, "barWidth", 0, 100).onChange(v => {
      this.options.series[0].barWidth = v;
      this.options = Object.assign({}, this.options);
    });
    this.gui.close();
    this.chartConfig.nativeElement.appendChild(this.gui.domElement);

    this.dashboardService.isEdit.subscribe(
      bool => bool ? this.gui.show() : this.gui.hide()
    )
  }
  ngAfterContentChecked() {
    console.log(this.options);
  }
}
