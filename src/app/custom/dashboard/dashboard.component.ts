import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { GridStackOptions } from 'ngx-grid-stack';
import { DashboardService } from './dashboard.service';
import { Route, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private zone: NgZone
  ) { }
  id: string;
  options: GridStackOptions;
  containers: Array<any> = [];
  charts: Array<any> = [];
  isEdit: boolean;
  isNew: boolean;
  ngOnInit() {
    this.options = new GridStackOptions();
    this.dashboardService.containersSource.subscribe(containers => {
      this.containers = []
      setTimeout(() => { this.containers = containers })
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get("id");
      this.dashboardService.getContainers(this.id).subscribe();
    });
    this.dashboardService.isEdit.subscribe(
      flag => this.isEdit = flag
    )
  }

  switchEdit() {
    this.isEdit = !this.isEdit;
    this.dashboardService.switchEdit(this.isEdit);
  }
  cancel() {
    this.switchEdit();
    this.dashboardService.getContainers(this.id).subscribe();
  }

  showNew() {
    this.isNew = true;
    this.dashboardService.getCharts().subscribe(
      charts => this.charts = charts
    )
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
