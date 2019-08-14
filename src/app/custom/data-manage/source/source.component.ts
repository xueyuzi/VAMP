import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SourceService } from './source.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { JsonEditorService } from "../../../common/json-editor.service";

@Component({
  selector: 'ngx-user',
  templateUrl: './source.component.html'
})
export class SourceComponent implements OnInit {

  constructor(private sourceService: SourceService,
    private jsonEditorService: JsonEditorService) { }
  cols: any[];
  isEdit: boolean = false;
  source: any = {};
  type: string;
  sourceList: Observable<any>;
  ngOnInit() {
    this.cols = [
      { field: 'name', header: '名称' },
      { field: 'content', header: 'JSON配置内容' },
      { field: 'timeField', header: '时间属性' },
      { field: 'idField', header: '事件ID属性' },

    ]
    this.sourceService.getList().subscribe();
    this.sourceList = this.sourceService.sourceList;
  }
  showNew() {
    this.type = "add";
    this.source = {};
    this.isEdit = true;
    this.setEditor();
  }
  showEdit(source) {
    this.type = "edit";
    this.source = source;
    this.isEdit = true;
    this.setEditor();
  }

  save() {
    this.source.content = this.jsonEditorService.getValue();
    if (this.type === "edit") {
      this.sourceService.save(this.source).subscribe(res => { this.isEdit = false; });
    }
    if (this.type === "add") {
      this.sourceService.add(this.source).subscribe(res => { this.isEdit = false; });

    }
  }

  del($event) {
    this.sourceService.del($event.data.id).subscribe();
  }

  setEditor() {
    setTimeout(() => {
      this.jsonEditorService.createEditor("agent-json-editor");
      this.jsonEditorService.setValue(this.source.content);
    }, 50)
  }
}
