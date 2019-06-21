import axios from 'axios';
import qs from 'qs';
// 引入本地存储封装
import local from '@/utils/local'

// 设置请求默认服务器地址
axios.defaults.baseURL = 'http://127.0.0.1:666'


/* 
    在axios的请求发送出去之前，头部携带token
*/
axios.interceptors.request.use(config => {
    // 获取token
    let token = local.get('g_m_j_1117')

    // 给头部携带token
    config.headers.authorization = `Bearer ${token}` 
    return config
})

export default {
    get (url, params = {}){
        return new Promise( (resolve,reject) => {
            axios.get ( url , {params})
                .then(response => {
                    resolve(response.data)  //成功
                })
                .catch( err => {
                    reject(err)   //失败
                })
        })
    },

    post( url, parmas ={}){
        return new Promise( (resolve,reject) => {
            axios.post(url, qs.stringify(parmas))

                .then( response => {
                    resolve(response.data)
                })
                .catch( err => {
                    reject(err)  //失败
                })
        })
    }
}