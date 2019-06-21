<template>
  <div class="systemInfo">
    <!-- 卡片组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 头标题 -->
        <span class="systemInfo-title">系统信息</span>
      </div>
      <div class="text item">
        <el-alert title="商品总数：5，已经销售的总金额：890:00.库存商品总价：111111" type="info" show-icon></el-alert>
        <el-alert title="导入数据" type="success" :closable="false" show-icon></el-alert>
      </div>

      <!-- 左右表格 -->
      <div>
        <el-row :gutter="30">
          <!-- 左侧表格 -->
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <h2 class="table-sales-title">销售排行</h2>

                <!-- 左表格 -->
              </div>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="goodsName" label="商品名称" width="300"></el-table-column>
                <el-table-column prop="salesNum" label="销量"></el-table-column>
              </el-table>
            </el-card>
          </el-col>

          <!-- 右侧表格 -->
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <h2 class="stockoutGoods-title">缺货的商品</h2>
                </div>
                <el-table :data="stockoutGoods" stripe style="width: 100%">
                  <el-table-column prop="goodsName" label="商品名称" width="180"></el-table-column>
                  <el-table-column prop="repertory" label="库存" width="180"></el-table-column>
                  <el-table-column prop="operation" label="操作"></el-table-column>
                </el-table>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 销量排行
      tableData: [
        {
          goodsName: "老干妈",
          salesNum: "4000"
        },
        {
          goodsName: "老干妈",
          salesNum: "4000"
        },
        {
          goodsName: "老干妈",
          salesNum: "4000"
        }
      ],

      //缺货的商品
      stockoutGoods: [
        { goodsName: "老干妈", repertory: "100", operation: "入库" }
      ]
    };
  }
};
</script>

<style lang="less">
.systemInfo {
  .box-card {
      h2{
          color:#fff;
          font-size: 16px;
      }
    .el-card__header {
      background-color: #6f90c2;
      .systemInfo-title {
        font-size: 20px;
        font-weight: bold;
        color: #fff;
      }
    }
    .el-card__body {
      .item {
        .el-alert--success.is-light {
          margin-top: 20px;
        }
        
      }
      .el-row {
          margin-top: 30px ;
          .el-col{
            .el-card.is-always-shadow{
              .el-card__header{
                padding:10px;
                background-color:#6e7580;
              }
            }
          }
        }
    }
  }
}
</style>
