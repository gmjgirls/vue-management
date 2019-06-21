<template>
  <div class="myhome">
    <el-container>
      <el-aside width="200px">
        <!-- 使用组件  左侧栏 -->
        <LeftNav></LeftNav>
      </el-aside>
      <el-container>
        <!-- 右侧内容 -->
        <!-- 头部 -->
        <el-header height="100px">
          <!-- 使用组件 -->
          <RightHeader></RightHeader>
        </el-header>

        <!-- 中间 -->
        <el-main>   

          <!-- <SystemInfo1></SystemInfo1>   -->

          <!-- 路由出口 -->
          <router-view></router-view>

        </el-main>

        <!-- 脚 -->
        <el-footer>
          <!-- 使用组件 -->
          <RightFooter></RightFooter>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//引入组件
import LeftNav from "@/components/LeftNav/LeftNav.vue"; //左侧栏
import RightHeader from "@/components/RightHeader/RightHeader.vue"; //右侧头部
import RightFooter from "@/components/RightFooter/RightFooter.vue"; //右侧页脚

export default {
  //注册组件
  components: {
    LeftNav,
    RightHeader,
    RightFooter
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less">
.myhome {
  height: 100%;
  // 大容器
  .el-container {
    height: 100%;

    //左侧栏
    .el-aside {
      background-color: #324157;
    }
    //右边
    .el-container {
      //上
      .el-header {
        background-color: #fff;
      }
      //中
      .el-main {
         background-color:#f0f0f0;
          .el-container{
              border:1px solid #ccc;
            .system-title{
              border:1px solid #ccc;
            }
          }
      }

      //下
      //   .el-footer{
      //     //   background-color: #b3c0d1;
      //   }
    }
  }
}
</style>
