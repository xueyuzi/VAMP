import { Injectable } from '@angular/core';
import * as dat from 'dat.gui';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  config: any;
  options: any;
  constructor() {
    this._initConfig();
  }
  generateEmptyGUI(){
    const gui = new dat.GUI({ autoPlace: false });
    return gui;
  }
  generateCommonGUI(options: any) {
    this.options = options;
    const gui = new dat.GUI({ autoPlace: false });
    const label = gui.addFolder('label设置');
    const global = gui.addFolder("全局设置");
    const xAxis = gui.addFolder("x轴");
    const yAxis = gui.addFolder("y轴");
    const legend = gui.addFolder("图例");
    this._legendConfig(legend);
    this._labelConfig(label);
    this._globalConfig(global);
    this._xAxisConfig(xAxis);
    this._yAxisConfig(yAxis);

    return gui;
  }
  _initConfig() {
    this.config = {
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
      legendShow: false,
      legendFontSize: 12,
      legendColor: "#FFFFFF",
      legendleft: 0,
      legendright: 0,
      legendtop: 0,
      legendbottom: 0,
      barWidth: 20,
      barCategoryGap: 20,
    };
  }
  _legendConfig(legend: any) {
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

    legend.add(this.config, "legendleft", 0, 100).onChange(v => {
      this.options.legend.left = v + "%";
      this.options = Object.assign({}, this.options);
    });
    legend.add(this.config, "legendtop", 0, 100).onChange(v => {
      this.options.legend.top = v + "%";
      this.options = Object.assign({}, this.options);
    });
    legend.add(this.config, "legendright", 0, 100).onChange(v => {
      this.options.legend.right = v + "%";
      this.options = Object.assign({}, this.options);
    });
    legend.add(this.config, "legendbottom", 0, 100).onChange(v => {
      this.options.legend.bottom = v + "%";
      this.options = Object.assign({}, this.options);
    });
  }
  _labelConfig(label: any) {
    const posList = [
      'left', 'right', 'top', 'bottom',
      'inside',
      'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
      'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
    ]

    label.addColor(this.config, "fontColor").onChange(v => {
      this.options.series[0].label.color = v;
      this.options = Object.assign({}, this.options);
    });
    label.add(this.config, 'rotate', -90, 90).onChange(v => {
      this.options.series[0].label.rotate = v;
      this.options = Object.assign({}, this.options);
    });
    label.add(this.config, 'align', ["left", "center", "right"]).onChange(v => {
      this.options.series[0].label.align = v;
      this.options = Object.assign({}, this.options);
    });
    label.add(this.config, 'verticalAlign', ["top", "middle", "bottom"]).onChange(v => {
      this.options.series[0].label.verticalAlign = v;
      this.options = Object.assign({}, this.options);
    });
    label.add(this.config, 'position', posList).onChange(v => {
      this.options.series[0].label.position = v;
      this.options = Object.assign({}, this.options);
    });
    label.add(this.config, 'distance', 0, 100).onChange(v => {
      this.options.series[0].label.distance = v;
      this.options = Object.assign({}, this.options);
    });
  }
  _globalConfig(global: any) {
    global.addColor(this.config, "color").onChange(v => {
      this.options.color = v;
      this.options = Object.assign({}, this.options);
    });
  }
  _xAxisConfig(xAxis: any) {
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
  }
  _yAxisConfig(yAxis: any) {
    yAxis.add(this.config, "yAxisShow", [true, false]).onChange(v => {
      v = v == "true" ? true : false;
      this.options.yAxis.show = v;
      this.options = Object.assign({}, this.options);
    });
    yAxis.add(this.config, "yAxisLabelShow", [true, false]).onChange(v => {
      v = v == "true" ? true : false;
      this.options.yAxis.axisLabel.show = v;
      this.options = Object.assign({}, this.options);
    });
    yAxis.add(this.config, "yAxisLabelFontStyle", ['normal', 'italic', 'oblique']).onChange(v => {
      this.options.yAxis.axisLabel.fontStyle = v
      this.options = Object.assign({}, this.options);
    });
    yAxis.add(this.config, "yAxisLabelFontWeight", ['normal', 'bold', 'bolder', 'lighter']).onChange(v => {
      this.options.yAxis.axisLabel.fontWeight = v;
      this.options = Object.assign({}, this.options);
    });
    yAxis.add(this.config, "yAxisLabelFontSize", 12, 50).onChange(v => {
      this.options.yAxis.axisLabel.fontSize = v;
      this.options = Object.assign({}, this.options);
    });
  }
}
