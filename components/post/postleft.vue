<template>
  <div class="box">
    <!-- 热门城市 -->
    <div class="listbox" @mouseleave="leave">
      <ul class="hotcity-left">
        <li v-for="(item,index) in nav" :key="index" @mouseenter="active(index)">
          <!-- 左边 -->
          <div class="hotcity-li">
            {{item.type}}
            <span class="el-icon-arrow-right"></span>
          </div>
          <!-- 右边隐藏部分 -->
          <div class="hotcity-hide"  v-if="xian == index"  @mouseenter="active2(index)" @mouseleave="returnborder(index)">
            <div v-for="(value,i) in item.children" :key="i">
              <span>{{i +1}}</span>
              <strong>{{value.city}}</strong>
              {{value.desc}}
            </div>
          </div>
        </li>
      </ul>
    </div>

    <h3>推荐城市</h3>
    <img
      src="http://wx4.sinaimg.cn/crop.54.0.711.400.1000/0062L5o8ly1fssa3a9q8lj30m80b475g.jpg"
      alt
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: ["热门城市", "推荐城市", "奔向海岛", "主题推荐"],
      xian: "8",
      url: "/images/pic_sea.jpeg"
    };
  },
  created() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      console.log(res.data.data);
      this.nav = res.data.data;
    });
    // console.log(this.$axios.defaults.baseURL)
  },
  methods: {
    //悬停显示右边信息
    active(index) {
      this.xian = index;
      // console.log(index);
    },
    // 离开隐藏右边信息
    leave() {
      this.xian = "8";
    },
    // 悬停更改边框右边颜色
    active2(index){
      const a = document.querySelectorAll('.hotcity-li')
      a[index].style.borderRight = '1px solid white'
      a[index].style.color = '#ffa500'
    },
    // 离开更改边框右边颜色
    returnborder(index){
      const a = document.querySelectorAll('.hotcity-li')
      a[index].style.borderRight = '1px solid #dddddd'
      a[index].style.color = 'black'
    }
  }
};
</script>

<style scoped lang="less">
img {
  width: 280px;
}
.box {
  width: 300px;
}
// 列表
.listbox {
  width: 280px;
  position: relative;
  z-index: 5;
  .hotcity-left {
    border-left: 1px #dddddd solid;
    border-top: 1px solid #dddddd;
    .hotcity-li {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      border-bottom: 1px solid #dddddd;
      border-right: 1px solid #dddddd;
      z-index: 100;
      background: white;
      font-size: 14px;
    }
    .hotcity-li:hover {
      border-right: 1px white solid!important;
      color: #ffa500!important
    }
    .hotcity-hide {
      position: absolute;
      box-sizing: border-box;
      border: 1px solid #dddddd;
      top: 0;
      left: 279px;
      width: 350px;
      height: 220px;
      background: white;
      z-index: -1;
      padding: 15px;
      div {
        margin-bottom: 5px;
        color: #999999;
        font-size: 14px;
        display: flex;
        align-items: center;
        span {
          font-size: 24px;
          font-style: italic;
          color: #ffa500
        }
        strong{
          font-size: 14px;
          color: #ffa500;
          margin: 0 10px;
          font-weight: normal;
        }
      }
    }
  }
}

// 推荐城市
h3 {
  font-weight: normal;
  font-size: 18px;
  padding: 15px 0;
  margin: 10px 0;
  border-bottom: 1px solid #dddddd;
  max-width: 280px;
}

// 显示隐藏列表
.show {
  display: block;
}
</style>