import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { DashboardContainerModel } from "../../../model/dashboard-container.model";
import { PieComponent } from "../charts/pie.component";
import { BarComponent } from "../charts/bar.component";
import { LineComponent } from "../charts/line.component";
import { NbPopoverDirective } from '@nebular/theme';
import { RadarComponent } from '../charts/radar.component';
import { DashboardService } from '../dashboard.service';
import { ChartsSettingService } from '../charts-setting/charts-setting.service';

@Component({
  selector: 'ngx-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {
  @Input() item: any;
  @Input() key: string;
  @ViewChild('chart', { read: ViewContainerRef }) chart;
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private dashboardService: DashboardService,
    private settingService: ChartsSettingService,
  ) { }
  ngOnInit() {
    this.loadChart(this.item.panelData.type);
  }

  delContainer() {
    this.dashboardService.delContainer(this.key);
  }
  changeChart(name) {
    this.loadChart(name);
    this.item.panelData.type = name;
    this.popover.hide();
  }
  loadChart(name) {
    switch (name) {
      case 'pie':
        this.loadComponent(PieComponent);
        break;
      case 'line':
        this.loadComponent(LineComponent);
        break;
      case 'bar':
        this.loadComponent(BarComponent);
        break;
      case 'radar':
        this.loadComponent(RadarComponent);
        break;
    }
  }

  loadComponent(component) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.chart.clear();
    this.chart.createComponent(componentFactory);
  }

  changeSetting(setting) {
  }
}
