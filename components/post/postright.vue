<template>
  <div class="box">
    <div class="input">
      <input type="text" placeholder="请输入想去的地方,比如：‘广州’" v-model="search" />
      <i class="el-icon-zoom-in" @click="searchCity"></i>
    </div>
    <ul class="smalllist">
      推荐 :
      <li v-for="(v,index) in ['广州','青岛','北京']" :key="index" @click="searchli(v)">{{v}}</li>
      <!-- <li>上海</li>
      <li>北京</li>-->
    </ul>
    <div class="gonglue">
      <p>推荐攻略</p>
      <div @click="write">
        <span class="el-icon-edit"></span>
        写游记
      </div>
    </div>
    <!-- 文章列表 -->
    <div class="postlist" v-for="(item,index) in postlist2" :key="index">
      <div class="postlist-one" v-if="item.images.length !== 1" @click="jump(item.id)">
        <p>{{item.title}}</p>
        <div class="text" v-html="item.summary"></div>
        <ul>
          <li v-for="(v,index) in item.images" :key="index">
            <img :src="v" alt />
          </li>
        </ul>
        <div class="postlist-bottom">
          <div class="postlist-left">
            <span class="el-icon-location-outline"></span>
            {{item.cityName}} by
            <img
              src="../../assets/u=2731898923,4055139559&fm=23&gp=0.jpg"
              alt
            />
            <i>地球发动机</i>
            <span class="el-icon-view"></span>
            {{item.watch}}
          </div>
          <div class="postlist-right">75 赞</div>
        </div>
      </div>
      <div class="postlist-two" v-if="item.images.length === 1" @click="jump(item.id)">
        <img :src="item.images" alt />
        <div class="postlist-two-right">
          <p>{{item.title}}</p>
          <div class="postlist-two-right-text" v-html="item.summary"></div>
          <div class="bottom">
            <div class="bottom-lefts">
              <span class="el-icon-location-outline"></span>
              {{item.cityName}} by
              <img :src="item.images" alt />
              <strong>地球发动机</strong>
              <i class="el-icon-view"></i>
              {{item.watch}}
            </div>
            <div class="bottom-rights">20赞</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[1, 2, 3]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  created() {},
  mounted() {
    // 获取文章列表数据
    this.$axios({
      url: "/posts"
    }).then(res => {
      this.postlist1 = res.data.data;
      // 开辟一个新的数组来切割文章列表数据
      this.postlist2 = this.postlist1.slice(0, 3);
      // console.log(res);
      this.total = res.data.data.length;
    });
  },
  data() {
    return {
      postlist1: [], //总的数据
      currentPage4: 1, //显示第几页
      total: 0, //总共有多少条新闻
      pagesize: 3, //每页显示多少条新闻
      postlist2: [], //分页切割的数据
      search: "" //绑定搜索输入框
    };
  },
  methods: {
    //val是每页多少条
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //val是当前第几页
    handleCurrentChange(val) {
      //   如果切的数少于
      if (this.pagesize * val > this.postlist1.length) {
        this.postlist2 = this.postlist1.slice(this.pagesize * (val - 1));
      } else {
        this.postlist2 = this.postlist1.slice(
          this.pagesize * (val - 1),
          this.pagesize * val
        );
      }
      console.log(`当前页: ${val}`);
    },
    //   搜索
    searchCity() {
      if (this.search === "") {
        return;
      }
      let bl = 0;
      this.postlist1.forEach((item, index) => {
        if (item.cityName.indexOf(this.search) !== -1) {
          this.postlist2 = [];
          this.postlist2.push(item);
          bl += 1;
          // console.log(this.postlist2);
        }
      });
      if (bl === 0) {
        this.$message({
          message: "搜索为空",
          type: "warning"
        });
      }else{
          this.total = this.postlist2.length
      }
    },
    //点击搜索那些关键词搜索
    searchli(v) {
      let bl = 0;
      console.log(v);
      this.postlist1.forEach((item, index) => {
        if (item.cityName.indexOf(v) !== -1) {
          this.postlist2 = [];
          this.postlist2.push(item);
          bl += 1;
          // console.log(this.postlist2);
        }
      });
      if (bl === 0) {
        this.$message({
          message: "搜索为空",
          type: "warning"
        });
        this.postlist2 = [];
      }else{
          this.total = this.postlist2.length
      }
    },
    // 跳转到详情页面
    jump(id){
        this.$router.push({path:'/post/info',query:{id}})
    },
    //写游记
    write(){
      this.$router.push({
        path:'/post/write'
      })
    }
  }
};
</script>

<style lang='less' scoped>
.input {
  width: 650px;
  border: 3px solid #ffa500;
  height: 38px;
  display: flex;
  align-items: center;
  padding: 0 7px;
  input {
    width: 100%;
    font-size: 15px;
    border: none;
    outline: none;
  }
  i {
    padding: 0 0 0 7px;
    font-size: 22px;
    color: #ffa500;
  }
}
.smalllist {
  display: flex;
  font-size: 12px;
  margin-top: 10px;
  color: #666666;
  li {
    margin-left: 10px;
  }
  li:hover {
    cursor: pointer;
    color: #ffa500;
  }
}

// 推荐攻略
.gonglue {
  display: flex;
  height: 48px;
  border-bottom: 1px solid #eeeeee;
  width: 650px;
  align-items: center;
  justify-content: space-between;
  p {
    padding: 10px 0;
    color: #ffa584;
    border-bottom: 1px solid #ffa584;
    font-size: 18px;
  }
  div {
    width: 100px;
    height: 35px;
    background: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    span {
      margin-right: 5px;
    }
  }
  div:hover{
    background: darken(hsl(#409eff, 80%, 50%), 20%)
  }
}
.postlist:hover p{
    color: #ffa500
}
// 文章列表
.postlist {
  width: 650px;
  border-bottom: 1px solid #f2f2f2;
    cursor: pointer;

  p {
    font-size: 20px;
    padding: 10px 0;
  }
  p:hover{
      color:#ffa500;
  }
  .text {
    font-size: 14px;
    color: #666666;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    line-height: 22px;
  }
  ul {
    display: flex;
    margin: 10px 0 0 0;
    li {
      width: 200px;
      margin-right: 25px;
      img {
        width: 100%;
        height: 120px;
      }
    }
    li:last-child{
        margin-right: 0px;
    }
  }
  .postlist-bottom {
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
    padding-bottom: 15px;
    .postlist-left {
      font-size: 11px;
      color: #999;
      img {
        width: 12px;
        height: 12px;
        margin: 0 3px;
      }
      i {
        color: #ffbe96;
      }
    }
    .postlist-right {
      color: #ffab2b;
      font-size: 15px;
    }
  }
}

// 只有一张图片时候的文章.
.postlist-two {
  display: flex;
  height: 191px;
  padding: 10px 0 0 0;
  align-items: center;
  cursor: pointer;
  img {
    width: 220px;
    height: 150px;
    margin-right: 5px;
  }
  .postlist-two-right {
    p {
      font-size: 18px;
    }
    .postlist-two-right-text {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      line-height: 22px;
      font-size: 14px;
      color: #a29082;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      .bottom-lefts {
        color: #999;
        font-size: 11px;
        img {
          width: 13px;
          height: 13px;
          margin: 0 3px;
        }
        strong {
          font-weight: normal;
          color: #ffbe96;
        }
      }
      .bottom-rights {
        color: #ffab2b;
        font-size: 15px;
      }
    }
  }
}
//分页
.el-pagination {
  margin-top: 15px;
}
</style>