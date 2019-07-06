import { Component, OnInit, Output, EventEmitter, ViewContainerRef, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseChartComponent } from './base.charts.component';
import * as dat from 'dat.gui';
@Component({
  selector: 'ngx-bar',
  template: `
  <div echarts  [(options)]="options" style="height:100%;width:100%"></div>
  <div #chartConfig (mousedown)="$event.stopPropagation();"  style="position: absolute;top: 80px;right: 0px;"></div>
  `
})
export class BarComponent implements OnInit, BaseChartComponent {
  @ViewChild("chartConfig") chartConfig: ElementRef;

  config: any = {
    color: "#FF0000",
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    fontColor: "#FFFFFF",
    xAxisShow: true,
    xAxisLabelShow: true,
    xAxisLabelFontStyle: "normal",
    xAxisLabelFontWeight: "normal",
    xAxisLabelFontSize: 12,
    xAxisLabelRotate: 0,

    yAxisShow: true,
    yAxisLabelShow: true,
    yAxisLabelFontStyle: "normal",
    yAxisLabelFontWeight: "normal",
    yAxisLabelFontSize: 12,
    yAxisLabelRotate: 0,


    legendShow:false,
    legendFontSize:12,
    legendColor:"#FFFFFF",
    legendleft:0,
    legendright:0,
    legendtop:0,
    legendbottom:0,
    


    barWidth:20,
    barCategoryGap:20,

  };
  rotationSpeed: any;
  options:any = {
    color: ["red"],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend:{
      show:false,
      textStyle:{}
    },
    dataset:{
      source:[
        ['Mon',300,],
        ['Tur',52,],
        ['Wed',200,],
        ['Thu',334,],
        ['Fri',390,],
        ['Sat',330,],
        ['Sun',220,],
      ]
    },
    xAxis:
    {
      show: true,
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        show: true,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 12,
        rotate: 0,
      }
    },
    yAxis:
    {
      show: true,
      type: 'value',
      axisLabel: {
        show: true,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 12,
        rotate: 0,
      }
    }
    ,
    series: [
      {
        name: '直接访问',
        type: 'bar',
        barWidth: '60%',
        label: {
          show: true,
          rotate: 0,
          align: "center",
          verticalAlign: "middle",
          position: "insideBottom",
          distance: 15,
          color: "white"
        }
      }
    ]
  };

  gui: any;
  ngOnInit() {
    const posList = [
      'left', 'right', 'top', 'bottom',
      'inside',
      'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
      'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
    ]
    const gui = new dat.GUI({ autoPlace: false });
    var f1 = gui.addFolder('label设置');
    var f2 = gui.addFolder("全局设置");
    var xAxis = gui.addFolder("x轴");
    var yAxis = gui.addFolder("y轴");
    var legend  = gui.addFolder("图例");
    var barStyle = gui.addFolder("直方图设置");

    barStyle.add(this.config,"barWidth",0,100).onChange(v => {
      this.options.series[0].barWidth = v;
      this.options = Object.assign({}, this.options);
    });

    legend.add(this.config, "legendShow", [true, false]).onChange(v => {
      v = v == "true" ? true : false;
      this.options.legend.show = v;
      this.options = Object.assign({}, this.options);
    });

    legend.add(this.config, "legendFontSize", 12, 50).onChange(v => {
      this.options.legend["textStyle"]["fontSize"] = v;
      this.options = Object.assign({}, this.options);
    });
    legend.addColor(this.config, "legendColor").onChange(v => {
      this.options.legend["textStyle"]["color"] = v;
      this.options = Object.assign({}, this.options);
    });

    legend.add(this.config, "legendleft",0,100).onChange(v => {
      this.options.legend.left = v+"%";
      this.options = Object.assign({}, this.options);
    });
    legend.add(this.config, "legendtop",0,100).onChange(v => {
      this.options.legend.top = v+"%";
      this.options = Object.assign({}, this.options);
    });
    legend.add(this.config, "legendright",0,100).onChange(v => {
      this.options.legend.right = v+"%";
      this.options = Object.assign({}, this.options);
    });
    legend.add(this.config, "legendbottom",0,100).onChange(v => {
      this.options.legend.bottom = v+"%";
      this.options = Object.assign({}, this.options);
    });



  


    xAxis.add(this.config, "xAxisShow", [true, false]).onChange(v => {
      v = v == "true" ? true : false;
      this.options.xAxis.show = v;
      this.options = Object.assign({}, this.options);
    });
    xAxis.add(this.config, "xAxisLabelShow", [true, false]).onChange(v => {
      v = v == "true" ? true : false;
      this.options.xAxis.axisLabel.show = v;
      this.options = Object.assign({}, this.options);
    });
    xAxis.add(this.config, "xAxisLabelFontStyle", ['normal', 'italic', 'oblique']).onChange(v => {
      this.options.xAxis.axisLabel.fontStyle = v
      this.options = Object.assign({}, this.options);
    });
    xAxis.add(this.config, "xAxisLabelFontWeight", ['normal', 'bold', 'bolder', 'lighter']).onChange(v => {
      this.options.xAxis.axisLabel.fontWeight = v;
      this.options = Object.assign({}, this.options);
    });
    xAxis.add(this.config, "xAxisLabelFontSize", 12, 50).onChange(v => {
      this.options.xAxis.axisLabel.fontSize = v;
      this.options = Object.assign({}, this.options);
    });


    yAxis.add(this.config, "xAxisShow", [true, false]).onChange(v => {
      v = v == "true" ? true : false;
      this.options.yAxis.show = v;
      this.options = Object.assign({}, this.options);
    });
    yAxis.add(this.config, "xAxisLabelShow", [true, false]).onChange(v => {
      v = v == "true" ? true : false;
      this.options.yAxis.axisLabel.show = v;
      this.options = Object.assign({}, this.options);
    });
    yAxis.add(this.config, "xAxisLabelFontStyle", ['normal', 'italic', 'oblique']).onChange(v => {
      this.options.yAxis.axisLabel.fontStyle = v
      this.options = Object.assign({}, this.options);
    });
    yAxis.add(this.config, "xAxisLabelFontWeight", ['normal', 'bold', 'bolder', 'lighter']).onChange(v => {
      this.options.yAxis.axisLabel.fontWeight = v;
      this.options = Object.assign({}, this.options);
    });
    yAxis.add(this.config, "xAxisLabelFontSize", 12, 50).onChange(v => {
      this.options.yAxis.axisLabel.fontSize = v;
      this.options = Object.assign({}, this.options);
    });

    f2.addColor(this.config, "color").onChange(v => {
      this.options.color = v;
      this.options = Object.assign({},this.options);
    });
    f1.addColor(this.config, "fontColor").onChange(v => {
      this.options.series[0].label.color = v;
      this.options = Object.assign({}, this.options);
    });
    f1.add(this.config, 'rotate', -90, 90).onChange(v => {
      this.options.series[0].label.rotate = v;
      this.options = Object.assign({}, this.options);
    });
    f1.add(this.config, 'align', ["left", "center", "right"]).onChange(v => {
      this.options.series[0].label.align = v;
      this.options = Object.assign({}, this.options);
    });
    f1.add(this.config, 'verticalAlign', ["top", "middle", "bottom"]).onChange(v => {
      this.options.series[0].label.verticalAlign = v;
      this.options = Object.assign({}, this.options);
    });
    f1.add(this.config, 'position', posList).onChange(v => {
      this.options.series[0].label.position = v;
      this.options = Object.assign({}, this.options);
    });
    f1.add(this.config, 'distance', 0, 100).onChange(v => {
      this.options.series[0].label.distance = v;
      this.options = Object.assign({}, this.options);
    });
    console.log(this.chartConfig.nativeElement.appendChild(gui.domElement));

  }


}
