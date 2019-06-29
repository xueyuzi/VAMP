import { DashboardContainerModel } from './../../../model/dashboard-container.model';
import { Component, OnInit, ElementRef, ViewChild, TemplateRef, AfterViewInit, ViewContainerRef, ComponentFactoryResolver, EmbeddedViewRef } from '@angular/core';
import { ComponentFactory } from '@angular/core/src/render3';
import { DashboardContainerComponent } from '../dashboard-container/dashboard-container.component';
import { GridStackOptions } from 'ngx-grid-stack';
import { DashboardService } from '../dashboard.service';
declare var $: any;
@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{
  constructor(private dashboardService:DashboardService){
  }
  options: GridStackOptions = new GridStackOptions();
  containers:Array<any> = [];
  ngOnInit(){
    this.dashboardService.containersSource.subscribe(containers=>this.containers=containers);
  }
  addContainer = ()=>{
    this.dashboardService.addContainer();
  }
  
}
