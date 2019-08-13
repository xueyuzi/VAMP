import { Component, OnInit } from '@angular/core';
import { ActiveListService } from '../activeList.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-active-list-action',
  templateUrl: './activeListAction.component.html',
})
export class ActionComponent implements OnInit {

  constructor(
    private activeListService: ActiveListService,
    private router: Router
  ) { }
  isInport: boolean = false;
  rowData: any;
  ngOnInit() {
  }
  del() {
    let id = this.rowData.id;
    this.activeListService.del(id).subscribe();
  }

}
