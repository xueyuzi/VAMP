import { BaseChartComponent } from "./base-charts.component";
import { OnInit, Component } from '@angular/core';
import { ChartsService } from '../dashboard-charts.service';

@Component({
    selector: 'ngx-text',
    template: `
    <div
    style="height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;"
    >
        <p  style="font-size:79px;font-weight:bolder">{{options.dataset.source[0]?.doc_count}}</p>
        <div [style.color]="this.census >= 0 ? 'red' : 'green'" style="line-height: 0px;height:60px;display:flex;display: flex;align-items: center;flex-direction: column;justify-content:space-around;">
            <img *ngIf="this.census >= 0" src="assets/images/red_up.png" style="width:40px"/>
            <div style="font-size:20px">
                {{census}}
            </div>
            <img *ngIf="this.census < 0" src="assets/images/green_down.png" style="width:40px"/>
        </div>
    </div>
    `
})
export class TextComponent extends BaseChartComponent implements OnInit {
    constructor(protected chartsService:ChartsService) {
        super(chartsService);
    }
    census: number;
    ngOnInit() {
    }
    setData(data: any) {
        console.log(data.title)
        this.options.dataset = data;

        if (data.source[1] !== undefined) {
            this.census = 0 - (data.source[0].doc_count + data.source[1].doc_count);
        }
    }
    options = {
        dataset: {
            source: [
                { doc_count: "暂无数据" }
            ]
        }
    }
}