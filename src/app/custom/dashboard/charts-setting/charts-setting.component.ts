import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-charts-setting',
  template: `
  <div>
  <nb-tabset>
    <nb-tab tabTitle="样式设置">
      <ngx-charts-style-setting></ngx-charts-style-setting>
    </nb-tab>
    <nb-tab tabTitle="数据设置">
    <button>hello</button>
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
