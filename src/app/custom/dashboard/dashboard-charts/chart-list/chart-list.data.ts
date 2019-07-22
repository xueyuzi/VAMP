import { BarComponent } from "../charts/bar.component";
import { LineComponent } from "../charts/line.component";
import { PieComponent } from "../charts/pie.component";
import { RadarComponent } from "../charts/radar.component";
import { BarNegativeComponent } from '../charts/bar-negative.component';
import { BarHorizontalstackComponent } from '../charts/bar-horizontalstack.component';
import { GaugeComponent } from '../charts/gauge.component';
import { FunnelComponent } from '../charts/funnel.component';
import { LinestackComponent } from '../charts/line-stack.component';
import { LineMultipleComponent } from '../charts/line-multiple.component';
import { PieCustomComponent } from '../charts/pie-custom.component';
import { MapComponent } from '../charts/map.component';
import { TextComponent } from '../charts/text.component';
import { BarHorizontalComponent } from '../charts/bar-horizontal.component';
export default {
    "pie": { label: "饼图", key: "pie", component: PieComponent, img: "assets/images/charts/pie.png" },
    "pie-custom": { label: "圆环图", key: "pie-custom", component: PieCustomComponent, img: "assets/images/charts/pie-custom.png" },
    "radar": { label: "雷达图", key: "radar", component: RadarComponent, img: "assets/images/charts/radar.png" },
    "bar": { label: "条形图", key: "bar", component: BarComponent, img: "assets/images/charts/bar.png" },
    "bar-negative": { label: "正负条形图", key: "bar-negative", component: BarNegativeComponent, img: "assets/images/charts/bar-negative.png" },
    "bar-horizontalstack": { label: "水平堆叠条形图", key: "bar-horizontalstack", component: BarHorizontalstackComponent, img: "assets/images/charts/bar-horizontalstack.png" },
    "bar-horizontal": { label: "水平条形图", key: "bar-horizontal", component: BarHorizontalComponent, img: "assets/images/charts/bar-horizontal.png" },
    "gauge": { label: "仪表盘", key: "gauge", component: GaugeComponent, img: "assets/images/charts/gauge.png" },
    "funnel": { label: "漏斗图", key: "funnel", component: FunnelComponent, img: "assets/images/charts/funnel.png" },
    "line": { label: "折线图", key: "line", component: LineComponent, img: "assets/images/charts/line.png" },
    "line-stack": { label: "堆叠折线图", key: "line-stack", component: LinestackComponent, img: "assets/images/charts/line-stack.png" },
    "line-multiple": { label: "交叉折线图", key: "line-multiple", component: LineMultipleComponent, img: "assets/images/charts/line-multiple.png" },
    "map": { label: "世界地图", key: "map", component: MapComponent, img: "assets/images/charts/world.jpg" },
    "text": { label: "文字", key: "text", component: TextComponent, img: "assets/images/charts/text.png" }
}