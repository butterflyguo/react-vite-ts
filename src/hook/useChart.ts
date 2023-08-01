import * as echarts from "echarts"
import { useRef,RefObject, useEffect,useState } from "react"
export const useChart = ():[RefObject<HTMLDivElement>,echarts.ECharts | undefined]=>{
    const chartRef = useRef<HTMLDivElement>(null)
    const [chartInstance,setChartInstance] = useState<echarts.ECharts>()
    useEffect(()=>{
        const chart =  echarts.init(chartRef.current as HTMLDivElement)
        setChartInstance(chart)
    },[])

    return [chartRef, chartInstance]
}