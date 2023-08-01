import ReactDom from 'react-dom/client';
import Loading from './loading';

let count = 0; //多个请求只展示一个loading
export const showLoading = ()=>{
    if(count === 0) {
        const loading =  document.createElement('div');
        loading.setAttribute('id','loading')
        document.body.appendChild(loading)
        ReactDom.createRoot(loading).render(<Loading/>)
    }
        count++
}

export const hideLoading = ()=>{
    if(count <0) return
    count--;
    if(count === 0) {
        const loading =  document.getElementById('loading') as HTMLElement;
        document.body.removeChild(loading)
    }
}