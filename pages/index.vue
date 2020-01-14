<template>
  <div class="index">
    <Header></Header>
    <div class="block">
      <span class="demonstration"></span>
      <el-carousel height="800px">
        <el-carousel-item v-for="(item,index) in picture" :key="index" style="text-align:center">
          <h3><img :src="$axios.defaults.baseURL+item.url" alt="" style=""></h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";

export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      picture:['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2057075698,3202375967&fm=11&gp=0.jpg','https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3864723076,936215139&fm=11&gp=0.jpg','https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2300356486,1594106837&fm=11&gp=0.jpg']
    }
  },
  mounted(){
    this.$axios({
      url:'/scenics/banners',
    }).then(res=>{
      this.picture = res.data.data
      // console.log(this.picture)
      // console.log(this.$store.state.user.userdata.token)
    })
  }
};
</script>

<style lang='less'>
* {
  margin: 0;
  padding: 0;
}
ul,
li,
ol {
  list-style: none;
}
em,
i,
strong,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-style: normal;
}
a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  color: inherit;
}


</style>
