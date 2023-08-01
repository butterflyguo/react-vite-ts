const list:[number,string,boolean] = [1,'1',true]


//交叉类型
type Base = {name:string,age:number}
type Can = {show:boolean}
const obj1:Base = {name:'张三',age:10}
const obj2:Base & Can = {name:'李四',age:20,show:true}
const obj3:Base | Can = {name:'李四',age:20}


interface Ai  {
    name:string,age:number
}
interface Bi  {
    show:boolean
}

const obj4:Ai & Bi = {
    name:'李四',age:20,show:true
}


