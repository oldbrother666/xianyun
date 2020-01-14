<template>
  <div class="zhuce">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="用户名手机"></el-input>
      </el-form-item>
      <i>
        <el-input v-model="ruleForm.captcha" placeholder="验证码"></el-input>
        <el-button plain :disabled="istrue" @click="yanzheng">发送验证码</el-button>
      </i>
      <el-form-item prop="nickname">
        <el-input v-model="ruleForm.nickname" placeholder="你的名字"></el-input>
      </el-form-item>
      <!-- 验证两次一样 -->
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
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
        username:'',
        nickname:'',
        captcha:'',
        password:''
      },
      ruleForm2: {
        checkPass: ""
      },
      istrue: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名手机", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ]
      },
      rules2: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 注册
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          // console.log(this.ruleForm)
          this.$axios({
            url:"/accounts/register",
            method:'POST',
            data:this.ruleForm
          }).then(res =>{
            console.log(res)
          }).catch(res =>{
            console.log(res);
            
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //验证成功后弹出
    open(data) {
      this.$alert(data, "验证码", {
        confirmButtonText: "确定"
      });
    },
    // 发送验证码
    yanzheng() {
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: { tel: this.ruleForm.username }
      }).then(res => {
        console.log(res);
        this.open(res.data.code);
      });
    }
  }
};
</script>

<style scoped lang="less">
.zhuce {
  width: 400px;
  text-align: center;
  padding: 20px 25px 0px 25px;
}
// 验证码
i {
  // margin: 5px
  height: 60px;
  display: block;
}
i > .el-input {
  width: 230px;
}
</style>