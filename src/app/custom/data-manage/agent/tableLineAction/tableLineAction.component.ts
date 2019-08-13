import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-active-list-action',
  templateUrl: './tableLineAction.component.html',
})
export class tableLineComponent implements OnInit {

  constructor(
    private router: Router
  ) { }
  service: (any);
  isInport: boolean = false;
  rowData: any;
  ngOnInit() {
  }
  del() {
    let id = this.rowData.id;
    this.service.del(id).subscribe();
  }

}
