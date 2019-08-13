import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActiveListDetailService } from './activeListDetail.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServerDataSource } from 'ng2-smart-table';
import { ActiveListService } from '../activeList/activeList.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
  selector: 'ngx-user',
  templateUrl: './activeListDetail.component.html'
})
export class ActiveListDetailComponent implements OnInit {

  constructor(private activeListDetailService: ActiveListDetailService,
    private activeListService: ActiveListService,
    private router: Router,
    private route: ActivatedRoute) { }
  isEdit: boolean = false;
  activeDetail: any = {};
  type: string;
  activeList: Observable<any>;
  activeDetailList: Observable<any>;
  listId: number;
  cols: any[];
  isInport;
  ngOnInit() {
    this.activeList = this.activeListService.activeList;
    this.activeDetailList = this.activeListDetailService.activeList;
    this.activeListService.getList().subscribe();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.listId = Number(params.get("id"));
      this.activeDetail.listId = this.listId;
      this.activeListDetailService.getList(this.activeDetail.listId).subscribe();
    });
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'listId', header: '活动列表' },
      { field: 'value', header: '值' },
    ];
  }

  showNew() {
    this.type = "add";
    this.activeDetail = { listId: this.listId };
    this.isEdit = true;
  }
  showEdit(activeDetail) {
    this.type = "edit";
    this.activeListDetailService.getAgent(activeDetail.id).subscribe(
      data => this.activeDetail = data
    )
    this.isEdit = true;
  }



  save() {

    if (this.type === "edit") {
      this.activeListDetailService.save(this.activeDetail).subscribe(res => { this.isEdit = false; });
    }
    if (this.type === "add") {
      this.activeListDetailService.add(this.activeDetail).subscribe(res => { this.isEdit = false; });

    }
  }

  del(activeDetail) {
    this.activeListDetailService.del(activeDetail.id).subscribe()
  }
  back() {
    history.go(-1);
  }
}
