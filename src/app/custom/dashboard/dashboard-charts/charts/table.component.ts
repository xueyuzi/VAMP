import { BaseChartComponent } from "./base-charts.component";
import { OnInit, Component } from '@angular/core';
import { ChartsService } from '../dashboard-charts.service';

@Component({
    selector: 'ngx-table',
    template: `
    <div style="height:100%;display:flex;align-items:center">
    <p-table [value]="options.dataset.source">
    <ng-template pTemplate="header">
        <tr>
            <th *ngFor="let key of cols">
            {{key}}
            </th>
        </tr>
    </ng-template>
    <ng-template pTemplate="body" let-source>
        <tr>
            <td *ngFor="let key of cols">
            {{source[key]}}
            </td>
        </tr>
    </ng-template>
</p-table>
    </div>
    `
})
export class TableComponent extends BaseChartComponent implements OnInit {
    constructor(protected chartsService: ChartsService) {
        super(chartsService);
    }
    ngOnInit() {
    }
    setData(data: any) {
        this.options.dataset = data;
        this.cols = this.getCols(data.source[0]);
    }
    getCols(obj) {
        return Object.keys(obj).filter(key => typeof obj[key] !== 'object');
    }
    cols: Array<any> = [];
    options = {
        dataset: {
            source: [
                { "1": { "value": 301.0 }, "doc_count": 301.0, "key": "数据库" },
                { "1": { "value": 519.0 }, "doc_count": 519.0, "key": "操作系统" },
                { "1": { "value": 1304.0 }, "doc_count": 1304.0, "key": "应用软件" },
                { "1": { "value": 58.0 }, "doc_count": 58.0, "key": "中间件" }
            ]
        }
    }
}