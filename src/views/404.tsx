
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

 function NotFound(){
    const navigate =   useNavigate()
    const handleBack = ()=>{
        navigate('/welcome')
       }
    return <Result status="404" title="NotFound" subTitle="您访问的资源不存在!" extra={[
        <Button type="primary" onClick={handleBack} key="console">返回首页</Button>
    ]}/>
}

export default NotFound