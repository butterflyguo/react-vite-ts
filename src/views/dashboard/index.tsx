import useStore from '@/store'
import style from './index.module.less'
import { Descriptions, Card,Button } from 'antd'
import { useEffect } from 'react'
import { formatState, formatNum, formatMoney } from '@/utils/index'
import api from '@/api'
import { useState } from 'react'
import { Dashboard } from '@/types/api'
import { useChart } from '@/hook/useChart'
export default function () {
  const userInfo = useStore(state => state.userInfo)
  const [reportData, setReportData] = useState<Dashboard.ReportData>()
  const getReportData = async () => {
    const data = await api.queryReportData()
    setReportData(data)
  }
  const [lineRef, lineChart] = useChart()
  const [pieRef1, pieChart1] = useChart()
  const [pieRef2, pieChart2] = useChart()
  const [radarRef, radarChart] = useChart()
  //获取折线图数据并渲染图表
  const randerLineData = async () => {
    const data = await api.queryLineData()
    lineChart?.setOption({
      // title: {
      //   text: 'Beijing AQI',
      //   left: '1%'
      // },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '5%',
        right: '15%',
        bottom: '10%'
      },
      xAxis: {
        data: data?.label
      },
      yAxis: {
        type: 'value'
      },
      toolbox: {
        right: 10,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: [
        {
          startValue: '2014-06-01'
        },
        {
          type: 'inside'
        }
      ],

      legend: { data: ['订单', '流水'] },
      series: [
        {
          name: '订单',
          type: 'line',
          data: data?.order
        },
        {
          name: '流水',
          type: 'line',
          data: data?.money
        }
      ]
    })
  }
  //获取饼图数据并渲染图表
  const randerPieData1 = async () => {
    const data = await api.queryPieData1()
    pieChart1?.setOption({
      title: {
        text: '城市分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '80%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }
  const randerPieData2 = async () => {
    const data = await api.queryPieData2()
    pieChart2?.setOption({
      title: {
        text: '年龄分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['20%', '80%'],
          roseType: 'radius',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }
   //获取雷达图数据并渲染图表
  const randerRadarData = async () => {
    const data = await api.queryRadarData()
    radarChart?.setOption({
      title: {
        // text: '年龄分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        // orient: 'vertical',
        left: 'center'
      },
      radar: {
        // shape: 'circle',
        indicator: data?.indicator
      },
      series: [
        {
          name: '雷达图',
          type: 'radar',
          data: data.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }
  const randerPieData = ()=>{
    randerPieData1()
    randerPieData2()
  }
  useEffect(() => {
    getReportData()
    randerLineData()
    randerPieData1()
    randerPieData2()
    randerRadarData()
  }, [lineChart, pieChart1, pieChart2, radarChart])

  return (
    <div className={style.containerWarapper}>
      <div className={style.userinfo}>
        <img src={userInfo.userImg} alt='' className={style.userImg} />
        <Descriptions title='欢迎同学，每天都要开心！'>
          <Descriptions.Item label='用户ID'>{userInfo.userId}</Descriptions.Item>
          <Descriptions.Item label='邮箱'>{userInfo.userEmail}</Descriptions.Item>
          <Descriptions.Item label='状态'>{formatState(userInfo.state)}</Descriptions.Item>
          <Descriptions.Item label='手机号'>{userInfo.mobile}</Descriptions.Item>
          <Descriptions.Item label='岗位'>{userInfo.job}</Descriptions.Item>
          <Descriptions.Item label='部门'>{userInfo.deptName}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className={style.report}>
        <div className={style.card}>
          <div className='title'>司机数量</div>
          <div className={style.content}>{formatNum(reportData?.driverCount)}个</div>
        </div>
        <div className={style.card}>
          <div className='title'>总流水</div>
          <div className={style.content}>{formatMoney(reportData?.totalMoney)}元</div>
        </div>
        <div className={style.card}>
          <div className='title'>总订单</div>
          <div className={style.content}>{formatNum(reportData?.orderCount)}单</div>
        </div>
        <div className={style.card}>
          <div className='title'>开通城市</div>
          <div className={style.content}>{formatNum(reportData?.cityNum)}座</div>
        </div>
      </div>
      <div className={style.charts}>
        <Card title='订单和流水走势图' extra={<Button type="primary" onClick={randerLineData}>刷新</Button>}>
          <div className={style.chart} id='lineChart' ref={lineRef}></div>
        </Card>
      </div>
      <div className={style.charts}>
        <Card title='司机分布' extra={<Button type="primary" onClick={randerPieData}>刷新</Button>}>
          <div className={style.pies}>
            <div className={style.pieChart} id='pieChartCity' ref={pieRef1}></div>
            <div className={style.pieChart} id='pieChartAge' ref={pieRef2}></div>
          </div>
        </Card>
      </div>
      <div className={style.charts}>
        <Card title='模型诊断' extra={<Button type="primary" onClick={randerRadarData}>刷新</Button>}>
          <div className={style.chart} id='radarChart' ref={radarRef}></div>
        </Card>
      </div>
    </div>
  )
}
