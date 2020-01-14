<template>
  <section class="contianer">
    <Header />
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <Filters :data="copyflightsData" @changelist="changelist"/>
        <!-- 航班头部布局 -->
        <flightsHead />

        <!-- 航班信息 -->
        <FlightsItem :data="item" v-for="(item,index) in dataList" :key="index" />
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 7, 9, 11]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <Footer />
  </section>
</template>

<script>
import FlightsItem from "@/components/flightsItem.vue";
import moment from "moment";
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
import flightsHead from "@/components/flightsListHead";
import Filters from "@/components/flightsFilters";
export default {
  components: {
    Header,
    Footer,
    flightsHead,
    FlightsItem,
    Filters
  },
  data() {
    return {
      currentPage: 1, //分页默认第几页
      pagesize: 5, //分页一页显示多少条
      flightsData: { // 航班总数据
        info: {},
        options: {}
      },
      copyflightsData: {  //深拷贝传子组件数据
        info: {},
        options: {},
        flights:[]
      },
      total: 0
      // dataList: [] // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
    };
  },
  computed: {
    dataList() {
      if (!this.flightsData.flights) return [];

      // 计算分页的数据
      return this.flightsData.flights.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  },
  mounted() {
    // console.log(this.$route.query);
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      // console.log(res);
      this.flightsData = res.data;
      this.total = this.flightsData.total;
      //深拷贝发送子组件
      this.copyflightsData = {...res.data}
    });
  },
  methods: {
    //   分页每页条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      // this.dataList = this.flightsData.flights.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
    },
    //页码变更显示第几页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      // this.dataList = this.flightsData.flights.slice((this.currentPage-1)*this.pagesize,val*this.pagesize)
    },

    //子组件发射过滤
    changelist(v) {
      // console.log(v);
      this.flightsData.flights = v;
      this.total = v.length
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>