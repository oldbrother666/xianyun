<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场">
          <el-option
            :label="value"
            :value="value"
            v-for="(value,index) in data.options.airport"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item, index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司">
          <el-option
            v-for="(item, index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型">
          <el-option label="大" value="L"></el-option>
          <el-option label="中" value="M"></el-option>
          <el-option label="小" value="S"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    {{changeList}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "" // 机型大小
    };
  },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    //多选用计算属性
    changeList() {
      const arr = this.data.flights.filter(item => {
        var bl = true;
        if (this.company && item.airline_name !== this.company) {
          bl = false;
        }
        if (this.airport && item.org_airport_name !== this.airport) {
          bl = false;
        }
        if (this.flightTimes) {
          const [from, to] = this.flightTimes.split(",");
          const deptime = +item.dep_time.split(":")[0];
          if (deptime > to || deptime < from) {
            bl = false;
          }
        }
        if (this.airSize && item.plane_size !== this.airSize) {
          bl = false;
        }
        return bl;
      });
      this.$emit("changelist", arr);
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      // const arr = this.data.flights.ca
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      // console.log(value);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      // console.log(`${value}`)
      // const airlines = this.data.flights.filter(item =>{
      //   return item.airline_name === value
      // })
      // // console.log(airlines)
      // this.$emit('airline',airlines)
    },

    // 选择机型时候触发
    handleAirSize(value) {
      // console.log(value);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
        this.airport = "",
        this.flightTimes = "",
        this.company = "",
        this.airSize = "";
        // this.$emit('chehui',this.data.flights)
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>