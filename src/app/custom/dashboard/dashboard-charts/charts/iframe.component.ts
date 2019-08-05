import { BaseChartComponent } from "./base-charts.component";
import { OnInit, Component } from '@angular/core';
import { ChartsService } from '../dashboard-charts.service';
import { DomSanitizer,SafeHtml,SafeResourceUrl } from '@angular/platform-browser'
declare const $:any;
@Component({
    selector: 'ngx-iframe',
    template: `
    <div
    style="
    height: 100%;
    width: 100%;"
    >
        <div *ngIf="iframeUrl===undefined">请设置url</div>
        <iframe *ngIf="iframeUrl !==undefined" style="width:100%;height:100%" [src]="iframeUrl" frameborder="0" ></iframe>
    </div>
    `
})
export class IframeComponent extends BaseChartComponent implements OnInit {
    constructor(protected chartsService:ChartsService,private sanitizer: DomSanitizer) {
        super(chartsService);
    }
    iframeUrl:SafeResourceUrl;
    ngOnInit() {
        this.iframeUrl= this.sanitizer.bypassSecurityTrustResourceUrl(this.container.panelData.chartStyle.iframe);
    }
}