import api from "@/api"
import { getMenuPath } from "@/utils"

export default async function authLoader(){
    const data = await  api.queryPermissionList()
    const pathList = getMenuPath(data.menuList)
    return {
        buttonList: data.buttonList,
        menuList: data.menuList,
        pathList: pathList
    }
}