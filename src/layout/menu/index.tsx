import { Menu,MenuProps } from 'antd'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons'
import style from './index.module.css'
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom'
import useStore from '@/store'
import {useEffect, useState} from 'react'
import{ Menu as IMenu} from '@/types/api'
import * as Icons from '@ant-design/icons'
import React from 'react'
export default () => {
  const [menuList,setMenuList] = useState<MenuItem[]>([])
  const [selectedKeys,setSelectKeys] = useState<string[]>([])
  const collapsed = useStore(state => state.collapsed)

  const navigate = useNavigate()
  const handleLogo = () => {
    navigate('/login')
  }
//定义菜单类型  ant-design 官网菜单组件复制而来
  type MenuItem = Required<MenuProps>['items'][number]
//生成每一个菜单项 ant-design 官网菜单组件复制而来
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
    ): MenuItem {
    return {
      label,
      key,
      icon,
      children,
      type
    } as MenuItem
  }
  //生成图表元素
  const createIcon = (name: string | undefined)=>{
    if(!name) return <></>
    const customerIcons: {[key:string]:any} = Icons
    const icon = customerIcons[name]
    if(!icon) return <></>
    return React.createElement(icon)
  }
  // 获取菜单数据 
  const data:any = useRouteLoaderData('layout')
  //生成菜单树
  const getTreeMenu = (menuList:IMenu.MenuItem[],treeList:MenuItem[] = [])=>{
    menuList.forEach((item,index) => {
      if(item.menuType === 1 && item.menuState === 1) {
        if(item.buttons)  return treeList.push(getItem(item.menuName,item.path || index, createIcon(item.icon)))
        treeList.push(getItem(item.menuName,item.path || index, createIcon(item.icon),getTreeMenu(item.children || [])))
      }
    });
    return treeList
  }
  //点击菜单
  const hanldeClickMenu = ({key}:{key:string})=>{
    setSelectKeys([key])
    navigate(key)
  }
  //获取当前页面路径
  const {pathname} = useLocation()
  useEffect(()=>{
  const list =   getTreeMenu(data.menuList)
  setMenuList(list)
  setSelectKeys([pathname])
  },[])
  return (
    <div>
      <div className={style.logo} onClick={handleLogo}>
        <img src='/imgs/logo.png' alt='' />
        <span>{collapsed ? '' : '暮暮货运'}</span>
      </div>
      <Menu theme='dark' mode='inline' selectedKeys={selectedKeys} items={menuList} onClick={hanldeClickMenu}/>
    </div>
  )
}
