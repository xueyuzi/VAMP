import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-charts-setting',
  template: `
  <div>
  <nb-tabset>
    <nb-tab tabTitle="数据设置" style="width:400px;height:300px">
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
