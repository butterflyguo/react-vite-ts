import { Menu } from 'antd'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import style from './index.module.css'
import { useNavigate } from 'react-router-dom'
import useStore from "@/store"
export default () => {
  const collapsed =  useStore(state=>state.collapsed)
  const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: '工作台'
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: '系统管理',
      children: [
        {
          key: '3',
          icon: <UserOutlined />,
          label: '用户管理'
        },
        {
          key: '4',
          icon: <UserOutlined />,
          label: '权限管理'
        }
      ]
    }
  ]
  const navigate = useNavigate()
  const handleLogo = () => {
    navigate('/login')
  }
  return (
    <div>
      <div className={style.logo} onClick={handleLogo}>
        <img src='/imgs/logo.png' alt='' />
        <span>{collapsed?'':'暮暮货运'}</span>
      </div>
      <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} items={items} />
    </div>
  )
}
