import { BaseChartComponent } from "./base-charts.component";
import { OnInit, Component } from '@angular/core';
import { ChartsService } from '../dashboard-charts.service';
declare const $:any;
@Component({
    selector: 'ngx-text',
    template: `
    <div
    style="
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight:bolder;
    width: 100%;
    position:relative"
    class="responsive_headline"
    >
    {{options.title}}
        
    </div>
    `
})
export class TextComponent extends BaseChartComponent implements OnInit {
    constructor(protected chartsService:ChartsService) {
        super(chartsService);
    }
    ngOnInit() {
    }
    setData(data: any) {
        console.log(data.title)
        this.options = data;
        $(".responsive_headline").fitText(1, { minFontSize: '24px', maxFontSize: '70px' });
    }
    options = {
        title:"Text"
    }
}