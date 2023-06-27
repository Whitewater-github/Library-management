<template>
    <div class="body">
    <el-form ref="form" label-width="70px" :inline="true" class="login-container" :model="form" :rules="rules">
        <h3 class="login_title">图书管理系统登录</h3>
        <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="zhuce" style="margin-top: 10px;" class="click"  round size="mini">注册</el-button>
            <el-button @click="submit" style="margin-top: 10px;width:150px" class="click" type="primary" plain round size="mini">登陆</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>
<script>
import Cookie from 'js-cookie'
import { getMenu } from '../api' 
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
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
        // 登录
        submit() {
            // // token信息
            // const token = Mock.Random.guid()
            

            // 校验通过
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getMenu(this.form).then(({ data }) => {
                        console.log(data)
                        if (data.code === 20000) {
                            // token信息存入cookie用于不同页面间的通信
                            Cookie.set('token', data.data.token)

                            // 获取菜单的数据，存入store中
                            this.$store.commit('setMenu', data.data.menu)
                            this.$store.commit('addMenu', this.$router)
                            // 跳转到首页
                            this.$router.push('/home')
                        } else {
                            this.$message.error(data.data.message);
                        }
                    })
                }
            })
        }
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
    .w.el-form-item__label{
    color:white;
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