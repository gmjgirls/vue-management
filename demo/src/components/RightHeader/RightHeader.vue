<template>
  <div class="hh-header">
    <el-row>
      <el-col :span="12">
        <h2 class="title">欢迎您 admin</h2>
        <p class="look">查看详细的系统信息</p>
      </el-col>
      <el-col :span="12">
            <el-row>
                <el-col :span="18">
                    <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        王小虎<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                        <el-dropdown-item command="logout">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </el-col>                                       
                <el-col :span="6">
                    <div class="headPhoto">
                        <img src="./headPhoto.jpeg" alt="">
                    </div>
                </el-col>                                       
            </el-row>   
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    handleCommand(command){
      if(command === 'logout'){   //退出系统
          //清除token
          window.localStorage.removeItem('g_m_j_1117')

          //弹出提示信息
          this.$message({
            type:'success',
            message:'退出系统成功'
          })

          //跳转到登录界面
         setTimeout( () => {
            this.$router.replace('/login1') 
         },1000)
      }else if(command === 'personal'){  //个人中心

      }
    }
  }
  
};
</script>

<style lang="less">
.hh-header {
     margin-top: 20px;
  .el-row {
    & > .el-col {    
      .title {
        font-size: 24px;
        line-height: 50px;
      }
      .look {
        font-size: 16px;
        color: #838383;
      }
    }
    .el-col:last-child{
            text-align: right;
        .el-row{
            margin-top:20px;
            .el-col{
                .el-dropdown{
                    height: 60px;
                    line-height: 60px;
                }
            }
            .el-col{
                img{
                    width:50px;
                    height: 50px;
                    border-radius: 100%;
                    margin-right:60px;
                }
            }
        }
    }
  }
}
</style>
