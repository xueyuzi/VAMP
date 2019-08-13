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
  isEdit: boolean = false;
  isShowCharts: boolean = false;
  agent: any = {};
  type: string;
  agentList: Observable<any>;
  dRuleList: Array<any>;
  cols: any[];
  desen_rule_id: any = []
  chartList: Array<any>;
  cpuList: Array<any>;
  ngOnInit() {
    this.cols = [
      { field: 'agentName', header: '名称' },
      { field: 'agentAddress', header: 'IP地址' },
      { field: 'status', header: '状态' },
      { field: 'eps', header: 'EPS' },
      { field: 'cpu', header: '进程占用CPU' },
      { field: 'mem', header: '进程内存利用率' },
      { field: 'sys_cpu', header: '系统cpu' },
      { field: 'fh', header: '文件句柄' },
      { field: 'create_at', header: '注册时间' }
    ];
    this.agentList = this.agentService.agentList.asObservable();
    this.agentService.getList().subscribe();
    this.desenRuleService.getList().subscribe(
      list => this.dRuleList = list
    )
  }


  showNew() {
    this.type = "add";
    this.agent = { desen_rule_id: [] };
    this.isEdit = true;
  }

  agentConfig = {};

  showEdit(agent) {

    this.type = "edit";
    this.agentConfig = {
      "sources": {},
      "channels": {},
      "other": {}
    }

    this.agentService.getAgent(agent.id).subscribe(
      data => {
        this.agent = data
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
    this.agentService.getAgentChart(this.agent.id).subscribe(
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
        this.chartOptions1 = Object.assign({}, this.chartOptions1);
        //cpu
        this.cpuList = [];
        this.chartList.forEach(
          child1 => {
            let a = {};
            a['key'] = child1.create_at;
            a['value'] = child1.cpu;
            this.cpuList.push(a);
          });
        this.chartOptions2.dataset.source = this.cpuList;
        this.chartOptions2 = Object.assign({}, this.chartOptions2);
        //sys_cpu
        this.cpuList = [];
        this.chartList.forEach(
          child1 => {
            let a = {};
            a['key'] = child1.create_at;
            a['value'] = child1.sys_cpu;
            this.cpuList.push(a);
          });
        this.chartOptions3.dataset.source = this.cpuList;
        this.chartOptions3 = Object.assign({}, this.chartOptions3);
        //mem
        this.cpuList = [];
        this.chartList.forEach(
          child1 => {
            let a = {};
            a['key'] = child1.create_at;
            a['value'] = child1.mem;
            this.cpuList.push(a);
          });
        this.chartOptions4.dataset.source = this.cpuList;
        this.chartOptions4 = Object.assign({}, this.chartOptions4);
        //fh
        this.cpuList = [];
        this.chartList.forEach(
          child1 => {
            let a = {};
            a['key'] = child1.create_at;
            a['value'] = child1.fh;
            this.cpuList.push(a);
          });
        this.chartOptions5.dataset.source = this.cpuList;
        this.chartOptions5 = Object.assign({}, this.chartOptions5);
      });

    this.isShowCharts = true;
  }

  objectKeys(obj) {
    return Object.keys(obj)
  }

  saveUser() {
    if (this.type === "edit") {
      this.agentService.save(this.agent).subscribe(res => { this.isEdit = false; });
    }
    if (this.type === "add") {
      this.agentService.add(this.agent).subscribe(res => { this.isEdit = false; });
    }
  }

  del(agent) {
    this.agentService.del(agent.id).subscribe();
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
    title: {
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
    title: {
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
    title: {
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
    title: {
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
    title: {
      text: "文件句柄趋势"
    }
  };
}
