import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EtlTypeConfigService } from './etlTypeConfig.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { EtltypeService } from '../etltype/etltype.service';
import {JsonEditorService} from "../../../common/json-editor.service";

@Component({
  selector: 'ngx-user',
  templateUrl: './etlTypeConfig.component.html'
})
export class EtlTypeConfigComponent implements OnInit {

  constructor(private agentService: EtlTypeConfigService,
              private activeListService: EtltypeService,
              private jsonEditorService: JsonEditorService) { }
  settings = {
    columns: {
      etlType: {
        title: '日志类别',
        type: 'string',
      },
      formatRegex: {
        title: '匹配规则',
        type: 'string',
        width:'20%',
      },
      mappingFields: {
        title: '属性映射',
        type: 'string',
        width:'30%',
      },
      order: {
        title: '排序',
        type: 'string',
      }
    },
    actions: {
      add: false,
      edit: false,
      columnTitle: "操作",
      position: "right"
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: `<i class="icon ion-trash-a"></i>`
    },
    pager: {
      perPage: 10
    },
    hideSubHeader: true
  }
  isEdit: boolean = false;
  user: any = {};
  type: string;
  agentSource: ServerDataSource;
  activeList: Array<any>;
  desen_rule_id: any = []
  ngOnInit() {
    this.agentSource = this.agentService.getList();
    this.activeListService.getList().subscribe(
      list => this.activeList = list
    )
  }

  showNew() {
    this.type = "add";
    this.user = { desen_rule_id: [] };
    this.isEdit = true;
    this.setEditor();
  }
  showEdit($event) {
    this.type = "edit";
    this.agentService.getAgent($event.data.id).subscribe(
      data => this.user = data
    )
    this.isEdit = true;
    this.setEditor();
  }

  saveUser() {
    this.user.mappingFields = this.jsonEditorService.getValue();
    if (this.type === "edit") {
      this.agentService.save(this.user).subscribe(res => { this.isEdit = false; this.agentSource.refresh(); });
    }
    if (this.type === "add") {
      this.agentService.add(this.user).subscribe(res => { this.isEdit = false; this.agentSource.refresh(); });

    }
  }

  delUser($event) {
        this.agentService.del($event.data.id).subscribe(
          res => {
            this.agentSource.refresh();
    });
  }

  changeActive(event) {
    this.user.listId = event;
  }

  setEditor() {
    setTimeout(() => {
      this.jsonEditorService.createEditor("agent-json-editor");
      this.jsonEditorService.setValue(this.user.mappingFields);
    }, 500)
  }
}
