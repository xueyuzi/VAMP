import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ApiService } from '../../../api.service';

@Injectable({
  providedIn: 'root'
})
export class ChartTemplateService {

  constructor(private api: ApiService) { }
  getCharts(): Observable<any> {
    return this.api.get("/elasticsearch/charttemplate")
      .pipe(
        tap(res => console.log(res))
      )
  }

  addCharts(data): Observable<any> {
    return this.api.post("/elasticsearch/addChartTemplate", data);
  }
  saveCharts(id, data): Observable<any> {
    return this.api.post("/elasticsearch/charttemplate/" + id, data);
  }

  getChart(id): Observable<any> {
    return this.api.get("/elasticsearch/chartTemplate/" + id);
  }
  delChart(id): Observable<any> {
    return this.api.post("/elasticsearch/delChartTemplate/" + id);
  }

  getTemplateCateGoryList() {
    return this.api.get("/elasticsearch/getDictValue/chart_template_category");
  }

}
