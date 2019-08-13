import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AgentService } from './agent.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { DesenRuleService } from '../desenRule/desenRule.service';
import { JsonEditorService } from '../../../common/json-editor.service';
import { ConfirmationService } from 'primeng/api';
import { tableLineComponent } from "./tableLineAction/tableLineAction.component";

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
      agentName: {
        title: '名称',
        type: 'string',
      },
      agentAddress: {
        title: 'IP地址',
        type: 'string',
      },
      status: {
        title: '状态',
        type: 'string',
      },
      eps: {
        title: 'EPS',
        type: 'string',
      },
      cpu: {
        title: '进程占用CPU',
        type: 'string',
      },
      mem: {
        title: '进程内存利用率',
        type: 'string',
      },
      sys_cpu: {
        title: '系统cpu',
        type: 'string',
      },
      fh: {
        title: '文件句柄',
        type: 'string',
      },
      create_at: {
        title: '注册时间',
        type: 'string',
      },
      action: {
        title: "操作",
        type: "custom",
        renderComponent: tableLineComponent,
        onComponentInitFunction:(renderComponent)=>{
          renderComponent.service = this.agentService
        },
        width: "250px"
      }
    },
    actions: {
      add: false,
      edit: false,
      delete:false,
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
  chartList: Array<any>;
  cpuList:Array<any>;
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

  agentConfig = {};

  showEdit($event) {

    this.type = "edit";
    this.agentConfig = {
      "sources": {},
      "channels": {},
      "other": {}
    }

    this.agentService.getAgent($event.data.id).subscribe(
      data => {
        this.user = data
        let agentConfig = JSON.parse(data.agentConfig);
        let sources;
        let channels;

        Object.keys(agentConfig).forEach(key => {
          let sourcesKey = key.match(/^agent\d.sources$/);
          let channelsKey = key.match(/^agent\d.channels$/);
          let otherKey = key.search("channels") + key.search("sources")

          if (sourcesKey !== null)
            sources = agentConfig[sourcesKey[0]].split(" ");
          if (channelsKey !== null)
            channels = agentConfig[channelsKey[0]].split(" ");
          if (otherKey == -2) {
            this.agentConfig["other"][key] = agentConfig[key]
          }
        })

        Object.keys(agentConfig).forEach(key => {
          sources.forEach(skey => {
            if (key.match(new RegExp("agent\\d*\\.sources\\." + skey + "\\.\\w+")) !== null) {
              this.agentConfig["sources"][key] = agentConfig[key]
            }
          })
          channels.forEach(ckey => {
            if (key.match(new RegExp("agent\\d*\\.channels\\." + ckey + "\\.\\w+")) !== null) {
              this.agentConfig["channels"][key] = agentConfig[key]
            }
          })
        })
      }
    )
    this.isEdit = true;
  }

  showCharts() {
    console.log(this.chartOptions1.dataset)
    this.agentService.getAgentChart(this.user.id).subscribe(
      list => {
        this.chartList = list
        //eps
        this.cpuList = [];
        this.chartList.forEach(
          child1 => {
            let a = {};
            a['key'] = child1.create_at;
            a['value'] = child1.eps;
            this.cpuList.push(a);
          });
        this.chartOptions1.dataset.source = this.cpuList;
        this.chartOptions1=Object.assign({},this.chartOptions1);
        //cpu
        this.cpuList = [];
        this.chartList.forEach(
          child1 =>{
            let a = {};
            a['key'] = child1.create_at;
            a['value'] = child1.cpu;
            this.cpuList.push(a);
          });
        this.chartOptions2.dataset.source = this.cpuList;
        this.chartOptions2=Object.assign({},this.chartOptions2);
        //sys_cpu
        this.cpuList = [];
        this.chartList.forEach(
          child1 =>{
            let a = {};
            a['key'] = child1.create_at;
            a['value'] = child1.sys_cpu;
            this.cpuList.push(a);
          });
        this.chartOptions3.dataset.source = this.cpuList;
        this.chartOptions3=Object.assign({},this.chartOptions3);
        //mem
        this.cpuList = [];
        this.chartList.forEach(
          child1 =>{
            let a = {};
            a['key'] = child1.create_at;
            a['value'] = child1.mem;
            this.cpuList.push(a);
          });
        this.chartOptions4.dataset.source = this.cpuList;
        this.chartOptions4=Object.assign({},this.chartOptions4);
        //fh
        this.cpuList = [];
        this.chartList.forEach(
          child1 =>{
            let a = {};
            a['key'] = child1.create_at;
            a['value'] = child1.fh;
            this.cpuList.push(a);
          });
        this.chartOptions5.dataset.source = this.cpuList;
        this.chartOptions5=Object.assign({},this.chartOptions5);
      });

    this.isShowCharts = true;
  }

  objectKeys(obj) {
    return Object.keys(obj)
  }

  saveUser() {
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


  chartOptions1: any = {
    dataset: {
      source: [
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
    }],
    title:{
      text: "EPS趋势"
    }
  };
  chartOptions2 = {
    dataset: {
      source: [
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
    }],
    title:{
      text: "进程CPU趋势"
    }
  };
  chartOptions3 = {
    dataset: {
      source: [
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
    }],
    title:{
      text: "系统CPU趋势"
    }
  };
  chartOptions4 = {
    dataset: {
      source: [
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
    }],
    title:{
      text: "进程MEM趋势"
    }
  };
  chartOptions5 = {
    dataset: {
      source: [
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
    }],
    title:{
      text: "文件句柄趋势"
    }
  };
}
