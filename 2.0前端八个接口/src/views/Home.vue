<template>
 <div>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <div class="grid-content bg-purple"></div>
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/user.jpg" alt="头像" />
          <div class="userinfo">
            <p class="name">librarian</p>
            <p class="access">图书管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录的时间：<span>2022-10-20</span></p>
          <p>上次登录的地点：<span>邯郸</span></p>
        </div>
      </el-card>
      <el-card :body-style="{ padding: '0px' }">
      <img src="../assets/柱状图.png" class="image3">
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <el-card :body-style="{ padding: '0px' }">
      <img src="../assets/饼图.png" class="image1">
    </el-card>
      <el-card :body-style="{ padding: '0px' }">
      <img src="../assets/折线图.jpg" class="image2">
    </el-card>
    </el-col>
  </el-row></div>
</template>
<script>
// import { getData } from "../api";
export default {
  data() {
    return {
      tableData: [],
      
    };
  },
  
};
</script>
<style lang="less" scoped>
.image3{
  width: 100%;
  height:465px;
}
.image2{
  width: 100%;
  height:365px;
}
.image1{
  width: 100%;
  height: 350px;
}
.a{
  height: 100%;
  width: 100%;
  z-index: 999;
}
.user {
  padding-bottom: 1px;
  margin-bottom: 2px;
  border-bottom: 1px solid #cccc;
  display: flex;
  align-items: center;
  img {
    margin-right: 35px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    .name {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 20px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 40px;
    text-align: center;
    line-height: 80px;
    color: rgb(245, 240, 240);
  }
  .detail {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 10x;
      margin-bottom: 10px;
      line-height: 10px;
      height: 10px;
    }
    .desc {
      font-size: 14px;
      color: #918e8e;
      text-align: justify;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 10px;
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>
