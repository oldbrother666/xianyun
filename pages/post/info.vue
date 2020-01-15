<template>
  <div class="box">
    <!-- 头部 -->
    <Head />
    <div class="boxfirst">
      <Texts :data="posttext" />
      <Right @jump="chuan" />
    </div>

    <!-- 回复区 -->
    <div class="comment-box" v-for="(item,index) in postcomment" :key="index">
      <div class="comment">
        <div class="comment-top">
          <img :src="'http://127.0.0.1:1337'+item.account.defaultAvatar" alt />
          <strong>{{item.account.nickname}}</strong>
          <span>2020-20-5</span>
          <div class="comment-num">{{index+1}}</div>
        </div>
        <Comment :data='item.parent' v-if="item.parent"/>
        <div class="comment-text">{{item.content}}</div>
        <div class="return">回复</div>
      </div>
    </div>

    <!-- 脚部 -->

    <Foot />
  </div>
</template>

<script>
import Head from "@/components/header.vue";
import Foot from "@/components/footer.vue";
import Texts from "@/components/post/infoleft.vue";
import Right from "@/components/post/inforight.vue";
import Comment from "@/components/post/infocomment.vue";
export default {
  components: {
    Head,
    Foot,
    Texts,
    Right,
    Comment
  },
  created() {
    const id = this.$route.query.id;
    this.$axios({
      url: "/posts",
      params: {
        id
      }
    }).then(res => {
      // console.log(res)
      this.posttext = res.data.data[0];
    });

    this.$axios({
      url: "/posts/comments",
      params: {
        post: id,
        _start: 2
      }
    }).then(res => {
      console.log(res);
      this.postcomment = res.data.data
    });
  },
  data() {
    return {
      posttext: {},
      postcomment:{
      }
    };
  },
  methods: {
    chuan(id) {
      this.$axios({
        url: "/posts",
        params: {
          id
        }
      }).then(res => {
        this.posttext = res.data.data[0];
      });
    }
  }
};
</script>

<style lang='less' scoped>
.boxfirst {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  margin-top: 20px;
}
.box1 {
  margin: 0 auto;
  width: 1000px;
}

// 回复区
.comment-box {
  width: 1000px;
  margin: 8px auto;
}
.comment {
  width: 700px;
  //   background: #cccccc;
  padding: 15px;
  border: 1px solid #dddddd;
  // margin: 0 auto;
  .comment-top {
    display: flex;
    font-size: 12px;
    padding-bottom: 6px;
    img {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
    span {
      padding: 0 7px;
      // margin-right: 520px;
    }
    .comment-num{
      flex: 1;
      text-align: right;
    }
  }
  .comment-text {
    padding: 0 25px;
  }
  .return {
    font-size: 13px;
    text-align: right;
    padding: 0 15px;
    color: blue;
    cursor: pointer;
  }
}
</style>