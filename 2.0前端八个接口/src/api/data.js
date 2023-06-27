import axios from '../utils/request'
export function addBook(params) {
    return axios({
        url:'/addbook',
        method:'post',
        data:params
    })
}
export function deleteBook(params) {
    return axios({
        url:'/deletebook',
        method:'get',
        params:params
    })
    
}
//得到所有图书信息
export function getBook(params) {
    return axios({
        url:'/findallbook',
        method:'get',
        params:params
    })
    
}
//查找图书
export function findBook(params) {
    return axios({
        url:'/findbybookname',
        method:'get',
        params:params
    })
    
}
//改
export function updataBook(params) {
    return axios({
        url:'/updatabook',
        method:'post',
        data:params
    })
    
}
export function reBook(params) {
    return axios({
        url:'/rebook',
        method:'post',
        data:params
    })
    
}
export function borrowBook(params) {
    return axios({
        url:'/borrowbook',
        method:'post',
        data:params
    })
    
}
export function login(params) {
    return axios({
        url:'/login',
        method:'post',
        data:params
    })
    
}
export function register(params) {
    return axios({
        url:'/register',
        method:'post',
        data:params
    })
    
}