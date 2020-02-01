<template>
  <div class="box">
    <Header />
    <div class="box2">
      <!-- 面包屑 -->
      <div class="bread">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>酒店</el-breadcrumb-item>
          <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 一堆输入框 -->
      <div class="input1">
        <!-- 搜索输入框 -->
        <el-autocomplete
          class="inline-input"
          v-model="state2"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
        <!-- 日期 -->
        <el-date-picker
          v-model="value6"
          type="daterange"
          range-separator="-"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
          @blur="a"
        ></el-date-picker>
        <!-- 选择人数 -->
        <el-input
          placeholder="人数未定"
          suffix-icon="el-icon-date"
          v-model="person"
          readonly
          class="person"
        ></el-input>
        <div class="person-box">
          <div class="person-box-top">
            每间
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="color:#f00"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <el-checkbox v-model="checked">备选项</el-checkbox>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          下拉菜单
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 滑块过滤 -->
      <div class="input2">
        <div class="block">
          <span class="demonstration">
            价格
            <i>0-4000</i>
          </span>
          <el-slider v-model="hua" @change="formatTooltip" :max="max_num"></el-slider>
        </div>
        <div class="dropdown-box">
          <div class="dropdown1">
            <p>住宿等级</p>
            <el-dropdown>
              <span class="el-dropdown-link">
                下拉菜单
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-checkbox v-model="checked">1</el-checkbox>
                <el-checkbox v-model="checked">2</el-checkbox>
                <el-checkbox v-model="checked">3</el-checkbox>
                <el-checkbox v-model="checked">4</el-checkbox>
                <el-checkbox v-model="checked">5</el-checkbox>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="dropdown1">
            <p>住宿等级</p>
            <el-dropdown>
              <span class="el-dropdown-link">
                下拉菜单
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="dropdown1">
            <p>住宿等级</p>
            <el-dropdown>
              <span class="el-dropdown-link">
                下拉菜单
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="dropdown1">
            <p>住宿等级</p>
            <el-dropdown>
              <span class="el-dropdown-link">
                下拉菜单
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown"></el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  components: { Header, Footer },
  data() {
    return {
      state2: "", //搜索输入框
      restaurants: [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" }
      ], //搜索框的value
      value6: "", //日期
      hua: 4000, //滑块
      max_num: 4000, //滑块最大值
      checked: "", //选择框
      person: "" //人数
    };
  },
  methods: {
    a() {
      let one = new Date(this.value6[0]);
      let two = one.getFullYear();
      console.log(two);
    },
    //输入建议如果有则返回
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    //输入建议调用的函数
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 点击获取item
    handleSelect(item) {
      console.log(item);
    },

    //日期点击事件
    pickerOptions2() {},
    //滑块事件
    formatTooltip(val) {
      console.log(val);
    }
  },
  mounted() {
    this.$axios({
      url: "/hotels"
    }).then(res => {
      console.log(res);
    });
  }
};
</script>

<style scoped lang="less">
.box2 {
  width: 1000px;
  margin: 0 auto;
  .bread {
    margin: 20px 0;
  }
  .inputs {
  }
}
// 选择人数
.person {
  width: 221px;
}
//选择人数盒子
.person-box {
  width: 326px;
  height: 123px;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(121%, 10%);
  border: #edf0f6 1px solid;
  background: white;
  padding: 12px;
}
// 滑块部分
.input2 {
  width: 1000px;
  height: 80px;
  border: 1px solid #dddddd;
  margin-top: 20px;
  padding: 5px 0;
  display: flex;
  .block {
    width: 250px;
    color: #666666;
    padding: 0 10px;
    i {
      float: right;
    }
  }
  .dropdown1 {
    p {
      margin-bottom: 5px;
    }
    .el-dropdown {
      font-size: 13px;
      color: #606266;
      cursor: pointer;
      flex: 1;
    }
  }
}
.dropdown-box {
  display: flex;
}
/deep/.el-checkbox__inner {
  border-radius: 50%;
}
/deep/.el-dropdown-menu.el-popper {
  width: 500px !important;
}
</style>