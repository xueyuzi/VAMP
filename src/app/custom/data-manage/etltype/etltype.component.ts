import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EtltypeService } from './etltype.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { JsonEditorService } from "../../../common/json-editor.service";

@Component({
  selector: 'ngx-user',
  templateUrl: './etltype.component.html'
})
export class EtltypeComponent implements OnInit {

  constructor(private etlTypeService: EtltypeService,
    private jsonEditorService: JsonEditorService) { }
  cols: any[];
  isEdit: boolean = false;
  etltype: any = {};
  type: string;
  etlTypeList: Observable<any>;
  ngOnInit() {
    this.cols = [
      { field: 'etlType', header: '日志类型' },
      { field: 'bodyType', header: '消息格式' },
      { field: 'timeFormat', header: '日期格式' },
      { field: 'timeLocale', header: '日期地区' }
    ]
    this.etlTypeService.getList().subscribe();
    this.etlTypeList = this.etlTypeService.etlTypeList;
  }
  showNew() {
    this.type = "add";
    this.etltype = {};
    this.isEdit = true;
  }
  showEdit(etltype) {
    this.type = "edit";
    this.etltype = etltype;
    this.isEdit = true;
  }

  save() {
    if (this.type === "edit") {
      this.etlTypeService.save(this.etltype).subscribe(res => { this.isEdit = false; });
    }
    if (this.type === "add") {
      this.etlTypeService.add(this.etltype).subscribe(res => { this.isEdit = false; });
    }
  }

  del(etltype) {
    this.etlTypeService.del(etltype.id).subscribe();
  }
}
