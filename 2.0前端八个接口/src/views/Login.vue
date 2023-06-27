<template>
    <div class="body">
    <el-form ref="form" label-width="70px" :inline="true" class="login-container" :model="form" :rules="rules">
        <h3 class="login_title">图书管理系统登录</h3>
        <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入账号" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"  prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="denglu(form)" style="margin-top: 10px;width:150px" class="click" type="primary" plain round size="mini">登陆</el-button>
            <el-button @click="zhuce" style="margin-top: 10px;" class="click"  round size="mini">注册</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>
<script>
import {login} from "@/api/data";
export default {
    data() {
        return {
            row:{},
            form: {
                username:"",
                password:""
            },
            rules: {
                username: [
                    { required: true, trigger: 'blur', message: '请输入用户名' }
                ],
                password: [
                    { required: true, trigger: 'blur', message: '请输入密码' }
                ]
            }
        }
    },
    methods: {
        //注册跳转
        zhuce(){
            this.$router.push('/Register')//点击注册按钮，跳转至注册页面
        },
        // 登录
        denglu(row) {
         const params = row;
        login(params).then((res) => {
        console.log("login", res);
        if (res.data == "200") {
          this.$message.success("登陆成功");
          window.sessionStorage.setItem('token',"1");
          this.$router.push('/home')
        } else {
          this.$message.warning("登陆失败");
        }
        });
        },
    }
}
</script>
<style lang="less" scoped>
.login-container {
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #55585a   +7a;
    border-radius: 15px;
    box-shadow: 0 0 2px #cac6c6;
    box-sizing: border-box;
    .login_title {
        text-align: center;
        margin-bottom: 40px;
        color: #edeff1;
    }
    .el-input {
        width: 280px;
    }
    .click:hover{
        transform:scale(1.1);
    }
    
}
.body{
    background:url("../assets/bg.jpg");
    width:100%;
    height:100%;
    position:fixed;
    background-size:100% 100%;
}
</style>