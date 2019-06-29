import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartsSettingService {

  styleSetting:BehaviorSubject<any> = new BehaviorSubject<any>({});
  dataSetting:BehaviorSubject<any> = new BehaviorSubject<any>({});
}
