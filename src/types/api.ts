
export namespace Login {
    export interface params {
        userName: string,
        userPwd: string
    }
}
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

