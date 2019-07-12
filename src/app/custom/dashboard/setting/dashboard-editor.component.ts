import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
declare var ace: any;
@Component({
  selector: 'ngx-dashboard-editor',
  template: `
  <div id="editor" style="height:70vh;max-width:80vw; margin:10px 0"></div>
  <button nbButton (click)="save()"> 保存 </button>
`
})
export class DashboardEditorComponent implements OnInit, AfterViewInit {
  editor: any;
  id: number;
  constructor(private dashboardService: DashboardService,
    private route: ActivatedRoute) { }
  ngOnInit() {

  }
  ngAfterViewInit() {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/monokai");
    this.editor.session.setMode("ace/mode/json");
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get("id"));
      this.dashboardService.getContainers(this.id).subscribe(data => {
        this.editor.setValue(JSON.stringify(data, null, 2))
      })
    });
  }

  save() {
    let containers = this.editor.getValue()
    this.dashboardService.saveDashboard(this.id, containers).subscribe();
  }



}
