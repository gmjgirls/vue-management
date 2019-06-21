/* 负责商品请求的模块 */

//引入封装好的request.js
import req from '@/utils/request'


//商品添加
export function goodsadd(params) {
    return req.post('/goods/goodsadd' , params)
}

//商品列表数据
export function getDataByPage(params) {
    return req.get('/goods/goodslistbypage', params)
}

//单条删除
export function goodsdel(params) {
    return req.post('/goods/goodsdel' , params)
}


//编辑
export function goodsedit(params) {
    return req.post('/goods/goodsedit' , params)
}

//保存编辑
export function seveedit(params) {
    return req.post('/goods/seveedit' , params)
}
//模糊查询
// export function searchgoods(params) {
//     return req.get('/goods/searchgoods' , params)
// }
