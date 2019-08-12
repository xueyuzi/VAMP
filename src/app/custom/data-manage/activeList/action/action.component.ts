import { Component, OnInit } from '@angular/core';
import { ActiveListService } from '../activeList.service';

@Component({
  selector: 'ngx-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  constructor(
    private activeListService: ActiveListService
  ) { }
  isInport: boolean = false;
  rowData: any;
  ngOnInit() {
  }
  showInport(event) {
    console.log(event)

    this.isInport = true;
  }
  uploadFile(event) {

    console.log(event)
  }
  onBeforeUpload(event) {
    let id = this.rowData.id;
    console.log(event);
    event.formData.append("list_id", id);
  }

}
