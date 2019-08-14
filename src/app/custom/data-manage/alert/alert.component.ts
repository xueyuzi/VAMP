import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AlertService } from './alert.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { JsonEditorService } from "../../../common/json-editor.service";

@Component({
  selector: 'ngx-user',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {

  constructor(private alertService: AlertService,
    private jsonEditorService: JsonEditorService) { }

  cols: any[];
  isEdit: boolean = false;
  alert: any = {};
  type: string;
  alertList: Observable<any>;
  activeList: Array<any>;
  desen_rule_id: any = []
  ngOnInit() {
    this.alertService.getList().subscribe();
    this.alertList = this.alertService.alertList;
    this.cols = [
      { field: 'title', header: '标题' },
      { field: 'owner', header: '所有者' },
    ]
  }

  showNew() {
    this.alert = {};
    this.type = "add";
    this.isEdit = true;
    this.setEditor();
  }
  showEdit(alert) {
    this.type = "edit";
    this.alertService.getAgent(alert.id).subscribe(
      data => this.alert = data
    )
    this.isEdit = true;
    this.setEditor();
  }

  save() {
    if (this.type === "edit") {
      this.alertService.save(this.alert).subscribe(res => { this.isEdit = false; });
    }
    if (this.type === "add") {
      this.alertService.add(this.alert).subscribe(res => { this.isEdit = false; });
    }
  }

  del(alert) {
    this.alertService.del(alert.id).subscribe();
  }

  setEditor() {
    setTimeout(() => {
      this.jsonEditorService.createEditor("agent-json-editor");
      this.jsonEditorService.setValue(this.alert.trigger_es_json);
    }, 500)
  }
}
