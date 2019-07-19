import { BaseChartComponent } from "./base-charts.component";
import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'ngx-text',
    template: `
    <div
    style="height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;"
    >
        <div  style="font-size:79px;font-weight:bolder">{{options.dataset.source[0].doc_count}}</div>
        <div [style.color]="this.census >= 0 ? 'red' : 'green'" style="line-height: 0px;display: flex;align-items: center;flex-direction: column;">
            <i *ngIf="this.census >= 0" style="font-size: 50px;margin-top: -20px;" class="ion-arrow-graph-up-left"></i>
            <div style="font-size:20px">
                {{census}}
            </div>
            <i *ngIf="this.census < 0" style="font-size: 50px;margin-top: -20px;" class="ion-arrow-graph-down-left"></i>
        </div>
    </div>
    `
})
export class TextComponent extends BaseChartComponent implements OnInit {
    constructor() { super(); }
    census: number;
    ngOnInit() {
    }
    setData(data: any) {
        this.options.dataset = data;

        if (data.source[1] !== undefined) {
            this.census = data.source[0].doc_count - data.source[1].doc_count;
        }
    }
    options = {
        dataset: {
            source: [
                {
                    "key": "58.246.174.74",
                    "doc_count": 4322
                },
                {
                    "key": "114.114.114.114",
                    "doc_count": 897
                },
                {
                    "key": "216.58.200.238",
                    "doc_count": 177
                },
                {
                    "key": "18.179.9.154",
                    "doc_count": 170
                }]
        }
    }
}