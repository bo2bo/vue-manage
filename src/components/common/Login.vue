<template>
  <div class="login-wrap">
    <div class="ms-title">CRM系统</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data: function() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      url: this.GLOBAL.url + "login"
    };
  },
  methods: {
    submitForm(formName) {
      const self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          if (self.ruleForm.username == "zq") {
            self.$axios
              .post(
                self.url,
                qs.stringify({
                  adminName: self.ruleForm.username,
                  adminPassWord: self.ruleForm.password
                })
              )
              .then(function(res) {
                if (res.data.login) {
                  localStorage.setItem("username", self.ruleForm.username);
                  self.$router.push("/meetinglist");
                } else {
                  alert("用户名或密码输入错误！");
                }
              })
              .catch(function(err) {
                console.log(err);
              });
          } else {
            localStorage.setItem("username", self.ruleForm.username);
            self.$router.push("/meetinglist");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  margin: -150px 0 0 -190px;
  padding: 40px 40px 12px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.no-username {
  display: inline-block;
}
.login-tips {
  font-size: 12px;
  margin-top: 12px;
  color: #999;
}
.no-username {
  font-size: 14px;
  color: #999;
}
</style>