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
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/user.jpg" alt="头像" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Cookie from 'js-cookie'
export default {
  data() {
    return {};
  },
  methods: {
    handMenu() {
      this.$store.commit("collapseMenu");
    },
    handleClick(command){
      if(command === 'cancel'){
      window.sessionStorage.clear()
      this.$router.push('/')}
      // if(command === 'cancel'){
      // //清除cookie中的token
      // Cookie.remove('token')
      // //跳转到登录页面
      // this.$router.push('/')
      // }
    }
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
