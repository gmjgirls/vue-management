<template>
  <div class="stockTotal">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2 class="stockTotal-title">个人中心</h2>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
    
};
</script>

<style lang="less">
.stockTotal {
  //表单标题的盒子
  .box-card {
    .el-card__header {
      background-color: #6f90c2;
      // 表单标题  个人中心
      .stockTotal-title {
        color: #fff;
        font-size: 16px;
      }
    }
  }
}
</style>
