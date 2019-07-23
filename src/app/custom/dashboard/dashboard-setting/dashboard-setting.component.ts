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
  ngOnInit() {
    this.dashboardSettingService.show$.subscribe(
      flag => this.isShow = flag
    )

  }
  onShow() {
    this.dashboardSettingService.getData().subscribe(
      data => this.chartSetting = data
    )
  }
  onHide() {
    this.dashboardSettingService.toggle(false);
  }
  save() {
    this.dashboardSettingService.save(this.chartSetting).subscribe(res => {
      this.toastrService.danger("保存成功");
      this.dashboardSettingService.toggle(false);
    });
  }
}
