import { MutableRefObject } from "react"
import { User,Dept } from "@/types/api"

export type IAction = 'create' | 'edit' | 'delete'
export type DataType = User.UserItem | Dept.DeptItem | undefined
export interface IModalProp {
    mRef: MutableRefObject<{
    open: (typ: IAction, data?: any) => void} | undefined>,
    update: () => void,
    data?: any
}