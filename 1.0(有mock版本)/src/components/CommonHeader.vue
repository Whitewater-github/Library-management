<template>
  <div class="header-container">
    <div class="l-content">
      <el-button style="margin-right: 20px" @click="handMenu" icon="el-icon-menu" size="min"></el-button>
      <!--面包屑-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path:item.path}">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" src="../assets/user.jpg" alt="头像" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {};
  },
  methods: {
    handMenu() {
      this.$store.commit("collapseMenu");
    },
  },
  computed:{
    ...mapState({
      tags: state=>state.tab.tabsList
    })
  },
};
</script>
<style lang="less" scoped>
.header-container {
  padding: 20px;
  background-color:  #006699;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text {
  color: #fff;
  font-size: 14px;
  margin-left: 10px;
}
.r-content {
  .user {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
}
  .l-content{
    display:flex;
    align-items:center;
    /deep/.el-breadcrumb__item{
      .el-breadcrumb__inner{
        font-weight: normal;
        &.is-link{
          color:rgb(153, 152, 152)
        }
      }
      &:last-child{
        .el-breadcrumb__inner {
          color:#fff
        }
      }
  }
}
</style>
