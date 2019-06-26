export class DashboardContainerModel{
    type:string;
    title:string;
    chartData:any;
    constructor(){
        this.type="";
        this.chartData={};
        this.title="";
    }
}