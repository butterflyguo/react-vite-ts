import { Button, Checkbox, Form, Input } from 'antd'
import style from './login.module.css'
import api from '@/api/user'
import storage from '@/utils/storage';
export default function () {
  const onFinish = (values: any) => {
    api.login(values).then(res => {
      storage.local.set('token',res)
      const params = new URLSearchParams(location.search);
      setTimeout(() => {
        location.href = params.get('callback') || '#/welcome'
      })
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    // <UserContext.Consumer>
      <div className={style.login}>
        <div className={style.loginWrapper}>
          <div className={style.title}>系统登录</div>
          <Form
            name='basic'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item name='userName' rules={[{ required: true, message: '请输入用户名!' }]}>
              <Input />
            </Form.Item>

            <Form.Item name='userPwd' rules={[{ required: true, message: '请输入密码!' }]}>
              <Input.Password />
            </Form.Item>

            <Form.Item name='remember' valuePropName='checked'>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    // </UserContext.Consumer>
  )
}
