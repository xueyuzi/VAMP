import { Component, OnInit } from '@angular/core';
import { GridStackOptions } from 'ngx-grid-stack';
import { DashboardService } from './dashboard.service';
import { Route, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-dashboard',
  template: `
  <ngx-grid-stack class="grid-stack" [options]="options">
      <ngx-grid-stack-item [option]="item.option" class="grid-stack-item" *ngFor="let item of containers "
          id="widget-{{item.key}}">
          <ngx-dashboard-container [item]="item"></ngx-dashboard-container>
      </ngx-grid-stack-item>
  </ngx-grid-stack>`,
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService,
    private route: ActivatedRoute) { }
  options: GridStackOptions = new GridStackOptions();
  containers: Array<any> = [];
  ngOnInit() {
    this.dashboardService.containersSource.subscribe(containers => this.containers = containers);
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get("id");
      this.dashboardService.getContainers(id);
    });

  }
  addContainer = () => {
    this.dashboardService.addContainer();
  }

}
