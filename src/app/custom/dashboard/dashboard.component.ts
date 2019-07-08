import { Component, OnInit } from '@angular/core';
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
    private route: ActivatedRoute) { }
  id: string;
  options: GridStackOptions = new GridStackOptions();
  containers: Array<any> = [];
  charts: Array<any> = [];
  isEdit: boolean;
  isNew: boolean;
  ngOnInit() {
    let that = this
    this.dashboardService.containersSource.subscribe(containers => this.containers = containers);
    this.route.paramMap.subscribe((params: ParamMap) => {
      that.id = params.get("id");
      that.dashboardService.getContainers(that.id).subscribe();
    });
    this.dashboardService.isEdit.subscribe(
      flag => this.isEdit = flag
    )
  }

  switchEdit() {
    this.dashboardService.switchEdit(!this.isEdit);
  }

  showNew() {
    this.isNew = true;
    this.dashboardService.getCharts().subscribe(
      charts => this.charts = charts
    )
  }

  saveContainers() {
    this.dashboardService.saveContainers(this.id).subscribe()
  }
}
