<template>
  <div class="box">
    <div class="box_title">相关攻略</div>
    <ul>
      <li v-for="(item,index) in postlist" :key="index" @click="jump(item.id)">
        <img :src="item.images[0]" alt />
        <div class="text">
          <p v-html="item.summary"></p>
          <span>2020-00-00 11:56 阅读2</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    this.$axios({
      url: "/posts"
    }).then(res => {
      // console.log(res);
      let id = this.$route.query.id;
      this.postlist = res.data.data;
      this.postlist.forEach((v, i) => {
        if (v.id == id) {
          this.postlist.splice(i, 1);
          // console.log(1);
        }
      });
    });
  },
  data() {
    return {
      postlist: []
    };
  },
  methods: {
    jump(id) {
      this.$emit('jump',id)
    }
  }
};
</script>

<style lang='less' scoped>
.box {
  width: 280px;
  margin-left: 20px;
  .box_title {
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e3e3e3;
  }
  li {
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid #e3e3e3;
    img {
      width: 100px;
      height: 80px;
      margin-right: 5px;
    }
    .text {
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      justify-content: space-between;
      p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      span {
        font-size: 12px;
        color: #d6bbb6;
      }
    }
  }
}
</style>