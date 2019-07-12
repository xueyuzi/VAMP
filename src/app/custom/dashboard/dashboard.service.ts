import { Injectable } from '@angular/core';
import { DashboardContainerModel } from '../../model/dashboard-container.model';
import { of, Observable, BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from '../../api.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // TODO:定义containers的数据格式
  private containers: Array<any>;
  containersSource: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  isEdit: BehaviorSubject<boolean> = new BehaviorSubject(false);
  settingKey: string;
  id: number;
  constructor(
    private api: ApiService
  ) { }
  addContainer(chartId: number) {
    let option = this._getNewOption();
    return this.api.post(`/elasticsearch/charts/${chartId}`, option).pipe(
      tap(item => {
        this.containers.push(item)
        this.containersSource.next(this.containers);
      })
    )
  }
  delContainer = (item) => {
    this.containers = this.containers.filter(v => v !== item)
    this.containersSource.next(this.containers);
  }

  updateContainer(i: number, container: any) {
    this.containers[i] = container;
    this.containersSource.next(this.containers);
  }

  getContainers(id: number) {
    this.id = id;
    return this.api.get("/elasticsearch/dashboard/" + id).pipe(
      map(res => Object.keys(res).length == 0 ? [] : res),
      tap(res => {
        this.containers = res
        this.containersSource.next(this.containers)
      })
    )
  }

  getChartData(chartId:string){
    return this.api.get("/elasticsearch/getChart/" + chartId);
  }

  saveDashboard(id: number, value = null) {
    let containers = value === null ? this.containers : value;
    return this.api.post("/elasticsearch/dashboard/" + id, containers)
  }

  updateChartStyle(setting) {
    let index = this.containers.findIndex(v => v.customId === this.settingKey);
    this.containers[index].panelData.chartStyle = setting;
    this.containersSource.next(this.containers);
  }

  switchEdit(flag: boolean) {
    this.isEdit.next(flag)
  }

  getCharts(): Observable<any> {
    return this.api.get("/elasticsearch/charttemplate")
      .pipe(
        tap(res => console.log(res)),
        map(res => {
          let category_a = [], category_b = [];
          res.forEach(
            chart => {
              !category_a.includes(chart.category_a) && category_a.push(chart.category_a);
              !category_b.includes(chart.category_b) && category_b.push(chart.category_b);
            }
          )
          return {
            category_a: category_a,
            category_b: category_b,
            data: res
          }
        }),
        tap(res => console.log(res)),
      )
  }

  _getNewOption() {
    if (this.containers.length == 0) {
      return { "x": 0, "y": 0, "height": 4, "width": 6 }
    }
    let lastContainersOption = this.containers[this.containers.length - 1].option
    let x = lastContainersOption.x + lastContainersOption.width >= 12 ? 0 : lastContainersOption.x + lastContainersOption.width;
    let y = x == 0 ? lastContainersOption.y + lastContainersOption.height : lastContainersOption.y;
    return {
      "x": x,
      "y": y,
      "height": 4,
      "width": 6
    }
  }
}
