import request from "@/utils/request"
import { Menu, ResultData } from "@/types/api"
function queryMenuList(params?:Menu.Params) {
   return request.get<Menu.MenuItem[]>('/menu/list',params)
}
function queryAddMenu(params:Menu.CreateParams) {
   return request.post<ResultData>('/menu/create',params)
}
function queryEditMenu(params:Menu.CreateParams) {
   return request.post<ResultData>('/menu/edit',params)
}
function queryDelete(params:string) {
   return request.post<ResultData>('/menu/delete',{_id:params})
}
export default {
    queryMenuList,
    queryAddMenu,
    queryEditMenu,
    queryDelete
}