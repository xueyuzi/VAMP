import { DashboardContainerModel } from './../../../model/dashboard-container.model';
import { Component, OnInit, ElementRef, ViewChild, TemplateRef, AfterViewInit, ViewContainerRef, ComponentFactoryResolver, EmbeddedViewRef } from '@angular/core';
import { ComponentFactory } from '@angular/core/src/render3';
import { DashboardContainerComponent } from '../dashboard-container/dashboard-container.component';
import { GridStackOptions } from 'ngx-grid-stack';
declare var $: any;
@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  options: GridStackOptions = new GridStackOptions();
  items = [
    {

      customId: "1",
      option: {
        x: 0,
        y: 0,
        height: 4,
        width: 5
      },
      panelData: { type: "bar", chartData: {}, title: "" }
    },
    {
      customId: "2",
      option: {
        x: 5,
        y: 0,
        height: 4,
        width: 5
      },
      panelData: { type: "pie", chartData: {}, title: "" }
    },
    {
      customId: "3",
      option: {
        x: 0,
        y: 4,
        height: 4,
        width: 5
      },
      panelData: { type: "line", chartData: {}, title: "" }
    },
    {
      customId: "4",
      option: {
        x: 5,
        y: 4,
        height: 8,
        width: 5
      },
      panelData: { type: "radar", chartData: {}, title: "" }
    }
  ];
  addContainer() {
    this.items.push({
      customId: "2",
      option: {
        x: 5,
        y: 0,
        height: 4,
        width: 4
      },
      panelData: new DashboardContainerModel()
    })
  }
  delContainer(item){
    this.items = this.items.filter(v=>v!==item)
  }
}
