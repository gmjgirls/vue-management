<template>
  <div class="login">
    <!-- 登录界面容器 -->
    <div class="login-wraper">
      <h2 class="title">
        <i class="el-icon-user-solid"></i>开欣超市管理系统
      </h2>

      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px">
        <el-form-item label="用户名" prop="account">
          <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var confirmPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: "", //用户名
        password: "", //密码
        checkPass: "" //确认密码
      },
      //验证规则
      rules: {
        //账号
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }, //非空验证
          { min: 3, max: 8, message: "长度在3-8个字符", trigger: "blur" } //长度验证
        ],
        //密码
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }, //非空验证
          { min: 3, max: 8, message: "长度在3-8个字符", trigger: "blur" } //长度验证
        ],
        //确认密码
        checkPass: [
          { required: true, validator: confirmPwd, trigger: "blur" } //非空验证
        ]
      }
    };
  },

  methods: {
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //收集参数
          let params = {
            account: this.loginForm.account,
            password: this.loginForm.password
          };

          //把参数传给后端
          this.req
            .post(
              "http://127.0.0.1:666/login/checklogin",
              this.qs.stringify(params)
            )
            .then(response => {  
              //接收后端响应数据
              let { code, reason ,token} = response.data;
              if (code === 0) {
                //把token 传入本地存储
                window.localStorage.setItem('g_m_j_1117',response.data.token)
  
                this.$message({  //弹成功提示
                  type: "success",
                  message: reason
                });

             this.$router.replace('/home1') // 跳转后端首页

              } else if (code === 1) {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("前端验证不通过!");
          return false;
        }
      });
    },

    //重置
    resetForm() {
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>

<style lang="less">
@import "Login1.less";
</style>
