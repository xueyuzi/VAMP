import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GridStackOptions } from 'ngx-grid-stack';
import { MenuService } from '../../system-manage/menu/menu.service';

@Component({
  selector: 'ngx-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {

  constructor(private dashboardService: DashboardService,
    private menuService: MenuService,
    private route: ActivatedRoute,
  ) { }
  title: string;
  id: number;
  options: GridStackOptions;
  containers: Array<any> = [];
  isEdit: boolean;
  isNew: boolean;
  isEditor: string;
  ngOnInit() {
    this.options = new GridStackOptions();
    this.dashboardService.containersSource.subscribe(containers => {
      this.containers = []
      setTimeout(() => { this.containers = containers })
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get("id"));
      this.dashboardService.getContainers(this.id).subscribe(
        () => {
          console.log(this.menuService.menus)
          this.title = this.menuService.menus[this.id-1].title;
        }
      );
    });
    this.dashboardService.isEdit.subscribe(
      flag => this.isEdit = flag
    )
  }

  switchEdit() {
    this.isEdit = !this.isEdit;
    this.dashboardService.switchEdit(this.isEdit);
  }
  cancel() {
    this.switchEdit();
    this.dashboardService.getContainers(this.id).subscribe();
  }

  showNew() {
    this.isNew = true;
  }

  addContainer(chartId: number) {
    this.dashboardService.addContainer(chartId).subscribe(res => {
      this.isNew = false;
    });
  }

  saveDashboard() {
    this.dashboardService.saveDashboard(this.id).subscribe(res => this.switchEdit())
  }

}
