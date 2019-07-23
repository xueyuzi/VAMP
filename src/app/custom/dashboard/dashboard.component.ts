import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { GridStackOptions } from 'ngx-grid-stack';
import { DashboardService } from './dashboard.service';
import { Route, ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-dashboard',
  template: `
  <div>
    <p-selectButton (onChange)="jump()" [options]="[{label: '视图', value: 'view'},{label: '数据', value: 'editor'}]" [(ngModel)]="isEditor"></p-selectButton>
  </div>
  <router-outlet></router-outlet>
  `
})
export class DashboardComponent implements OnInit {
  isEditor = "view"
  constructor(private router: Router, private dashboardService: DashboardService, ) {
  }

  ngOnInit() {
  }

  jump() {
    console.log("jump")
    let dashboardId = this.dashboardService.id;
    this.router.navigate(['/custom/dashboard/' + this.isEditor, dashboardId]);
  }
}
