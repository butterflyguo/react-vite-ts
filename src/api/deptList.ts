import request from "@/utils/request"
import { Dept, ResultData } from "@/types/api"
function queryDeptList(params?:object) {
   return request.get<Dept.DeptItem[]>('/dept/list',params)
}
function queryAllUsers() {
   return request.get<Dept.UserItem[]>('/users/all/list')
}
function queryAddDept(params:Dept.CreateParams) {
   return request.post<ResultData>('/dept/create',params)
}
function queryEditDept(params:Dept.CreateParams) {
   return request.post<ResultData>('/dept/edit',params)
}
function queryDelete(params:string) {
   return request.post<ResultData>('/dept/delete',{_id:params})
}
export default {
    queryDeptList,
    queryAllUsers,
    queryAddDept,
    queryEditDept,
    queryDelete
}