export const formatMoney = (num?:number|string)=>{
    if(!num) return 0;
    let number = parseFloat(num.toString())
    return number.toLocaleString('zh-CN', { style:'currency',currency:'CNY' })
}
export const formatNum = (num?:number|string)=>{
    if(!num) return 0
    let number = num.toString()
    if(number.indexOf('.')>-1) {
        return number.replace(/(\d)(?=(\d{3})+\.)/g,'$1,')
    }
    return number.replace(/(\d)(?=(\d{3})+$)/g,'$1,')
}


export const formatDate = (date?:Date | string,rule?:string)=>{
    let curDate = new Date()
    if(date instanceof Date) curDate = date
    if(date) curDate = new Date(date)
    let fmt = rule || 'yyyy-MM-dd HH:mm:ss'
    fmt = fmt.replace(/(y+)/,curDate.getFullYear().toString())
    type oType = {
        [k:string]:number | string
    }
    const o:oType = {
        'M+': curDate.getMonth() + 1 > 9 ? curDate.getMonth() + 1: '0'+(curDate.getMonth() + 1),
        'd+':curDate.getDate() > 9 ? curDate.getDate() : '0' + curDate.getDate(),
        'H+':curDate.getHours()> 9 ? curDate.getHours() : '0' + curDate.getHours(),
        'm+':curDate.getMinutes()> 9 ? curDate.getMinutes() : '0' + curDate.getMinutes(),
        's+':curDate.getSeconds()> 9 ? curDate.getSeconds() : '0' + curDate.getSeconds()
    }
    for(const k in o) {
        fmt = fmt.replace(new RegExp(`${k}`),o[k].toString())
    }
    return fmt
}

export const toLocalDate = (date?:Date,rule?:string) => {
    let curDate = new Date()
    if(date) curDate = date
    const dateResult = curDate.toLocaleDateString().replace(/\//g,'-').split('-').map(v=> v.length===1?'0'+v:v).join('-')
    const timeResult = curDate.toLocaleTimeString().replace(/\//g,'-')
    if(rule === 'yyyy-MM-dd') return dateResult
    if(rule === 'HH:mm:ss') return timeResult
    return dateResult+' '+timeResult
}
//用户状态转换
export const formatState = (state:number) =>{
    if(state === 1) return '在职'
    if(state === 2) return '离职'
    if(state === 3) return '试用期'
}
//获取页面路径
import {Menu} from "@/types/api"
export const getMenuPath = (list:Menu.MenuItem[]):string[]=>{
    return list.reduce((result:string[],item:Menu.MenuItem)=>{
      return  result.concat(Array.isArray(item.children) && !item.buttons?getMenuPath(item.children):item.path+'')
    },[])
}