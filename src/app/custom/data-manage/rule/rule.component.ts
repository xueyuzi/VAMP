import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RuleService } from './rule.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { JsonEditorService } from '../../../common/json-editor.service';
import { SinkService } from "../sink/sink.service";
import { SourceService } from '../source/source.service';

@Component({
  selector: 'ngx-user',
  templateUrl: './rule.component.html'
})
export class RuleComponent implements OnInit {

  constructor(private ruleService: RuleService,
    private sinkService: SinkService,
    private sourceService: SourceService,
    private jsonEditorService: JsonEditorService) { }
  cols: any[];
  isEdit: boolean = false;
  rule: any = {};
  type: string;
  ruleList: Observable<any>;
  sinkList: Observable<any>;
  sourceList: Observable<any>;
  rule_sink_id: any = [];
  ngOnInit() {
    this.cols = [
      { field: 'type_name', header: '类型' },
      { field: 'ruleName', header: '规则名称' },
      { field: 'ruleNo', header: '规则编号' },
      { field: 'status', header: '状态' },
      { field: 'parallelism', header: '并发度' },
      { field: 'source_name', header: '数据源' },
      { field: 'ruleContent', header: '规则明细' }
    ]
    this.sinkService.getList().subscribe();
    this.ruleService.getList().subscribe();
    this.sourceService.getList().subscribe();
    this.sinkList = this.sinkService.sinkList
    this.ruleList = this.ruleService.ruleList
    this.sourceList = this.sourceService.sourceList;
  }
  showNew() {
    this.type = "add";
    this.rule = { rule_sink_id: [] };
    this.isEdit = true;
    this.setEditor();
  }
  showEdit(rule) {
    this.type = "edit";
    this.ruleService.getRule(rule.id).subscribe(
      data => this.rule = data
    )
    this.isEdit = true;
    this.setEditor();
  }

  save() {
    this.rule.ruleContent = this.jsonEditorService.getValue();
    if (this.type === "edit") {
      this.ruleService.save(this.rule).subscribe(res => {
        if (res.code == 0) { this.isEdit = false; }
      });
    }
    if (this.type === "add") {
      this.ruleService.add(this.rule).subscribe(res => {
        if (res.code == 0) { this.isEdit = false; }
      });

    }
  }

  del($event) {
    this.ruleService.del($event.data.id).subscribe();
  }

  setEditor() {
    setTimeout(() => {
      this.jsonEditorService.createEditor("agent-json-editor");
      this.jsonEditorService.setValue(this.rule.ruleContent);
    }, 500)
  }
}
