
/* 
  负责账号管理模块的请求  
*/

//引入封装好的request.js
import req from '@/utils/request'


//账号添加
export function accountadd(params) {
    return req.post('/account/accountadd' , params)
}

//密码修改
export function checkoldpass(params) {
  return req.post('/account/checkoldpass' , params)
}

//编辑回填
export function accountedit(params) {
  return req.get('/account/accountedit' , params)
}

//编辑保存
export function saveedit(params) {
  return req.post('/account/saveedit' , params)
}

//单条删除
export function accountdel(params) {
  return req.get('/account/accountdel' , params)
}

//批量删除
export function batchdelete(params) {
  return req.get('/account/batchdelete' , params)
}


//分页请求
export function accountlistbypage(params) {
  return req.get('/account/accountlistbypage' , params)
}

