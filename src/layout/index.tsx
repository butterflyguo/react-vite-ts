
import React, { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import NavHeader from "./navHeader";
import Menu from './menu';
import { Outlet } from 'react-router-dom';
const {  Sider, Content } = Layout;
import  './index.less';
import api from "@/api/user";
import useStore from '@/store';
const App: React.FC = () => { 
    // const [userInfo,setUserInfo] = useState({})
    const store = useStore();
    const collapsed = useStore(state=>state.collapsed)
    console.log(collapsed,'collapsed')
    useEffect(()=>{
        api.queryUserInfo().then(res=>{
            console.log(res,'res')
            store.setUserInfo(res)
        })
    },[])
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{height: '100%'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
       <Menu />
      </Sider>
      <Layout>
        <NavHeader />
        <Content
          className="content"
           style= {{width: collapsed? 'calc(100vw - 80px)':'calc(100vw - 200px)'}}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;