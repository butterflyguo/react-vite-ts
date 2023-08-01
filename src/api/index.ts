import user from './user'
import dashboard from './dashboard'
import userList from './userList'
import deptList from './deptList'
export default {
    ...user,
    ...dashboard,
    ...userList,
    ...deptList
}