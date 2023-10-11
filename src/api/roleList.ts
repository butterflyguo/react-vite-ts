import request from '@/utils/request';
import {ResultData,Role} from "@/types/api"

export default {
    queryRoleList(params:Role.Params){
        return request.get<ResultData<Role.RoleItem>>('/roles/list',params)
    },
    queryRoleAdd(params:Role.CreateParams){
        return request.post('/roles/create',params)
    },
    queryRoleEdit(params:Role.EditParams) {
        return request.post('/roles/edit',params)
    },
    queryRoleDel(params:{_id:string}) {
        return request.post('/roles/delete',params)
    }
  
}