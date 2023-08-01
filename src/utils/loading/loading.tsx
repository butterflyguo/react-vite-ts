import {Spin} from 'antd'
import './loading.less'

export default ({tip='Loading',size='large'}:{tip?:string,size?:'large'|'small'|'default'})=>{
    return <Spin tip={tip} size={size} className='request-loading'>
        <div></div>
    </Spin>
}