import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RuleService } from './rule.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-user',
  templateUrl: './rule.component.html'
})
export class RuleComponent implements OnInit, AfterViewInit {

  constructor(private desenRuleService: RuleService) { }
  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      categoryId: {
        title: '分类ID',
        type: 'string',
      },
      type: {
        title: '类型',
        type: 'string',
      },
      ruleName: {
        title: '规则名称',
        type: 'string',
        width: "200px",
      },
      ruleNo: {
        title: '规则编号',
        type: 'string',
      },
      status: {
        title: '状态',
        type: 'string',
      },
      parallelism: {
        title: '并发度',
        type: 'string',
      },
      sourceId: {
        title: '数据源',
        type: 'string',
      },
      ruleContent: {
        title: '规则明细',
        type: 'string',
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,

    }
  }
  isEdit: boolean = false;
  user: any = {};
  type: string;
  userList: Observable<any>;
  userCondition = new Subject<any>();
  ngOnInit() {
    this.userList = this.userCondition.pipe(
      switchMap(condition => this.desenRuleService.getList(condition)),
    )
  }
  ngAfterViewInit() {
    this.userCondition.next({});
  }
  showNew() {
    this.type = "add";
    this.user = {};
    this.isEdit = true;
  }
  showEdit($event) {
    this.type = "edit";
    this.user = $event.data;
    this.isEdit = true;
  }

  saveUser() {

    if (this.type === "edit") {
      this.desenRuleService.save(this.user).subscribe(res => { this.isEdit=false;this.userCondition.next()});
    }
    if (this.type === "add") {
      this.desenRuleService.add(this.user).subscribe(res => { this.isEdit=false;this.userCondition.next()});

    }
  }

  delUser(id: number) {
    this.desenRuleService.del(id).subscribe(res => { });
  }
}
