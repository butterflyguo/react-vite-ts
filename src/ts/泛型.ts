function func<T>(arg:T):T {
    return arg
}
func<number>(1)

interface Father {
    sing: string,
    money: number
}
interface Person extends Father{
    [k:string]:string|number|boolean
}
type MoneyType = Pick<Father, 'money'>
const p1:Person = {
    name:'张三',
    sing:'哈哈',
    money: 10
}
const p2:Person = {
    name:'张三',
    age: 10,
    sing:'嘿嘿',
    money:20
}

const Package:MoneyType = {
    money: 5
}

type K = keyof Father;
interface New {
    [k:string]:K
}

const jack = {name:'jack', age:30, class:'1',show: false}
type User1 = typeof jack;

const tom:User1 = {
    name:'tom',
    age:10,
    class:'2',
    show: true
}