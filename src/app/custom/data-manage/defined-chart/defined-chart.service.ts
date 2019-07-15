import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ApiService } from '../../../api.service';

@Injectable({
  providedIn: 'root'
})
export class DefinedChartService {

  constructor(private api: ApiService) { }
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

}
