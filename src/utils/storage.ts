const localCache = {
    set:(key:string,value:any):void=>{
        localStorage.setItem(key,JSON.stringify(value))
    },
    get: (key:string)=> {
        const value = localStorage.getItem(key)
        if(!value) return ''
        try {
            return JSON.parse(value)
        }catch {
            return value
        }
        
    },
    remove: (key:string)=>{
        localStorage.removeItem(key)
    },
    clear: ()=>{
        localStorage.clear()
    }
}
const sessionCache = {
    set:(key:string,value:any):void=>{
        sessionStorage.setItem(key,JSON.parse(value))
    },
    get: (key:string)=> {
        const value = sessionStorage.getItem(key)
        if(!value) return ''
        try {
            return JSON.parse(value)
        }catch {
            return value
        }
        
    },
    remove: (key:string)=>{
        sessionStorage.removeItem(key)
    },
    clear: ()=>{
        sessionStorage.clear()
    }
}
export default {
    local: localCache,
    session: sessionCache
}