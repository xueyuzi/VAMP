import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActiveListService } from './activeList.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-user',
  templateUrl: './activeList.component.html'
})
export class ActiveListComponent implements OnInit {

  constructor(private activeListService: ActiveListService,
    private router: Router) { }

  cols: any[];
  isEdit: boolean = false;
  isInport: boolean = false;
  active: any = {};
  type: string;
  activeList: Observable<any>;
  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'listName', header: '名称' },
      { field: 'listNo', header: '编号' },
      { field: 'type', header: '类型' },
      { field: 'status', header: '状态' },
      { field: 'maxsize', header: '最大值' },
      { field: 'timeout', header: '超时时间' },
      { field: 'remark', header: '备注' },
    ];
    this.activeListService.getList().subscribe();
    this.activeList = this.activeListService.activeList;
  }
  showNew() {
    this.type = "add";
    this.active = {};
    this.isEdit = true;
  }
  showEdit(active) {
    this.type = "edit";
    this.active = active;
    this.isEdit = true;
  }

  
  showInport(active) {
    this.isInport = true;
    this.active = active;
  }
  uploadFile(event) {
    this.isInport = false;
  }
  onBeforeUpload(event) {
    let id = this.active.id;
    event.formData.append("list_id", id);
  }

  jumpDetail(active) {
    let id = active.id;
    this.router.navigate(["/custom/data/activeListDetail", id])
  }
  del(active) {
    let id = active.id;
    this.activeListService.del(id).subscribe();
  }


  save() {
    if (this.type === "edit") {
      this.activeListService.save(this.active).subscribe(res => { this.isEdit = false; });
    }
    if (this.type === "add") {
      this.activeListService.add(this.active).subscribe(res => { this.isEdit = false; });

    }
  }
}
