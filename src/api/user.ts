import request from '@/utils/request';
import {ResultData, Login,User,Menu} from "@/types/api"


export default {
    login(params:Login.params) {
        return request.post<string>('/users/login',params, {
            headers: {
                isToken: true
            }
        })
    },
    queryUserInfo()  {
        return request.get<ResultData<User.UserItem>>('/users/getUserInfo')
    },
    //获取权限列表
    queryPermissionList(){
        return request.get<{buttonList:string[],menuList:Menu.MenuItem[]}>('/users/getPermissionList')
    }
  
}
