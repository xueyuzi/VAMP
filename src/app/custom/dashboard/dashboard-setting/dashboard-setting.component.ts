import { Component, OnInit } from '@angular/core';
import { DashboardSettingService } from './dashboard-setting.service';
import { Observable } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard-setting',
  templateUrl: './dashboard-setting.component.html',
  styleUrls: ['./dashboard-setting.component.scss']
})
export class DashboardSettingComponent implements OnInit {

  constructor(
    private dashboardSettingService: DashboardSettingService,
    private toastrService: NbToastrService
  ) { }
  isShow: boolean;
  chartSetting: any;
  tag: string = 'data';
  container: any;
  ngOnInit() {
    this.dashboardSettingService.show$.subscribe(
      flag => this.isShow = flag
    )

  }
  onShow() {

    this.dashboardSettingService.getData().subscribe(
      data => {
        this.container = this.dashboardSettingService.container
        this.chartSetting = Object.assign(this.container.panelData.chartStyle,data);
      }
    )
  }
  onHide() {
    this.dashboardSettingService.toggle(false);
  }
  save() {
    this.dashboardSettingService.save(this.chartSetting).subscribe(res => {
      this.dashboardSettingService.toggle(false);
    });
  }
  changeAction(action) {
    this.tag = action;
  }
}
