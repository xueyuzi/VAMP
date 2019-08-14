import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EtlTypeConfigService } from './etlTypeConfig.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { EtltypeService } from '../etltype/etltype.service';
import { JsonEditorService } from "../../../common/json-editor.service";

@Component({
  selector: 'ngx-user',
  templateUrl: './etlTypeConfig.component.html'
})
export class EtlTypeConfigComponent implements OnInit {

  constructor(private etlTypeConfigService: EtlTypeConfigService,
    private etlTypeService: EtltypeService,
    private jsonEditorService: JsonEditorService) { }
  isEdit: boolean = false;
  etlTypeConfig: any = {};
  etlTypeList: Observable<any>;
  etlTypeConfigList:Observable<any>;
  cols: any[];
  type: string;
  desen_rule_id: any = []
  ngOnInit() {
    this.cols = [
      { field: 'etlType', header: '日志类型' },
      { field: 'formatRegex', header: '匹配规则' },
      { field: 'mappingFields', header: '属性映射' },
      { field: 'order', header: '排序' }
    ]
    this.etlTypeConfigService.getList().subscribe();
    this.etlTypeService.getList().subscribe();
    this.etlTypeConfigList = this.etlTypeConfigService.etlConfigList;
    this.etlTypeList = this.etlTypeService.etlTypeList;
  }

  showNew() {
    this.type = "add";
    this.etlTypeConfig = { desen_rule_id: [] };
    this.isEdit = true;
    this.setEditor();
  }
  showEdit(etlTypeConfig) {
    this.type = "edit";
    this.etlTypeConfigService.getAgent(etlTypeConfig.id).subscribe(
      data => this.etlTypeConfig = data
    )
    this.isEdit = true;
    this.setEditor();
  }

  save() {
    this.etlTypeConfig.mappingFields = this.jsonEditorService.getValue();
    if (this.type === "edit") {
      this.etlTypeConfigService.save(this.etlTypeConfig).subscribe(res => { this.isEdit = false;  });
    }
    if (this.type === "add") {
      this.etlTypeConfigService.add(this.etlTypeConfig).subscribe(res => { this.isEdit = false; });

    }
  }

  del(etlTypeConfig) {
    this.etlTypeConfigService.del(etlTypeConfig.id).subscribe();
  }

  changeActive(event) {
    this.etlTypeConfig.listId = event;
  }

  setEditor() {
    setTimeout(() => {
      this.jsonEditorService.createEditor("agent-json-editor");
      this.jsonEditorService.setValue(this.etlTypeConfig.mappingFields);
    }, 500)
  }
}
