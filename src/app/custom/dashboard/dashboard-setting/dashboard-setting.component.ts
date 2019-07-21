import { Component, OnInit } from '@angular/core';
import { DashboardSettingService } from './dashboard-setting.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-dashboard-setting',
  templateUrl: './dashboard-setting.component.html',
  styleUrls: ['./dashboard-setting.component.scss']
})
export class DashboardSettingComponent implements OnInit {

  constructor(
    private dashboardSettingService: DashboardSettingService
  ) { }
  isShow: boolean;
  ngOnInit() {
    this.dashboardSettingService.isShow().subscribe(
      flag => this.isShow = flag
    )
  }
  onHide() {
    this.dashboardSettingService.toggle(false);
  }

}
