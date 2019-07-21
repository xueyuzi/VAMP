import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { PieComponent } from "../dashboard-charts/charts/pie.component";
import { BarComponent } from "../dashboard-charts/charts/bar.component";
import { LineComponent } from "../dashboard-charts/charts/line.component";
import { NbPopoverDirective } from '@nebular/theme';
import { RadarComponent } from '../dashboard-charts/charts/radar.component';
import { DashboardService } from '../dashboard.service';
import { BaseChartComponent } from '../dashboard-charts/charts/base-charts.component';
import { BehaviorSubject } from 'rxjs';
import chartListData from "../dashboard-charts/chart-list/chart-list.data";
@Component({
  selector: 'ngx-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {
  @Input() item: any;
  @ViewChild('chart', { read: ViewContainerRef }) chart;
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private dashboardService: DashboardService,
  ) { }

  componentRef;
  isEdit: BehaviorSubject<boolean>;
  title: string;
  isLoading: boolean = true;
  isSetting: boolean = false;
  ngOnInit() {
    this.loadChart(this.item.panelData.type);
    this.isEdit = this.dashboardService.isEdit;
  }

  delContainer() {
    this.dashboardService.delContainer(this.item);
  }
  changeChart(name) {
    this.loadChart(name);
    this.item.panelData.type = name;
    this.popover.hide();
  }
  loadChart(name: string) {
    this.loadComponent(chartListData[name].component);
  }

  loadComponent(component) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.chart.clear();
    this.componentRef = this.chart.createComponent(componentFactory);
    this.dashboardService.getChartData(this.item.customId).subscribe(res => {
      this.isLoading = false;
      if (Object.keys(res).length == 0) return;

      (<BaseChartComponent>this.componentRef.instance).setData(res);
      this.title = res.title;
    });
  }

  // 不用了
  openSetting() {
    this.dashboardService.settingKey = this.item.customId;
  }
}
