import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'ngx-charts-style-setting',
  templateUrl: './charts-style-setting.component.html',
  styleUrls: ['./charts-style-setting.component.scss']
})
export class ChartsStyleSettingComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    // 读取配置
    let that = this;
    this.dashboardService.containersSource.subscribe(containers => {
      let settingKey = that.dashboardService.settingKey;
      let index = containers.findIndex(v=>v.customId === settingKey);
      if(containers[index] === undefined){
        return;
      }
      let setting = containers[index].panelData.chartStyle
      if (setting) {
        this.form = setting;
      }
    })
  }
  form: any;

  save() {
    this.dashboardService.updateChartStyle(this.form)
  }

}
