const name:string = 'jack'
const age: number  = 30 
const isTrue: boolean = false
const b: null = null
const num: bigint = 100n

const list1:number[] = [1,2,3,4]

const list2:[number,string,boolean,number]= [1,'2',false,4]

const list3:Array<number>=[1,2,3,4]
const list4:Array<any>=[1,'2',false,4]

const list5:Array<{name:string,age:number}> = [{name:'jack',age:10},{name:'ross',age:23}]

interface User {
    name: string,
    age: number
}
const list6:Array<User> = [{name:'jack',age:10},{name:'ross',age:23}]



function add1  (a:number,b:number):number {
    return a+b
}

const add2 = (a:number,b:number):number=>{
    return a+b
}

const add3:(a:number,b:number)=>number = (a,b)=>{
    return a+b
}