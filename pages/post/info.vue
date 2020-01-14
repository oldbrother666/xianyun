<template>
  <div class="box">
    <!-- 头部 -->
    <Head />
    <div class="boxfirst">
        <Texts :data='posttext'/>
        <Right @jump='chuan'/>
    </div>
    <!-- 脚部 -->
    <Foot />
  </div>
</template>

<script>
import Head from "@/components/header.vue";
import Foot from "@/components/footer.vue";
import Texts from "@/components/post/infoleft.vue";
import Right from "@/components/post/inforight.vue"
export default {
  components: {
    Head,Foot,Texts,Right
  },
  created() {
    const id = this.$route.query.id;
    this.$axios({
      url:'/posts',
      params:{
        id
      }
    }).then(res =>{
    // console.log(res)
     this.posttext = res.data.data[0]
    })
  },
  data () {
    return {
      posttext:{}
    }
  },
  methods:{
    chuan(id){
      this.$axios({
      url:'/posts',
      params:{
        id
      }
    }).then(res =>{
     this.posttext = res.data.data[0]
    })
    }
  }
};
</script>

<style lang='less' scoped>
.boxfirst{
    width: 1000px;
    margin: 0 auto;
    display: flex;
    margin-top: 20px;
}
</style>