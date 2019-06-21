<template>
  <div class="goodsAdd">
    <el-card class="box-card">
      <!-- 标题部分 -->
      <div slot="header" class="clearfix">
        <h2 class="goodsAdd-title">添加商品</h2>
      </div>

      <!-- 表单 -->
      <el-form
        :model="goodsAddForm"
        status-icon
        :rules="rules"
        ref="goodsAddForm"
        label-width="100px"
      >
        <!-- 所属分类 -->
        <el-form-item label="所属分类" prop="classify">
          <el-select v-model="goodsAddForm.classify" placeholder="请选择所属分类">
            <el-option label="粮油" value="粮油"></el-option>
            <el-option label="零食" value="零食"></el-option>
            <el-option label="日用" value="日用"></el-option>
            <el-option label="烟酒" value="烟酒"></el-option>
            <el-option label="蔬菜" value="蔬菜"></el-option>
          </el-select>
        </el-form-item>

        <!-- 商品条形码 -->
        <el-form-item label="商品条形码" prop="barCode">
          <el-input type="text" v-model="goodsAddForm.barCode" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 商品名称 -->
        <el-form-item label="商品名称" prop="goodsName">
          <el-input type="text" v-model="goodsAddForm.goodsName" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 商品进价 -->
        <el-form-item label="商品进价" prop="goodsinprice">
          <el-input v-model="goodsAddForm.goodsinprice"></el-input>
        </el-form-item>

        <!-- 商品售价 -->
        <el-form-item label="商品售价" prop="goodsprice">
          <el-input v-model="goodsAddForm.goodsprice"></el-input>
        </el-form-item>

        <!--商品数量  -->
        <el-form-item label="商品数量" prop="goodsNum">
          <el-input v-model="goodsAddForm.goodsNum"></el-input>
        </el-form-item>

        <!-- 会员优惠 -->
        <el-form-item label="会员优惠：" prop="member">
          <el-radio-group v-model="goodsAddForm.member">
            <el-radio label="不享受"></el-radio>
            <el-radio label="享受"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="margin-top:20px;">
          <el-button type="primary" @click="submitForm()">确认添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>


<script>
//引入api请求文件
import { goodsadd } from "@/api/goods";

export default {
  data() {
    return {
      goodsAddForm: {
        classify: "", //分类
        barCode: "", //条形码
        goodsName: "", //商品名称
        goodsprice: "", //商品售价1
        goodsNum: "", //商品数量
        goodsinprice: "", //商品进价
        radio: "1", //单选框
        member: ""
      },
      //验证规则
      rules: {
        //分类
        classify: [
          { required: true, message: "请选择分类", trigger: "change" } //非空验证
        ],
        //条形码
        barCode: [
          { required: true, message: "请输入条形码", trigger: "blur" } //非空验证
        ],
        //商品名称
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" } //非空验证
        ],
        //商品售价1
        goodsprice: [
          { required: true, message: "请输入商品售价", trigger: "blur" } //非空验证
        ],
        //商品数量
        goodsNum: [
          { required: true, message: "请输入商品数量", trigger: "blur" } //非空验证
        ],
        //商品进价
        goodsinprice: [
          { required: true, message: "请输入商品进价", trigger: "blur" } //非空验证
        ]
      }
    };
  },
  methods: {
    //确认添加
    submitForm() {
      //获取整个表单,调用验证方法
      this.$refs.goodsAddForm.validate(valid => {
        if (valid) {
          //收集参数
          //收集参数
          let params = {
            classify: this.goodsAddForm.classify,
            barCode: this.goodsAddForm.barCode,
            goodsName: this.goodsAddForm.goodsName,
            goodsinprice: this.goodsAddForm.goodsinprice,
            goodsprice: this.goodsAddForm.goodsprice,
            goodsNum: this.goodsAddForm.goodsNum,
            member: this.goodsAddForm.member,

          };
          //发送给后端
          goodsadd(params)
            .then(res => {
              //接收后端数据
              let { code, reason} = res;

              //判断
              if (code === 0) {
                this.$message({
                  message: reason,   //弹成功提示
                  type: 'success'
                });

                this.$router.push('/home1/goodsmanage1'); //跳到商品管理
               
              } else if (code === 1) {
                this.$message.error(reason); //弹失败提示
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("前端验证不通过");
          return false;
        }
      })
    }
  }
};
</script>

<style lang="less">
//大容器
.goodsAdd {
  .el-card {
    //添加商品标题盒子
    .el-card__header {
      background-color: #6f90c2;

      //添加商品标题
      .goodsAdd-title {
        color: #fff;
        font-size: 16px;
      }
    }
    .el-form {
      .el-form-item {
        width: 500px;
      }
    }
  }
}
</style>
