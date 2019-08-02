import { BaseChartComponent } from "./base-charts.component";
import { OnInit, Component } from '@angular/core';
import { ChartsService } from '../dashboard-charts.service';
declare const $: any;

@Component({
    selector: 'ngx-number',
    template: `
    <div
    style="height: 100%;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;"
    >
    <div *ngIf="this.census === undefined" class="responsive_headline" style="font-weight:bolder;width:100%">{{options.dataset.source[0]?.doc_count}}</div>
    <div *ngIf="this.census!==undefined" class="responsive_headline" style="font-weight:bolder;width:100%">{{options.dataset.source[1]?.doc_count}}</div>
        <div [style.color]="this.census >= 0 ? 'red' : '#00ec05'" style="height:60px;display:flex;display: flex;align-items: center;flex-direction: column;justify-content:space-around;">
            <img *ngIf="this.census >= 0" src="assets/images/red_up.png" style="width:40px"/>
            <div  class="responsive_headline" style="font-weight:bolder;width:100%">
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
    setData(data: any) {
        console.log(data.title)
        this.options.dataset = data;

        if (data.source[1] !== undefined) {
            this.census = data.source[1].doc_count - data.source[0].doc_count;
        }
        $(".responsive_headline").fitText(1, { minFontSize: '24px', maxFontSize: '70px' });
    }
    options = {
        dataset: {
            source: [
                { doc_count: "0" }
            ]
        }
    }
}