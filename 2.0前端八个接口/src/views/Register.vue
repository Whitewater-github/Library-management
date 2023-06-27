<template>
  <div class="poster">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="70px"
      class="demo-ruleForm"
      :inline="true"
    >
    <h3 class="register_title">注册</h3>
    <el-form-item  prop="username">
      <el-input v-model="ruleForm.username" placeholder="请输入账号"
          prefix-icon="el-icon-user-solid"></el-input>
    </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password1">
        <el-input
          type="password"
          v-model="ruleForm.password1"
          autocomplete="off"
          placeholder="请确认密码"
          prefix-icon="el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-top: 10px; width: 100px"
          class="click"
          type="primary"
          plain
          round
          size="mini" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button
          @click="resetForm('ruleForm')"
          style="margin-top: 10px"
          class="click"
          round
          size="mini"
          >重置</el-button
        >
        <el-button
          @click="denglu"
          style="margin-top: 10px"
          class="click"
          round
          size="mini"
          >去登陆</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {register} from "@/api/data";
export default {
  data() {
    var checkAge = (rule, value,callback) => {
      if (!value) {
       return callback(new Error("账户不能为空")); //最前面有一个return
      }
      setTimeout(() => {
        if (value === "") {
        callback(new Error("请输入账户"));
      } else {
        if (this.ruleForm.checkAge !== "") {
          this.$refs.ruleForm.validateField("checkAge");
        }
        callback();
       }
      }, 1000);
    };
    var validatePass = (rule,value,callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.password1 !== "") {
          this.$refs.ruleForm.validateField("password1");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value,callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        password1: "",
        username:"",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        password1: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert("注册成功");
      //   this.$router.replace('/');//完成注册后跳转至登录页面
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      const params = {
        "username":this.ruleForm.username,
        "password":this.ruleForm.password,
      }
      if(this.ruleForm.password !== this.ruleForm.password1){
        this.$message.success("密码不一致");
        this.ruleForm.password = ""
        this.ruleForm.password1 = ""
      }else{
        register(params).then((res) => {
        console.log("register", res);
        if (res.data == "200") {
          this.$message.success("注册成功");
          this.ruleForm = {}
          this.$router.push('/')
        } else {
          this.$message.warning("注册失败");
        }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    denglu(){
      this.$router.push('/')//点击按钮，跳转至登陆页面
    }
  },
};
</script>
<style lang="less" scoped>
.demo-ruleForm {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #55585a +7a;
  border-radius: 15px;
  box-shadow: 0 0 2px #cac6c6;
  box-sizing: border-box;
  .register_title {
    text-align: center;
    margin: 0px auto 40px auto;
    color: #edeff1;
  }
  .el-input {
    width: 280px;
  }
  .click:hover {
    transform: scale(1.1);
  }
}
.poster {
  background: url("../assets/bg.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
</style>
