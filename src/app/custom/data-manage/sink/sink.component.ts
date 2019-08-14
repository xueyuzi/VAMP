import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SinkService } from './sink.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {JsonEditorService} from "../../../common/json-editor.service";

@Component({
  selector: 'ngx-user',
  templateUrl: './sink.component.html'
})
export class SinkComponent implements OnInit {

  constructor(private sinkService: SinkService,
              private jsonEditorService: JsonEditorService) { }

  cols:any[];
  isEdit: boolean = false;
  sink: any = {};
  type: string;
  sinkList: Observable<any>;
  ngOnInit() {
    this.cols = [
      { field: 'name', header: '名称' },
      { field: 'type_name', header: '类型' },
      { field: 'content', header: 'JSON配置内容' },
      { field: 'format_type', header: '格式类型' },
    ]
    this.sinkService.getList().subscribe();
    this.sinkList =this.sinkService.sinkList;
  }
  showNew() {
    this.type = "add";
    this.sink = {};
    this.isEdit = true;
    this.setEditor();
  }
  showEdit(sink) {
    this.type = "edit";
    this.sink = sink;
    this.isEdit = true;
    this.setEditor();
  }

  save() {
    this.sink.content = this.jsonEditorService.getValue()
    if (this.type === "edit") {
      this.sinkService.save(this.sink).subscribe(res => { this.isEdit=false;});
    }
    if (this.type === "add") {
      this.sinkService.add(this.sink).subscribe(res => { this.isEdit=false;});

    }
  }

  del(sink) {
    this.sinkService.del(sink.id).subscribe();
  }

  setEditor() {
    setTimeout(() => {
      this.jsonEditorService.createEditor("agent-json-editor");
      this.jsonEditorService.setValue(this.sink.content);
    }, 50)
  }
}
