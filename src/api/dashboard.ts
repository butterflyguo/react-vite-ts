import request from '@/utils/request';
import {Dashboard} from "@/types/api";

export default {
    //获取工作台统计数据
    queryReportData() {
        return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
    },
    //获取折线图标数据
    queryLineData() {
        return request.get<Dashboard.LineData>('/order/dashboard/getLineData')
    },
    //获取饼图1数据
    queryPieData1() {
        return request.get<Dashboard.PieData>('/order/dashboard/getPieCityData')
    },
    //获取饼图2数据
    queryPieData2() {
        return request.get<Dashboard.PieData>('/order/dashboard/getPieAgeData')
    },
    //获取雷达图数据
    queryRadarData() {
        return request.get<Dashboard.RadarData>('/order/dashboard/getRadarData')
    }
}