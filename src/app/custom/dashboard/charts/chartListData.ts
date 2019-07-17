import { BarComponent } from "./bar.component";
import { LineComponent } from "./line.component";
import { PieComponent } from "./pie.component";
import { RadarComponent } from "./radar.component";
import { BarNegativeComponent } from './bar-negative.component';
import { BarHorizontalstackComponent } from './bar-horizontalstack.component';
import { GaugeComponent } from './gauge.component';
import { FunnelComponent } from './funnel.component';
import { LinestackComponent } from './line-stack.component';
import { LineMultipleComponent } from './line-multiple.component';
export default {
    "pie": { label: "饼图", key: "pie", component: PieComponent, img: "assets/images/charts/pie.png" },
    "radar": { label: "雷达图", key: "radar", component: RadarComponent, img: "assets/images/charts/radar.png" },
    "bar": { label: "条形图", key: "bar", component: BarComponent, img: "assets/images/charts/bar.png" },
    "bar-negative": { label: "正负条形图", key: "bar-negative", component: BarNegativeComponent, img: "assets/images/charts/bar-negative.png" },
    "bar-horizontalstack": { label: "水平堆叠条形图", key: "bar-horizontalstack", component: BarHorizontalstackComponent, img: "assets/images/charts/bar-horizontalstack.png" },
    "gauge": { label: "仪表盘", key: "gauge", component: GaugeComponent, img: "assets/images/charts/gauge.png" },
    "funnel": { label: "漏斗图", key: "funnel", component: FunnelComponent, img: "assets/images/charts/funnel.png" },
    "line": { label: "折线图", key: "line", component: LineComponent, img: "assets/images/charts/line.png" },
    "line-stack": { label: "堆叠折线图", key: "line-stack", component: LinestackComponent, img: "assets/images/charts/line-stack.png" },
    "line-multiple": { label: "交叉折线图", key: "line-multiple", component: LineMultipleComponent, img: "assets/images/charts/line-multiple.png" }
}