import { create } from 'zustand';
import { User } from "@/types/api";

const useStore = create<{
    token: string,
    userInfo: User.UserItem
    collapsed: boolean,
    setUserInfo: (userInfo: User.UserItem)=> void,
    setToken: (token: string) => void,
    updateCollapsed: ()=>void
}>((set) => ({
    token: '',
    userInfo: {
        _id:'',
        deptId:'',
        job:'',
        mobile:'',
        role: 1,
        userEmail: "",
        userName: "",
        userId: 0,
        userImg:'',
        roleList: "",
        createId: 0,
        deptName:'',
        state:0
    },
    collapsed: true,
    setUserInfo: (userInfo: User.UserItem) => set( { userInfo }),
    setToken: (token: string)=> set( {token }),
    updateCollapsed:()=>set( state => ({collapsed : !state.collapsed}) )
  }))


  export default useStore