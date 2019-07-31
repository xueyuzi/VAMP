import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { JsonEditorService } from '../../common/json-editor.service';
declare var ace: any;
@Component({
  selector: 'ngx-dashboard-editor',
  template: `
  <div id="chart-editor" style="height:70vh;max-width:80vw; margin:10px 0"></div>
  <button nbButton (click)="save()"> 保存 </button>
`
})
export class DashboardEditorComponent implements OnInit, AfterViewInit {
  editor: any;
  id: number;
  constructor(private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private jsonEditorService: JsonEditorService) { }
  ngOnInit() {

  }
  ngAfterViewInit() {
    this.jsonEditorService.createEditor("chart-editor");
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get("id"));
      this.dashboardService.getContainers(this.id).subscribe(data => {
        this.jsonEditorService.setBeutefulValue(data);
      })
    });
  }

  save() {
    let containers = this.jsonEditorService.getValue();
    this.dashboardService.saveDashboard(this.id, containers).subscribe();
  }



}
