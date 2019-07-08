import { Injectable } from '@angular/core';
import { DashboardContainerModel } from '../../model/dashboard-container.model';
import { of, Observable, BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from '../../api.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // TODO:定义containers的数据格式
  private containers: any;
  containersSource: BehaviorSubject<any> = new BehaviorSubject<any>({});
  settingKey: string;
  constructor(
    private api: ApiService
  ) { }

  data1 = [
    {

      customId: "1",
      option: {
        x: 0,
        y: 0,
        height: 4,
        width: 4
      },
      panelData: {
        type: "bar", chartData: {}, chartStyle: {
          legend: { show: false }, special: {
            jumpUrl: []
          }

        }, title: ""
      }
    },
    {
      customId: "2",
      option: {
        x: 4,
        y: 0,
        height: 4,
        width: 4
      },
      panelData: {
        type: "pie", chartData: {}, chartStyle: {
          legend: { show: false },
          special: {
            jumpUrl: []
          }
        }, title: ""
      }
    },
    {
      customId: "3",
      option: {
        x: 8,
        y: 0,
        height: 4,
        width: 4
      },
      panelData: {
        type: "line", chartData: {}, chartStyle: {
          legend: { show: false }, special: {
            jumpUrl: []
          }
        }, title: ""
      }
    },
    {
      customId: "4",
      option: {
        x: 0,
        y: 4,
        height: 8,
        width: 8
      },
      panelData: {
        type: "radar", chartData: {}, chartStyle: {
          legend: { show: false }, special: {
            jumpUrl: []
          }
        }, title: ""
      }
    }
  ];
  data2 = [
    {

      customId: "1",
      option: {
        x: 0,
        y: 0,
        height: 4,
        width: 6
      },
      panelData: {
        type: "pie", chartData: {}, chartStyle: {
          legend: { show: false }, special: {
            jumpUrl: []
          }

        }, title: ""
      }
    },
    {
      customId: "2",
      option: {
        x: 6,
        y: 0,
        height: 4,
        width: 6
      },
      panelData: {
        type: "pie", chartData: {}, chartStyle: {
          legend: { show: false },
          special: {
            jumpUrl: []
          }
        }, title: ""
      }
    },
    {
      customId: "3",
      option: {
        x: 0,
        y: 4,
        height: 4,
        width: 4
      },
      panelData: {
        type: "line", chartData: {}, chartStyle: {
          legend: { show: false }, special: {
            jumpUrl: []
          }
        }, title: ""
      }
    },
    {
      customId: "4",
      option: {
        x: 4,
        y: 4,
        height: 8,
        width: 8
      },
      panelData: {
        type: "radar", chartData: {}, chartStyle: {
          legend: { show: false }, special: {
            jumpUrl: []
          }
        }, title: ""
      }
    }
  ]
  isEdit: Subject<boolean> = new Subject();



  delContainer = (item) => {
    this.containers = this.containers.filter(v => v !== item)
    this.containersSource.next(this.containers);
  }

  updateContainer(i: number, container: any) {
    this.containers[i] = container;
    this.containersSource.next(this.containers);
  }

  updateChartStyle(setting) {
    let index = this.containers.findIndex(v => v.customId === this.settingKey);
    this.containers[index].panelData.chartStyle = setting;
    this.containersSource.next(this.containers);
  }


  getContainers(id) {
    return this.api.get("/elasticsearch/dashboard/" + id).pipe(
      tap(res => {
        this.containers = this['data' + id];
        this.containersSource.next(this.containers)
      })
    )
  }
  saveContainers(id){
    return this.api.post("/elasticsearch/dashboard/"+id,this.containers)
  }

  switchEdit(flag: boolean) {
    this.isEdit.next(flag)
  }

  getCharts(): Observable<any> {
    return this.api.get("assets/mock/charts.json")
  }
}
