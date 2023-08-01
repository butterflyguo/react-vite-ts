import { Navigate, createHashRouter } from "react-router-dom";
import Login from '@/views/login/login';
import Welcome from '@/views/welcome';
import Error404 from '@/views/404.tsx';
import Error403 from '@/views/403.tsx';
import Layout from "@/layout/index";
import Dashboard from "@/views/dashboard";
import UserList from "@/views/system/user";
import DeptList from "@/views/system/dept";
const routers = [{
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
    }]
},
// {
//     path: '/',
//     element: <Navigate to='/welcome'></Navigate>
// },
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