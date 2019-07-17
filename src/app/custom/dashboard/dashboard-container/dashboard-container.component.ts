import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { PieComponent } from "../charts/pie.component";
import { BarComponent } from "../charts/bar.component";
import { LineComponent } from "../charts/line.component";
import { NbPopoverDirective } from '@nebular/theme';
import { RadarComponent } from '../charts/radar.component';
import { DashboardService } from '../dashboard.service';
import { BaseChartComponent } from '../charts/base-charts.component';
import { BehaviorSubject } from 'rxjs';
import chartListData from "../charts/chartListData";
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
  title:string;
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
      // (<BaseChartComponent>this.componentRef.instance).setData(res);
      (<BaseChartComponent>this.componentRef.instance).setData(res);
      this.title = res.title;
    });
  }

  openSetting() {
    this.dashboardService.settingKey = this.item.customId;
  }
}
