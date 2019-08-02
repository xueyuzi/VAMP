import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GridStackOptions, GridStackComponent } from 'ngx-grid-stack';
import { MenuService } from '../../system-manage/menu/menu.service';
import { ChartTemplateService } from '../../data-manage/chart-template/chart-template.service';

@Component({
  selector: 'ngx-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {

  constructor(private dashboardService: DashboardService,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private chartTemplateService: ChartTemplateService
  ) { }
  @ViewChild('gridstack', { static: false }) gridstack: GridStackComponent;
  title: string;
  id: number;
  options: GridStackOptions;
  containers: Array<any> = [];
  isEdit: boolean;
  isNew: boolean;
  isEditor: string;
  charts: Array<any> = [];
  ngOnInit() {
    this.options = new GridStackOptions();
    this.isEdit = false;
    this.dashboardService.containersSource.subscribe(containers => {
      this.containers = []
      setTimeout(() => { this.containers = containers })
    });
    this.chartTemplateService.getCharts().subscribe(
      charts => this.charts = charts
    )
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get("id"));
      this.dashboardService.getContainers(this.id).subscribe(
        () => {
          this.switchGrid(false);
        }
      );
    });
  }

  switchEdit() {
    this.isEdit = !this.isEdit;
    this.switchGrid(this.isEdit);
    this.dashboardService.switchEdit(this.isEdit);
  }
  switchGrid(flag: boolean) {
    setTimeout(() => {
      flag ? this.gridstack.grid.enable() : this.gridstack.grid.disable()
    }, 300);
  }
  cancel() {
    this.switchEdit();
    this.dashboardService.getContainers(this.id).subscribe();
  }

  showNew() {
    this.isNew = true;
  }

  addContainer(chartId: number) {
    this.dashboardService.addContainer(chartId).subscribe(res => {
      this.isNew = false;
    });
  }

  saveDashboard() {
    this.dashboardService.saveDashboard(this.id).subscribe(res => this.switchEdit())
  }

}
