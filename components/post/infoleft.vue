<template>
  <div class="box2">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 文章内容 -->
    <div class="posttext" @click="a">
      <h2>{{data.title}}</h2>
      <p>攻略：2019-05 22 10:57 &nbsp;&nbsp;&nbsp;&nbsp;阅读:13333</p>
      <i v-html="data.content"></i>
    </div>

    <!-- 点赞评论 -->
    <div class="f4">
      <div class="f4box">
        <div class="f4-one"><span class="el-icon-edit-outline"></span> 评论(100)</div>
        <div class="f4-two"><span class="el-icon-star-on"></span>收藏</div>
        <div class="f4-three"><span class="el-icon-share"></span>分享</div>
        <div class="f4-three"><span class="el-icon-loading"></span>点赞(75)</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    a() {
      // console.log(this.data);
    }
  }
};
</script>

<style lang='less' scoped>
.box2 {
  width: 700px;
  // background: #ccc;
  .posttext {
    margin-top: 20px;
    h2 {
      font-size: 32px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e3e3e3;
    }
    p {
      text-align: right;
      font-size: 14px;
      color: #aba8b6;
      padding: 15px 15px 20px 0;
    }
  }
}
// 点赞评论
.f4 {
  text-align: center;
    margin-top: 30px;
  .f4box{
    display: flex;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    >div{
      display: flex;
      flex-direction: column;
      color: #b2afba;
      font-size: 13px;
      padding: 0 12px;
      cursor: pointer;
      span{
        font-size: 28px;
        color: #ffa500
      }
    }
  }
}

/deep/img {
  max-width: 100%;
}
</style>