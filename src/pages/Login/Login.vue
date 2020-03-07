<template>
  <div>
    <div class="box">
      <div class="content">
        <header>
          <h3>登录</h3>
          <h3 @click="goRegister">注册</h3>
        </header>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-dynamic">
             <el-form-item prop="account">
              <el-input v-model="ruleForm.account" clearable placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="ruleForm.password" show-password placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="usermail">
              <el-input v-model="ruleForm.usermail" clearable placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-button type="success" @click="goHome('ruleForm')">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm:{
        account: "",
        password: "",
        usermail: "",
      },
     rules:{
       account:[
         {required:true,message:"账号不能为空!",trigger:'blur'}
       ],
       password:[
          {required:true,message:"密码不能为空!",trigger:'blur'}
       ],
       usermail:[
          {required:true,message:"邮箱不能为空!",trigger:'blur'}
       ]
     }
    };
  },
  methods: {
    goRegister() {
      this.$router.push("/register");
    },
    goHome(formName) {
      this.$refs[formName].validate(async(valid) => {
          if (valid) {
            const res= await this.$axios.get("login/", {
          params: {
            account: this.ruleForm.account,
            password: this.ruleForm.password,
            usermail: this.ruleForm.usermail
          }
        })
          if (res.data.statusCode == 0) {
            this.$message({
              type: "success",
              message: "登录成功!"
            });
            // this.$store.commit('VERIFYLOGIN',true)
            // this.$store.commit('USERMSG',this.account)
            // this.$store.commit('EMAILMSG',this.usermail)
            sessionStorage.setItem("account", this.ruleForm.account);
            sessionStorage.setItem("usermail", this.ruleForm.usermail);
            sessionStorage.setItem("key", "true");
            this.$router.push({
              path: "/home",
              query: {
                name: this.$router.options.routes[3].children[0].meta.info
              }
            });
            this.ruleForm.account = "";
            this.ruleForm.password = "";
            this.ruleForm.usermail = "";
          } else {
            this.$message({
              type: "success",
              message: "登录失败!"
            });
            this.ruleForm.account = "";
            this.ruleForm.password = "";
            this.ruleForm.usermail = "";
          }
          }
        })
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #4d5e70;
  .content {
    width: 300px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -150px;
    background: #fff;
    padding: 30px 45px;
    box-sizing: border-box;
    header {
      display: flex;
      justify-content: space-around;
      h3 {
        width: 30px;
        height: 25px;
        border-bottom: 3px solid #4d5e70;
        text-align: center;
      }
      & > h3:last-of-type {
        border-bottom: none;
      }
    }
    .el-input {
      margin-top: 20px;
      width: 100%;
    }
    .el-button {
      width: 50%;
      display: block;
      margin: 20px auto;
    }
  }
}
.el-form-item{
  margin-bottom: 0;
}
</style>