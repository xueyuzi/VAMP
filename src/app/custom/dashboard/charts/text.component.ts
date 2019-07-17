import { BaseChartComponent } from "./base-charts.component";
import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'ngx-text',
    template: `<div>
    <h1 *ngFor="let text of option.dataset">{{text}}</h1>
    </div>`
})
class TextComponent extends BaseChartComponent implements OnInit {
    constructor() { super(); }
    ngOnInit() {

    }
}