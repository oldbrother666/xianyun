<template>
  <div class="flight-item">
    <div @click="active()">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{data.airline_name}}</span>
          {{data.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{allTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{data.seat_infos[0].org_settle_price_child}}</span>起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend" v-show="num">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
            v-for="(v,index) in data.seat_infos"
            :key="index"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{v.name}}</span>
              | {{v.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥{{v.org_settle_price}}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini" @click="jump(data.id,v.seat_xid)">选定</el-button>
              <p>剩余：{{v.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //     // 数据
  //     data: {
  //         type: Object,
  //         // 默认是空数组
  //         default: function(){
  //             return []
  //         }
  //     }
  // }
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      num: false
    };
  },
  methods: {
    active() {
      this.num = !this.num;
    },
    //点击跳转
    jump(id,seat_xid){
      console.log(seat_xid)
      this.$router.push({
         path: '/air/order',
         query:{
           id,
           seat_xid
         }
      })
    }
  },
  computed: {
    allTime() {
      const dep = this.data.dep_time.split(":"); //开始
      const arr = this.data.arr_time.split(":"); //到达
      //   if(dep[0]==='00'){
      //       dep[0] = 24
      //   }
      //   if(arr[0] === '00'){
      //       arr[0] = 24
      //   }
      const depmin = dep[0] * 60 + +dep[1]; //开始总分钟
      let arrmin = arr[0] * 60 + +arr[1]; //到达总分钟
      if (arrmin < depmin) {
        arrmin += 24 * 60;
      }
      const num = (arrmin - depmin) % 60;
      const hours = (arrmin - depmin - num) / 60;

      return `${hours}时${num}分`;
    }
    
  }
};
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>