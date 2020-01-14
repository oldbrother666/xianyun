<template>
  <div class="box">
    <!-- 热门城市 -->
    <div class="listbox" @mouseleave="leave">
      <ul class="hotcity-left">
        <li v-for="(item,index) in nav" :key="index" @mouseenter="active(index)">
          <i v-text="item.type"></i>
          <span class="el-icon-arrow-right"></span>
          <!-- 右边 -->
          <div class="hotcity-right-list" v-show="xian === index">
            <p
              v-for="(v,i) in item.children"
              :key="i"
              :class="{bordernones:isborder ===i}"
            ><i>{{i + 1}}</i><span>{{v.city}}</span> {{v.desc}}</p>
          </div>
        </li>
      </ul>
      <!-- <ul class="hotcity-right">
          <li v-for="(item,index) in nav" :key="index" v-show="xian === index" @mouseenter="bordernone(index)" @mouseleave="bordershow(index)">
            <div class="hotcity-right-box" v-for="(v,i) in item.children" :key="i" >
              <i>{{i + 1}}</i><span>{{v.city}}</span> {{v.desc}}
            </div>
          </li>
      </ul>-->
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
      xian: "",
      url: "/images/pic_sea.jpeg",
      isborder: ""
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
    active(index) {
      this.xian = index;
      console.log(index);
      this.isborder = index;
    },
    leave() {
      this.xian = "";
    },
    bordernone(index) {
      const a = document.querySelectorAll(".hotcity-left>li");
      a[index].style.borderRightStyle = "none";
    },
    bordershow(index) {
      const a = document.querySelectorAll(".hotcity-left>li");
      a[index].style.borderRightStyle = "ridge";
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
  border-top: 1px solid #dddddd;
  border-left: 1px solid #dddddd;
  position: relative;
  width: 280px;
  height: 165px;
  .hotcity-left {
    z-index: 100;
    position: absolute;
    border-bottom: 1px #dddddd solid;
    border-right: 1px #dddddd solid;
    left: 0;
    top: 0px;
    width: 280px;
    background: white;
    > li {
      display: flex;
      justify-content: space-between;
      height: 41px;
      align-items: center;
      padding: 0 15px;
      border-bottom: 1px solid #dddddd;
      // border-right: 1px solid #dddddd;
    }
    > li:hover {
      border-right: 1px solid white;
      color: #ffa500;
    }

    > li:last-child {
      border-bottom: none;
    }
  }

  .hotcity-right-list {
    position: absolute;
    left: 279px;
    top: -1px !important;
    z-index: 1;
    width: 350px;
    height: 202px;
    top: 0;
    > p {
      line-height: 41px;
      width: 100%;
      background: white;
      border-right: 1px solid #dddddd;
      border-left: 1px solid #dddddd;
      border-bottom: 1px solid white;
      color: #999999;
      padding: 0 15px;
      box-sizing: border-box;
      i{
        // font-size: 24px;
        font-style: italic;
        color:#ffa500;
        margin-right: 6px;
      }
      span{
        color:#ffa500;
        margin-right: 10px
      }
    }
    > p:last-child {
      border-bottom: 1px solid #dddddd;
    }
    > p:nth-child(1) {
      border-top: 1px solid #dddddd!important;
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
.bordernones {
  border-left: 1px solid white !important;
}
</style>