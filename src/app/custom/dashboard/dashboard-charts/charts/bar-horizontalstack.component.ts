import { Component, OnInit } from '@angular/core';
import { BaseChartComponent } from './base-charts.component';

@Component({
    selector: 'ngx-bar-horizontalstack',
    templateUrl: "base-charts.component.html"
})
export class BarHorizontalstackComponent extends BaseChartComponent implements OnInit {
    constructor() {
        super();
    }
    options = {
        dataset: {
            source: [
                { key: "周一", "直接访问": 320, "邮件营销": 120, "联盟广告": 220, "视频广告": 150, "搜索引擎": 820 },
                { key: "周二", "直接访问": 302, "邮件营销": 132, "联盟广告": 182, "视频广告": 212, "搜索引擎": 832 },
                { key: "周三", "直接访问": 301, "邮件营销": 101, "联盟广告": 191, "视频广告": 154, "搜索引擎": 901 },
                { key: "周四", "直接访问": 334, "邮件营销": 134, "联盟广告": 234, "视频广告": 190, "搜索引擎": 934 },
                { key: "周五", "直接访问": 390, "邮件营销": 90, "联盟广告": 290, "视频广告": 410, "搜索引擎": 1290 },
                { key: "周六", "直接访问": 320, "邮件营销": 230, "联盟广告": 330, "视频广告": 330, "搜索引擎": 1330 },
                { key: "周日", "直接访问": 330, "邮件营销": 210, "联盟广告": 310, "视频广告": 150, "搜索引擎": 1320 },
            ]
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            show: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
        },
        series: [
            {
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
            },
            {
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },

            },
            {
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },

            },
            {
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
            },
            {
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
            }
        ]
    };

    ngOnInit() {
    }
}
