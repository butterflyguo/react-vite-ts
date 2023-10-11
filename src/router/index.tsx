import { Navigate, createHashRouter } from "react-router-dom";
import Login from '@/views/login/login';
import Welcome from '@/views/welcome';
import Error404 from '@/views/404.tsx';
import Error403 from '@/views/403.tsx';
import Layout from "@/layout/index";
import Dashboard from "@/views/dashboard";
import UserList from "@/views/system/user";
import DeptList from "@/views/system/dept";
import MenuList from "@/views/system/menu";
import RoleList from "@/views/system/role";
import AuthLoader from "./AuthLoader.ts";
const routers = [{
    id:'layout',
    loader: AuthLoader,
    element: <Layout/>,
    children:[{
        path:'/welcome',
        element: <Welcome/>
    },{
        path:'/dashboard',
        element:<Dashboard/>
    },{
        path:'/userList',
        element:<UserList/>
    },{
        path:'/deptList',
        element:<DeptList/>
    },{
        path:'/menuList',
        element:<MenuList/>
    },{
        path:'/roleList',
        element:<RoleList/>
    }]
},
{
    path: '/',
    element: <Navigate to='/welcome'></Navigate>
},
{
    path:'/login',
    element: <Login/>
},{
    path:'*',
    element: <Navigate to="/404"></Navigate>
},{
    path:'/404',
    element: <Error404/>
},{
    path:'/403',
    element: <Error403/>
}]
export default createHashRouter(routers)