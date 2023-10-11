import { MutableRefObject } from "react"
import { User,Dept } from "@/types/api"

export type IAction = 'create' | 'edit' | 'delete'

export interface IModalProp<T = User.UserItem> {
    mRef: MutableRefObject<{
    open: (typ: IAction, data:T) => void} | undefined>,
    update: () => void,
    data?: any
}