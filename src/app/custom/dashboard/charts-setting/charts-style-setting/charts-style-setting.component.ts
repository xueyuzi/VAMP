import { Component, OnInit } from '@angular/core';
import { ChartsSettingService } from '../charts-setting.service';

@Component({
  selector: 'ngx-charts-style-setting',
  templateUrl: './charts-style-setting.component.html',
  styleUrls: ['./charts-style-setting.component.scss']
})
export class ChartsStyleSettingComponent implements OnInit {

  constructor(private settingService:ChartsSettingService) { }

  ngOnInit() {
    // 读取配置
    this.form = {}
  }
  form:any;

  save(){
    this.settingService.styleSetting.next(this.form)
  }

}
