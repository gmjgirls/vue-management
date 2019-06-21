<template>
  <div class="personal">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2 class="stockTotal-title">进货数据统计</h2>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.personal {
  //表单标题的盒子
  .box-card {
    .el-card__header {
      background-color: #6f90c2;
      // 表单标题  添加商品
      .stockTotal-title {
        color: #fff;
        font-size: 16px;
      }
    }
  }
}
</style>
