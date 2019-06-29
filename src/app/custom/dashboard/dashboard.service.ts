import { Injectable } from '@angular/core';
import { DashboardContainerModel } from '../../model/dashboard-container.model';
import { of, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // TODO:定义containers的数据格式
  private containers: Array<any>;
  containersSource: BehaviorSubject<Array<any>>;
  constructor() {
    this.containers = [
      {

        customId: "1",
        option: {
          x: 0,
          y: 0,
          height: 4,
          width: 4
        },
        panelData: { type: "bar", chartData: {}, title: "" }
      },
      {
        customId: "2",
        option: {
          x: 4,
          y: 0,
          height: 4,
          width: 4
        },
        panelData: { type: "pie", chartData: {}, title: "" }
      },
      {
        customId: "3",
        option: {
          x: 8,
          y: 0,
          height: 4,
          width: 4
        },
        panelData: { type: "line", chartData: {}, title: "" }
      },
      {
        customId: "4",
        option: {
          x: 0,
          y: 4,
          height: 8,
          width: 8
        },
        panelData: { type: "radar", chartData: {}, title: "" }
      }
    ];
    this.containersSource = new BehaviorSubject<Array<any>>(this.containers);
  }


  addContainer = () => {
    this.containers.push({
      customId: "2",
      option: {
        x: 5,
        y: 0,
        height: 4,
        width: 4
      },
      panelData: new DashboardContainerModel()
    })
    this.containersSource.next(this.containers);
  }
  delContainer = (item) => {
    this.containers = this.containers.filter(v => v !== item)
    this.containersSource.next(this.containers);
  }
}
