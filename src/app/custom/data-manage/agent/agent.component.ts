import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AgentService } from './agent.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { DesenRuleService } from '../desenRule/desenRule.service';
import { JsonEditorService } from '../../../common/json-editor.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'ngx-user',
  templateUrl: './agent.component.html'
})
export class AgentComponent implements OnInit {

  constructor(private agentService: AgentService,
    private desenRuleService: DesenRuleService,
    private jsonEditorService: JsonEditorService,
    private confirmationService: ConfirmationService) { }
  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      agentName: {
        title: '名称',
        type: 'string',
      },
      agentAddress: {
        title: 'IP地址',
        type: 'string',
      },
      agentConfig: {
        title: '配置',
        type: 'string',
        width: "20%",
      },
      agentKey: {
        title: '识别key',
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
  isShowCharts: boolean = false;
  user: any = {};
  type: string;
  agentSource: ServerDataSource;
  dRuleList: Array<any>;
  desen_rule_id: any = []
  ngOnInit() {
    this.agentSource = this.agentService.getList();
    this.desenRuleService.getList().subscribe(
      list => this.dRuleList = list
    )
  }


  showNew() {
    this.type = "add";
    this.user = { desen_rule_id: [] };
    this.isEdit = true;
  }
  sourcesChild = {};
  channelChild = {};

  showEdit($event) {

    this.type = "edit";
    this.sourcesChild = {};
    this.agentService.getAgent($event.data.id).subscribe(
      data => {
        this.user = data
        let agentConfig = JSON.parse(data.agentConfig);
        let sources;
        let channels;

        Object.keys(agentConfig).map(key => {
          let sourcesKey = key.match(/^agent\d.sources$/);
          let channelsKey = key.match(/^agent\d.channels$/);
          if (sourcesKey !== null)
            sources = agentConfig[sourcesKey[0]].split(" ");
          if (channelsKey !== null)
            channels = agentConfig[channelsKey[0]].split(" ");
        })

        Object.keys(agentConfig).map(key => {
          sources.forEach(skey => {
            if (key.match(new RegExp("agent\\d*\\.sources\\." + skey + "\\.\\w+")) !== null) {
              this.sourcesChild[key] = agentConfig[key]
            }
          })
          channels.forEach(ckey => {
            if (key.match(new RegExp("agent\\d*\\.channels\\." + ckey + "\\.\\w+")) !== null) {
              this.channelChild[key] = agentConfig[key]
            }
          })
        })
        console.log(this.sourcesChild)
      }
    )
    this.isEdit = true;
  }

  showCharts() {
    this.isShowCharts = true;
  }

  objectKeys(obj) {
    return Object.keys(obj)
  }

  saveUser() {
    this.user.agentConfig = this.jsonEditorService.getValue();
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

  changeDesen(event) {
    console.log(this.desen_rule_id)
  }


  chartOptions1 = {
    dataset:{
      source:[
        {key:1,value:123},
        {key:2,value:103},
        {key:3,value:13},
        {key:4,value:53},
        {key:5,value:83},
      ]
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'line',
      smooth: true
    }]
  };
}
