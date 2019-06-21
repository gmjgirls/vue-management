<template>
  <div class="passwordModify">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 标题 -->
        <h2 class="passwordModify-title">账号密码修改</h2>
      </div>
      <el-form
        :model="passwordModify"
        status-icon
        :rules="rules"
        ref="passwordModify"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldPass">
          <el-input type="password" v-model="passwordModify.oldPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="newPass1">
          <el-input type="password" v-model="passwordModify.newPass1" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="newPass2">
          <el-input type="password" v-model="passwordModify.newPass2" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="submitForm()">修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入工具函数
import { pwdReg } from '@/utils/reg'
//引入请求函数
import { checkoldpass } from '@/utils/api'

export default {
  data() {

      //自定义验证函数
      //旧密码
      const checkOldPwd = ( rule, value, callback) => {
          if( value === ''){
                callback(new Error ( '旧密码不能为空' ))
          }else{
            //把旧密码发送给后台
            checkoldpass({oldPass:value})
          }
      }

      //新密码1
        const checkNewPwd =  (rule, value, callback) => {
            //获取长度
            let len = value.length
            
            if( value === ""){
                callback(new Error ( '密码不能为空' ))
            } else if( len < 3 || len > 5){
                callback( new Error('密码长度为3~5位'))
            } else if( value === this.passwordModify.value){
                if( this.passwordModify.newPass2 !==""){
                    //再一次发起验证
                    this.$refs.passwordModify.validateField('newPass2')
                }              
            }else{
              callback();
            }
        };

        //新密码2
        const confirmPwd = ( rule, value, callback) => {
            if( value === ""){
                callback( new Error( '密码不能为空'));
            }else if( value !== this.passwordModify.newPass1 ){
                callback( new Error( '两次密码输入不一致' ));
            }else{
                callback();
            }
        };

    return {
      passwordModify: {
        oldPass: "",
        newPass1: "",
        newPass2: ""
      },
      rules: {
          //旧密码
            oldPass:[
                { required: true, validator: checkOldPwd,message:'请填写原来的密码', trigger:'blur'}
            ],
          //新密码1
            newPass1:[
                { required: true,validator: checkNewPwd,trigger:'blur'}
            ],
          //新密码2
            newPass2:[
                { required: true,validator: confirmPwd, trigger:'blur'}
            ]

      }
    };
  },
  methods:{
      submitForm(){
        this.$refs.passwordModify.validate
        ( (valid) => {
             if(valid){
              //获取表单，调用验证方法
          let params ={
              oldPass: this.passwordModify.oldPass,  //旧密码
              newPass1: this.passwordModify.newPass1,  //新密码
              newPass2: this.passwordModify.newPass2   //新密码
          }

          //发送给后台
          console.log(params)
          alert('修改成功')
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
.passwordModify {
  .box-card {
    .el-card__header {
      background-color: #6f90c2;
      .passwordModify-title {
        color: #fff;
        font-size: 16px;
      }
    }
    .el-form{
        width:500px;
    }

  }
}
</style>
 