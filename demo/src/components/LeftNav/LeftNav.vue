<template>
  <div class="leftNav">
    <h5 class="title">开欣超市管理系统</h5>
    <el-menu default-active="$route.path" unique-opened text-color="#fff" router>
      <!-- 导航 -->
      <el-submenu :index="(i+1) + ''" v-for="(nav,i) in leftNav" :key="i">
        <template slot="title">
          <i :class="nav.iconCls"></i>
          <span>{{ nav.navTitle }}</span>
        </template>

        <el-menu-item
          v-for="(subNav,i) in nav.children"
          :key="i"
          :index="subNav.path"
        >{{subNav.navSubTitle}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftNav: [
        //导航一
        {
          iconCls: "el-icon-s-tools",
          navTitle: "系统信息",
          children: [
            { path: "/home1/systeminfo1", navSubTitle: "系统信息" },
            { path: "/home1/personal1", navSubTitle: "个人中心" },
            ]
        },

        //导航二
        {
          iconCls: "el-icon-s-order",
          navTitle: "账号管理",
          children: [
            { path: "/home1/accountmanage1", navSubTitle: "账号管理" },
            { path: "/home1/accountadd1", navSubTitle: "账号添加" },
            { path: "/home1/passwordmodify1", navSubTitle: "密码修改" }
          ]
        },
        // 导航3
        {
          iconCls: "el-icon-s-goods",
          navTitle: "商品管理",
          children: [
            { path: "/home1/goodsmanage1", navSubTitle: "商品管理" },
            { path: "/home1/goodsadd1", navSubTitle: "商品添加" }
          ]
        },
        // 导航4
        {
          iconCls: "el-icon-tickets",
          navTitle: "统计管理",
          children: [
            { path: "/home1/selltotal1", navSubTitle: "销售统计" },
            { path: "/home1/stocktotal1", navSubTitle: "进货统计" }
          ]
        }
      ]
    };
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
.el-aside {
  background-color: #324157;
  .title {
    color: #f3f3f3;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
  .el-menu {
    background-color: #324157;
    border-right: none;
  }
}
</style>
