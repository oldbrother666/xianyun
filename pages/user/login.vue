<template>
  <div class="container">
      <Header></Header>
    <!-- 主要内容 -->
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form-wrapper">
        <!-- 表单头部tab -->
        <el-row type="flex" justify="center" class="tabs">
          <span
            :class="{active: currentTab === index}"
            v-for="(item, index) in [`登录`, `注册`]"
            :key="index"
            @click="handleChangeTab(index)"
          >{{item}}</span>
        </el-row>
        <!-- 登录功能组件 -->
        <!-- <LoginForm v-if="currentTab == 0"/> -->
        <logins v-if="currentTab == 0" :ruleForm='ruleForm'></logins>
        <!-- 注册功能组件 -->
        <!-- <RegisterForm v-if="currentTab == 1"/> -->
        <zhuce v-if="currentTab == 1"></zhuce>
      </div>
    </el-row>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
import logins from '@/components/loginform'
import zhuce from '@/components/zhuce'
export default {
    components:{
        Header,Footer,logins,zhuce
    },
  data() {
    return {
      currentTab: 0,
      ruleForm: {
        username: "",
        password:''
      }
    };
  },
  methods: {
    handleChangeTab(index) {
      this.currentTab = index;
    }
  }
};
</script>

<style scoped lang="less">
// 修改输入框长度
/deep/.el-input{
  width: 350px;
 
}
.login{
  padding: 20px 0;
  text-align: center
}
/deep/.el-button.el-button--primary{
  width: 350px;
}





.container {
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  height: 700px;
  min-width: 1000px;

  .main {
    width: 1000px;
    height: 91%;
    margin: 0 auto;
    position: relative;

    .form-wrapper {
      width: 400px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;

      .tabs {
        span {
          display: block;
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          border-top: 2px #eee solid;
          background: #eee;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          color: #666;

          &.active {
            color: orange;
            border-top-color: orange;
            background: #fff;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
