import { Injectable } from '@angular/core';
import { DashboardContainerModel } from '../../model/dashboard-container.model';
import { of, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // TODO:定义containers的数据格式
  private containers: any;
  containersSource: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor() {
    this.containers = {
      1: {

        customId: "1",
        option: {
          x: 0,
          y: 0,
          height: 4,
          width: 4
        },
        panelData: { type: "bar", chartData: {}, chartStyle: {}, title: "" }
      },
      2: {
        customId: "2",
        option: {
          x: 4,
          y: 0,
          height: 4,
          width: 4
        },
        panelData: { type: "pie", chartData: {}, chartStyle: {}, title: "" }
      },
      3: {
        customId: "3",
        option: {
          x: 8,
          y: 0,
          height: 4,
          width: 4
        },
        panelData: { type: "line", chartData: {}, chartStyle: {}, title: "" }
      },
      4: {
        customId: "4",
        option: {
          x: 0,
          y: 4,
          height: 8,
          width: 8
        },
        panelData: { type: "radar", chartData: {}, chartStyle: {}, title: "" }
      }
    }
    this.containersSource.next(this.containers);
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
  delContainer = (key) => {
    delete this.containers[key];
    this.containersSource.next(this.containers);
  }

  updateContainer(i: number, container: any) {
    this.containers[i] = container;
    this.containersSource.next(this.containers);
  }

}
