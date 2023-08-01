
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

 function NotFound(){
    const navigate =   useNavigate()
    const handleBack = ()=>{
        navigate('/welcome')
       }
    return <Result status="403" title="NotFound" subTitle="抱歉!您没有权限访问该页面!" extra={[
        <Button type="primary" onClick={handleBack} key="console">返回首页</Button>
    ]}/>
}

export default NotFound