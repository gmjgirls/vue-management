<template>
    <div class="sellTotal">
          <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2 class="sellTotal-title">销货数据统计</h2>
      </div>
    </el-card>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
    .sellTotal {
  //表单标题的盒子
  .box-card {
    .el-card__header {
      background-color: #6f90c2;
      // 表单标题  添加商品
      .sellTotal-title {
        color: #fff;
        font-size: 16px;
      }
    }
  }
}
</style>
