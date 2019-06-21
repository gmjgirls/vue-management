<template>
  <div class="goodsManage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2 class="goodsManage-title">商品管理</h2>
      </div>

      <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="所属分类">
          <el-select v-model="searchForm.classify" placeholder="请选择分类">
            <el-option label="全部分类" value="全部分类"></el-option>
            <el-option label="粮油" value="粮油"></el-option>
            <el-option label="零食" value="零食"></el-option>
            <el-option label="日用" value="日用"></el-option>
            <el-option label="烟酒" value="烟酒"></el-option>
            <el-option label="蔬菜" value="蔬菜"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="searchForm.keyWord" placeholder="商品名称或条形码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 分割线 -->
      <el-divider content-position="left">开欣超市</el-divider>

      <!-- 表单 -->
      <el-table ref="goodsManage" :data="goodsManage" tooltip-effect="dark">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="barCode" label="商品编码"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="classify" label="分类"></el-table-column>
        <el-table-column prop="goodsinprice" label="进价"></el-table-column>
        <el-table-column prop="goodsprice" label="售价"></el-table-column>
        <el-table-column prop="goodsNum" label="数量"></el-table-column>

        <el-table-column prop="manage" label="管理">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="handleEdit(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDelete(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="200"
        ></el-pagination>

        <!-- 修改表单模态框 -->
        <el-dialog title="修改商品" width="420px" :visible.sync="visible">
          <!-- 修改表单 -->
          <el-form ref="editForm" :model="editForm" style="width: 316px" :rules="rules">
            <!-- 账号 -->
            <el-form-item label="分类" prop="classify" label-width="120px">
              <el-input v-model="editForm.classify" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 名称 -->
            <el-form-item label="商品名称" prop="goodsName">
              <el-input type="text" v-model="editForm.goodsName" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <!-- 修改表单按钮 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入时间格式化模块
import moment from "moment";
//引入
import {
  goodsdel,
  goodsedit,
  getDataByPage,
  seveedit
} from "@/api/goods";

export default {
  data() {
    return {
      searchForm: {
        classify:'',
        keyWord:''
      },
      goodsManage: [],
      multipleSelection: [],
      visible: false, // 修改模态框的显示和隐藏状态
      total: 0, // 数据总条数
      currentPage: 1,
      pageSize: 3, // 每页条数,
      select: "",
      editForm: {
        // 修改表单
        classify: "",
        barCode: "",
        goodsName: "",
        goodsprice: "",
        goodsNum: "",
        member: ""
      },
      editId: "", //编辑
      rules: {
        // 验证规则
        account: [
          { required: true, message: "账号不能为空", trigger: "change" },
          { min: 3, max: 6, message: "长度3 ~ 6位", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //关键字查询 (模糊查询)
    search() {

      //直接调用分页函数
      this.getData();

      // 收集参数
      // let params = {
      //   classify: this.searchForm.classify,
      //   keyWord: this.searchForm.keyWord
      // };

      // //发送给后台
      // searchgoods(params)
      //   .then(res => {
      //     // console.log(res);
      //     // 接收参数
      //     let { data } = res;
          
      //      // 渲染
      //     this.goodsManage = data;

      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    //每页条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getData(); // 调用分页函数
    },
    //当前页页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getData(); // 3. 调用分页函数
    },

    // //分页函数
    getData() {
      //收集参数
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        classify: this.searchForm.classify,
        keyWord: this.searchForm.keyWord
      };
      getDataByPage(params)
        .then(res => {
          //接收数据
          let { data, total } = res;
          //渲染
          this.goodsManage = data;
          // console.log(data);

          this.total = total;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 单条删除
    handleDelete(id) {
      //优化删除体验
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })

        .then(() => {
          //确定走这里
          goodsdel({ id })
            .then(res => {
              //接收后端响应的数据
              let { code, reason } = res;
              //判断
              if (code === 0) {
                //弹成功提示
                this.$message({
                  type: "success",
                  message: reason
                });
                //刷新列表
                this.getData();
              } else if (code === 1) {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          //取消走这里
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // //编辑
    handleEdit(id) {
      //弹出模态框
      this.visible = true;
      // 保留id 这个id就是要修改的数据的id
      this.editId = id;

      goodsedit({ id })
        .then(res => {
          // 接收后端响应的数据
          let { data } = res;

          // 回填表单
          this.editForm.classify = data[0].classify;
          this.editForm.barCode = data[0].barCode;
          this.editForm.goodsName = data[0].goodsName;
          this.editForm.goodsprice = data[0].goodsprice;
          this.editForm.goodsNum = data[0].goodsNum;
          this.editForm.member = data[0].member;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存编辑
    saveEdit() {
      //调用前端验证
      this.$refs.editForm.validate(valid => {
        if (valid) {
          //隐藏模态框
          this.visible = false;

          // 收集参数
          let params = {
            classify: this.editForm.classify,
            goodsName: this.editForm.goodsName,
            id: this.editId
          };
          //发送数据给后端
          seveedit(params)
            .then(res => {
              let { code, reason } = res;

              //判断
              if (code === 0) {
                // 成功
                this.$message({
                  type: "success",
                  message: reason
                });

                this.getData(); // 重新请求一次数据 刷新列表
              } else if (code === 1) {
                // 失败
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    }
  },
  created() {
    this.getData(); // 1. 调用分页函数
  }
};
</script>

<style lang="less">
//大容器
.goodsManage {
  //表单标题的盒子
  .box-card {
    .el-card__header {
      background-color: #6f90c2;
      // 表单标题  添加商品
      .goodsManage-title {
        color: #fff;
        font-size: 16px;
      }
    }
    .el-pagination {
      margin-top: 20px;
    }
  }
}
</style>

