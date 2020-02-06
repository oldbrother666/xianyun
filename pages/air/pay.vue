<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{info.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  data() {
    return {
      info: {},
      timer: "" //检查是否已支付定时器
    };
  },
  methods: {
    //  检查有没有支付
    checkpay() {
     this.timer =  setInterval(() => {
        this.$axios({
          url: "/airorders/checkpay",
          data: {
            id: this.info.id,
            nonce_str: this.info.price,
            out_trade_no: this.info.orderNo
          },
          headers: {
            Authorization: "Bearer " + this.$store.state.user.userdata.token
          },
          method: "POST"
        }).then(res => {
          if(res.data.statusTxt !== '订单未支付'){
              clearInterval(this.timer)
          }
          console.log(res.data.statusTxt)
        });
      }, 2000);
    }
  },
  created() {
    setTimeout(() => {
      const { id } = this.$route.query;
      this.$axios({
        url: `/airorders/${id}`,
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userdata.token
        }
      }).then(res => {
        console.log(res);
        this.info = res.data;
        const wxcanvas = document.getElementById("qrcode-stage");
        QRCode.toCanvas(wxcanvas, this.info.payInfo.code_url, {
          width: 250
        });
        this.checkpay();
      });
    }, 1);
  },
  destroyed(){
      //退出此网页销毁检查付款定时器
      clearInterval(this.timer)
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>