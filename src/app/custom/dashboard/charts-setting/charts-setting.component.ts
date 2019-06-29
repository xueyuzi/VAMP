import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'selenium-webdriver';

@Component({
  selector: 'ngx-charts-setting',
  template: `
  <div>
  <nb-tabset>
    <nb-tab tabTitle="样式设置">
      <ngx-charts-style-setting></ngx-charts-style-setting>
    </nb-tab>
    <nb-tab tabTitle="数据设置">
    </nb-tab>
  </nb-tabset>
</div>
  `
})
export class ChartsSettingComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
