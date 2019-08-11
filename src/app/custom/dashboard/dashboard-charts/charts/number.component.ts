import { BaseChartComponent } from "./base-charts.component";
import { OnInit, Component } from '@angular/core';
import { ChartsService } from '../dashboard-charts.service';

@Component({
    selector: 'ngx-number',
    template: `
    <div
    style="height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;"
    (click)="jump()"
    [style.cursor]="this.options.dataset.link_url !== null?'pointer':'auto'"
    >
    <p *ngIf="this.census === undefined" style="font-size:3.5vw;font-weight:bolder;padding: 0px;margin: 0px;">{{options.dataset.source[0]?.doc_count}}{{container.panelData.chartStyle?.suffix}}</p>
    <p *ngIf="this.census!==undefined" style="font-size:3.5vw;font-weight:bolder;padding: 0px;margin: 0px;">{{options.dataset.source[1]?.doc_count}}</p>
        <div [style.color]="this.census >= 0 ? 'red' : '#00ec05'" style="height:60px;display:flex;display: flex;align-items: center;flex-direction: column;justify-content:space-around;">
            <img *ngIf="this.census >= 0" src="assets/images/red_up.png" style="width:40px"/>
            <div style="font-size:2vw;font-weight:bolder">
                {{census}}
            </div>
            <img *ngIf="this.census < 0" src="assets/images/green_down.png" style="width:2vw"/>
        </div>
    </div>
    `
})
export class NumberComponent extends BaseChartComponent implements OnInit {
    constructor(protected chartsService: ChartsService) {
        super(chartsService);
    }
    census: number;
    ngOnInit() {
    }
    jump() {
        if (this.options.dataset.link_url !== null) {
            window.location = this.options.dataset.link_url;

        }

    }
    setData(data: any) {
        console.log(data.title)
        this.options.dataset = data;

        if (data.source[1] !== undefined) {
            this.census = data.source[1].doc_count - data.source[0].doc_count;
        }
    }
    options: any = {
        dataset: {
            source: [
                { doc_count: "0" }
            ]
        }
    }
}