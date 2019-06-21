<template>
  <div class="accountAdd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2 class="accountAdd-title">添加账号</h2>
      </div>

      <!-- 表单 -->
      <el-form
        :model="accountAddForm"
        status-icon
        :rules="rules"
        ref="accountAddForm"
      >
        <el-form-item label="用户名" prop="account">
          <el-input type="account" v-model="accountAddForm.account" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="accountAddForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="accountAddForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="选择用户组">
          <el-select v-model="accountAddForm.userGroup" placeholder="选择用户组">
            <el-option label="普通用户" value="普通用户"></el-option>
            <el-option label="超级管理员" value="超级管理员"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">确认添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

//引入工具函数
import {pwdReg} from '@/utils/reg'

//引入api请求文件
import { accountadd } from '@/api/account'

export default {
  data() {
    //自定义验证函数
    //密码
    const checkPwd = (rule, value, callback) => {
      //获取长度
      let len = value.length;

      if (value === "") {
        callback(new Error('密码不能为空'));
      } else if (len < 3 || len > 5) {
        callback(new Error('密码长度为3~5位'));
      } else if (!pwdReg(value)) {
        callback(new Error('只能输入数字和字母'));
      } else {
        if (this.accountAddForm.checkPass !== "") {
          //再次发出一次性验证
          this.$refs.accountAddForm.validateField("checkPass");
        }
        callback()
      }
    }
    //确认密码
    const confirmPwd = (rule, value, callback) => {
      if( value === ''){
        callback(new Error('请再次输入密码'))
      }else if(value !== this.accountAddForm.password){
        callback(new Error('两次密码输入不一致'))
      }else{
         callback();
      } 
    }
    return {
      //添加账号和表单数据（和表单双向绑定）
      accountAddForm:{
        account:'',
        password:'',
        checkPass:'',
        userGroup:''
      },
      // 验证规则
      rules:{
        //账号
        account:[
          { required:true, message:'请输入账号' ,trigger: 'blur'},
          { min:3, max:5 , message:'长度在3~5个字符',trigger: 'blur'},    
        ],
        //密码
        password:[
          { required:true, validator : checkPwd, trigger: 'blur'} //自定义验证
        ],
        //确认密码
        checkPass:[
          {required:true, validator : confirmPwd, trigger: 'blur'} //自定义验证
        ],
        //用户组
        userGroup:[
          {required:true, message:'请选择用户组', trigger:'change'},
        ]
      }
    }   
  },
  methods:{
    //提交
    submitForm(){
      //获取整个表单，调用验证方法
      this.$refs.accountAddForm.validate(( valid) => {  //所有前端验证通过 valid:true, 否则valid: false
        if(valid){
          //收集参数
          let params = {
            account:this.accountAddForm.account,
            password:this.accountAddForm.password,
            userGroup:this.accountAddForm.userGroup
          }

          //发送给后端
         accountadd( params )
              .then(  res => {
               
                //接收后端响应数据
                let {code,reason} = res;
                
                //判断
                if(code === 0 ){  //成功
                  this.$message({  //弹成功提示
                      message:reason,
                      type:'success'
                  })
                  this.$router.push('/home1/accountmanage1')  //跳到账号管理
                  
                }else if(code === 1){  //失败
                  this.$message.error(reason)  //弹失败提示
                }
              })
              .catch( err => {
                console.log(err)
              })
        }else{
          console.log('前端验证不通过，不允许提交')
          return false;
        }
      })
    }
  }
 
};
</script>


<style lang="less">
.accountAdd {
  // 卡片容器
  .box-card {
    //添加账号标题的框
    .el-card__header {
      background-color: #6f90c2;

      //添加账号标题
      .accountAdd-title {
        color: #fff;
        font-size: 18px;
      }
    }
    //表单
    //表单大盒子
    .el-card__body {
      //form表单
      .el-form {
        //表单的每个框
        .el-form-item {
          width: 500px;
        }
      }
    }
  }
}
</style>
