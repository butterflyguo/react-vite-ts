import request from '@/utils/request';
import {ResultData,User} from "@/types/api";

export default {
    //获取用户列表
    queryUserList(params?:User.Params) {
        return request.get<ResultData>('/users/list',params)
    },
 
    //新增用户列表
    queryAdd(params?:User.CreateParams) {
        return request.post<ResultData>('/users/create',params)
    },
 
 
    //修改用户列表
    queryEdit(params?:User.EditParams) {
        return request.post<ResultData>('/users/edit',params)
    },
 
    //删除或批量删除用户列表
    queryDelete(params?:{
        userIds:number[]
    }) {
        return request.post<ResultData>('/users/delete',params)
    },
 
}