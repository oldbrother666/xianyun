<template>
    <div class="container">
        <Header/>
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <OrderForm :data='info'/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <orderAside :data='info'/>    
            </div>
        </el-row>
        <Footer/>
    </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import OrderForm from "@/components/orderForm.vue"
import orderAside from "@/components/orderAside.vue"
export default {
    components:{
        OrderForm,Header,Footer,orderAside
    },
    data () {
        return {
            info:{
                seat_infos: {}
            }
        }
    },
  created(){
    let id = this.$route.query.id
    let seat_xid = this.$route.query.seat_xid
    // console.log(seat_xid)
    this.$axios({
      url:`/airs/${id}`,
      params:{
          seat_xid:seat_xid
      }
    }).then(res =>{
      console.log(res)
      this.info = res.data
    })
  }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>