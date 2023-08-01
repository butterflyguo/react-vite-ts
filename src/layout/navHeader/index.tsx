import style from './index.module.css'
import { MenuFoldOutlined,MenuUnfoldOutlined} from '@ant-design/icons'
import { Breadcrumb, Switch, Dropdown } from 'antd'
import type { MenuProps } from 'antd';
import useStore from '@/store';
export default () => {
  const userInfo = useStore(state=>state.userInfo)
  const collapsed = useStore(state=>state.collapsed)
  const updateCollapsed = useStore(State=>State.updateCollapsed)
    const items:MenuProps['items'] = [{
        key:'1',
        label: <span>{userInfo.userEmail}</span>
    },{
        key:'2',
        label: <span>退出</span>
    }]
    const handleCollapesed = ()=>{
      updateCollapsed()
    }
  return (
    <div className={style.navHeader}>
      <div className={style.left}>
        <div onClick={handleCollapesed}>
        {collapsed?<MenuUnfoldOutlined />:<MenuFoldOutlined />}
        </div>
        <Breadcrumb items={[{ title: 'sample' }]} />
      </div>
      <div className={style.right}>
        <Switch checkedChildren='默认' unCheckedChildren='关闭' defaultChecked style={{ marginRight: 10 }} />
        <Dropdown menu={{ items }} placement='bottomLeft' arrow>
          <span>{userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}
