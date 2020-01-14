<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in user" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(v,index) in data.insurances" :key="index">
          <el-checkbox
            :label="`${v.type}：￥${v.price}/份×${user.length}  最高赔付${v.compensation}万`"
            border
            @change="insuranceschange(v.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="tel">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    {{allprice}}
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
  mounted() {
    // setTimeout(() => {
    //   console.log(this.$store.state.user.userdata.token);
    // }, 1);
  },
  computed: {
    allprice() {
      let price = 0;

      if (!this.data.seat_infos.org_settle_price) return;

      // 机票的单价
      price += this.data.seat_infos.org_settle_price;
      // 燃油费
      price += this.data.airport_tax_audlet;
      // 保险
      price += this.insurances.length * 30;
      // 根据乘机人的数量翻倍
      price *= this.user.length;

      this.$store.commit("user/setallprice", price);
      return "";
    }
  },
  data() {
    return {
      user: [
        //用户列表
        {
          username: "",
          id: ""
        }
      ],
      up: {},
      insurances: [],
      checked: false,
      tel: "", //电话号码发送验证码
      captcha: "", //验证码
      contactName: "" //联系人名字
    };
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.user = [
        ...this.user,
        {
          username: "",
          id: ""
        }
      ];
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.user.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.tel
        }
      }).then(res => {
        console.log(res);
        this.$message.success(`验证码为${res.data.code}`)
        this.captcha = res.data.code
      })
    },

    // 提交订单
    handleSubmit() {
      let seat_xid = this.$route.query.seat_xid;
      let air = this.$route.query.id;
      this.up = {
        users: this.user,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.tel,
        captcha: this.captcha,
        invoice: false,
        seat_xid: seat_xid,
        air: air
      };
      let bl = true;
      this.user.some(v => {
        if (v.username == "" || v.id == "") {
          this.$message.error("缺少用户列表信息");
          bl = false;
          return;
        }
      });
      if (bl !== true) {
        return;
      }
      if (this.contactName == "") {
        this.$message.error("缺少联系人姓名");
        return;
      }

      this.$axios({
        url: "/airorders",
        method: "POST",
        headers: {
          //需要在Bearer后加个空格
          Authorization: "Bearer " + this.$store.state.user.userdata.token
        },
        data: this.up
      }).then(res => {
        console.log(res);
        this.$router.push({
          path: "/air/pay",
          query: {
            id: res.data.data.id
          }
        });
      });
    },

    //更换保险
    insuranceschange(id) {
      if (this.insurances.indexOf(id) == -1) {
        this.insurances.push(id);
      } else if (this.insurances.indexOf(id) !== -1) {
        this.insurances.forEach((v, index) => {
          if (v == id) {
            this.insurances.splice(index, 1);
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>