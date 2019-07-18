import { BaseChartComponent } from "./base-charts.component";
import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'ngx-text',
    template: `<div
    style="height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;"
    >
    <h1>{{options.dataset.source[0].value}}</h1>
    </div>`
})
export class TextComponent extends BaseChartComponent implements OnInit {
    constructor() { super(); }
    ngOnInit() {

    }
    options = {
        dataset:{
            source:[
                {value:"Text"}
            ]
        }
    }
}