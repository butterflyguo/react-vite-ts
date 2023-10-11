
export namespace Login {
    export interface params {
        userName: string,
        userPwd: string
    }
}
/**
 * 请求结果
 */
export interface Result<T = any> {
    code: number,
    data: T,
    msg: string
}
export interface ResultData<T = any> {
    list: Array<T>,
    page: {
        pageNum: number,
        pageSize: number,
        total: number
    }
}
export interface Pagination {
    pageNum: number,
    pageSize?: number
}
/**
 * 用户列表
 */
export namespace User {
    export interface UserItem {
        createId: number,
        deptId: string,
        deptName: string,
        job: string,
        mobile: string,
        role: number,
        roleList: string,
        state: number,
        userEmail: string,
        userName: string,
        userId: number,
        userImg: string,
        _id?: string,
        key?: string
    }
    export interface Params extends Pagination {
        userName?: string,
        state?: string,
        userId?: string
    }
    export interface CreateParams {
        userName: string,
        userEmail: string,
        mobile?: string,
        deptId?: string,
        state?: string,
        roleList?: string[],
        job?: string,
    }
    export interface EditParams extends CreateParams {
        userId: string
    }
}
/**
 * 菜单列表
 */
export namespace Menu {
    export interface Params {
        menuName?: string, //菜单名称
        menuState?:number//菜单状态1::正常2:停用
    }
    export interface CreateParams  {
        menuName?: string,
        icon?:string,//菜单图标
        menuType: number,//1:菜单2:按钮3:页面
        menuState: number,//1::正常2:停用
        menuCode?: string,//按钮权限标识
        parentId?:string,//父级菜单ID
        path?: string,//菜单路径
        component?:string,//组件名称
        orderBy?:number,//菜单排序
    }
    export interface MenuItem extends   CreateParams{
       _id: string,
       createTime: string,
       buttons?: MenuItem[],
       children?: MenuItem[]
    }
    export interface EditParams extends   CreateParams{
       _id: string
    }
}
/**
 * 角色列表
 */
export namespace Role {
    export interface Params extends Pagination{
        roleName?:string
    }
    export interface CreateParams {
        roleName: string,
        remark?:string
    }
    export interface RoleItem extends CreateParams{
        _id: string,
        permissionList: {
            checkedKeys: string[]
        },
        updateTime: string,
        createTune: string
    }
    export interface EditParams extends CreateParams{
        _id:string
    }
}
/**
 * 部门列表
 */
export namespace Dept {

    export interface CreateParams {
        _id?: string
        parentId?: string,
        deptName: string,
        userName: string
    }

    export interface DeptItem  {
        _id: string
        createTime: string
        updateTime: string
        deptName: string
        parentId: string
        userName: string
        children: DeptItem[]
    }
    export interface UserItem {
        _id: string,
        userId: number,
        userName: string,
        userEmail: string
    }
}
/**
 * 工作台
 */
export namespace Dashboard {
    export interface ReportData {
        driverCount: number,
        totalMoney: number,
        orderCount: number,
        cityNum: number
    }
    export type LineData = {
        label: string[],
        order: number[],
        money: number[]
    }
    export type PieData = object[]
    export interface RadarData {
        indicator: Array<{ name: string; max: number }>
        data: {
            name: string
            value: number[]
        }
    }

}

