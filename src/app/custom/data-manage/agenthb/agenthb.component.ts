import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AgenthbService } from './agenthb.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-user',
  templateUrl: './agenthb.component.html'
})
export class AgenthbComponent implements OnInit {

  constructor(private agenthbService: AgenthbService) { }
  isEdit: boolean = false;
  agenthb: any = {};
  cols:any[];
  type: string;
  agenthbList: Observable<any>;
  ngOnInit() {
    this.agenthbService.getList().subscribe();
    this.agenthbList = this.agenthbService.agenthbList;
    this.cols =[
      { field: 'id', header: 'ID' },
      { field: 'agentId', header: 'agentId' },
      { field: 'sysCpu', header: 'sysCpu' },
      { field: 'pid', header: 'pid' },
      { field: 'eps', header: 'eps' },
      { field: 'mem', header: 'mem' },
      { field: 'cpu', header: 'cpu' },
      { field: 'fh', header: 'fh' },
      { field: 'createAt', header: 'createAt' }
    ]
  }
  showNew() {
    this.type = "add";
    this.agenthb = {};
    this.isEdit = true;
  }
  showEdit(agenthb) {
    this.type = "edit";
    this.agenthb = agenthb.data;
    this.isEdit = true;
  }


}
