import { DashboardService } from './../dashboard.service';
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
  public container: any;

  public show$ = this.showSource.asObservable();
  public finished$ = this.finishedSource.asObservable();
  constructor(
    private api: ApiService,
    private dashboardService: DashboardService
  ) { }
  toggle(flag: boolean) {
    this.showSource.next(flag);
  }
  setContainer(container: any) {
    this.container = container;
  }
  getData() {
    return this.api.get("/elasticsearch/getChartInfo/" + this.container.customId);
  }

  save(setting: any) {

    this.finishedSource.next(false)
    return this.dashboardService.updateContainerSetting(this.container.customId, setting).pipe(
      tap(() => this.finishedSource.next(true))
    );
  }

}
