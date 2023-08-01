import request from '@/utils/request';
import {ResultData, Login,User} from "@/types/api"


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
  
}
