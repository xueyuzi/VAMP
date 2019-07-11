import { Component, OnInit, Output, EventEmitter, ViewContainerRef, ViewChild, ElementRef, OnChanges, AfterViewChecked, AfterContentInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseChartComponent } from './base.charts.component';
import { DashboardService } from '../dashboard.service';
import { ChartsService } from './charts.service';
@Component({
  selector: 'ngx-bar',
  template: `
  <div echarts  [(options)]="options" style="height:100%;width:100%"></div>
  <div #chartConfig (mousedown)="$event.stopPropagation();"  style="position: absolute;top: 80px;right: 0px;"></div>
  `
})
export class BarComponent implements OnInit,AfterContentInit, BaseChartComponent {
  @ViewChild("chartConfig") chartConfig: ElementRef;
  ngAfterContentInit(){
    console.log("ngafter")
    this.dashboardService.isEdit.subscribe(
      bool => {
        console.log("gui show", bool)
        if (bool) {
          this.gui.show()
        } else {
          this.gui.hide()
        }
      }
    )
    const barStyle = this.gui.addFolder("直方图设置");

    barStyle.add(this.config, "barWidth", 0, 100).onChange(v => {
      this.options.series[0].barWidth = v;
      this.options = Object.assign({}, this.options);
    });
  }
  config: any = {
    barWidth: 20,
    barCategoryGap: 20,
  };
  rotationSpeed: any;
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
    dataset: {
      source: [
        ['Mon', 300,],
        ['Tur', 52,],
        ['Wed', 200,],
        ['Thu', 334,],
        ['Fri', 390,],
        ['Sat', 330,],
        ['Sun', 220,],
      ]
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
        name: '直接访问',
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
  constructor(private dashboardService: DashboardService,
    private chartsService: ChartsService) { }

  gui: any;
  ngOnInit() {
    this.gui = this.chartsService.generateCommonGUI(this.options);
    this.chartConfig.nativeElement.appendChild(this.gui.domElement);
  }
}
