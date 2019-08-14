import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DesenRuleService } from './desenRule.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { JsonEditorService } from "../../../common/json-editor.service";

@Component({
  selector: 'ngx-user',
  templateUrl: './desenRule.component.html'
})
export class DesenRuleComponent implements OnInit {

  constructor(private desenRuleService: DesenRuleService,
    private jsonEditorService: JsonEditorService) { }
  isEdit: boolean = false;
  cols: any[];
  desenRule: any = {};
  type: string;
  desenRuleList: Observable<any>;
  rule_json: any = {};
  ngOnInit() {
    this.cols = [
      { field: 'desenName', header: '规则名称' },
      { field: 'type_name', header: '类型' },
      { field: 'patternRegex', header: '匹配规则' },
      { field: 'desenConfig', header: '脱敏规则配置' },
      { field: 'description', header: '规则描述' },
    ]
    this.desenRuleService.getList().subscribe();
    this.desenRuleList = this.desenRuleService.desenRuleList;
  }

  showNew() {
    this.type = "add";
    this.desenRule = {};
    this.isEdit = true;
    this.rule_json.method = "";
    this.rule_json.flag = "";
    this.rule_json.begin = "";
    this.rule_json.left = "";
    this.rule_json.right = "";
  }
  showEdit(dese) {
    this.type = "edit";
    this.desenRule = dese;
    this.isEdit = true;
    this.rule_json = JSON.parse(this.desenRule.desenConfig);
  }

  save() {
    this.desenRule.desenConfig = JSON.stringify(this.rule_json);
    if (this.type === "edit") {
      this.desenRuleService.save(this.desenRule).subscribe(res => { this.isEdit = false;});
    }
    if (this.type === "add") {
      this.desenRuleService.add(this.desenRule).subscribe(res => { this.isEdit = false;});

    }
  }

  del(desenRule) {
    this.desenRuleService.del(desenRule.id).subscribe();
  }
}
