import user from './user'
import dashboard from './dashboard'
import userList from './userList'
import deptList from './deptList'
import menuList from './menuList'
import roleList from './roleList'
export default {
    ...user,
    ...dashboard,
    ...userList,
    ...deptList,
    ...menuList,
    ...roleList
}