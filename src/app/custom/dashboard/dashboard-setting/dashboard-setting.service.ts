import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardSettingService {

  private showSource = new BehaviorSubject<boolean>(false)
  isShow(): Observable<boolean> {
    return this.showSource.asObservable();
  }
  toggle(flag: boolean) {
    this.showSource.next(flag);
  }
  constructor() { }
}
