import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dashboard',
  template: `<router-outlet></router-outlet>`
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
