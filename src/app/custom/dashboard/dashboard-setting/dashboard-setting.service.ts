import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../../api.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardSettingService {

  private showSource = new BehaviorSubject<boolean>(false);
  private finishedSource = new BehaviorSubject<boolean>(false);
  private chart_id: number;
  
  public show$ = this.showSource.asObservable();
  public finished$ = this.finishedSource.asObservable();
  constructor(
    private api: ApiService
  ) { }
  toggle(flag: boolean) {
    this.showSource.next(flag);
  }
  setId(chart_id: number) {
    console.log(chart_id);
    this.chart_id = chart_id;
  }
  getData() {
    return this.api.get("/elasticsearch/getChartInfo/" + this.chart_id);
  }

  save(setting: any) {

    this.finishedSource.next(false)
    return this.api.post("/elasticsearch/updateChart/" + this.chart_id, setting).pipe(
      tap(() => this.finishedSource.next(true))
    );
  }

}
