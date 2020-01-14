<template>
  <div class="container">
    <!-- 导入头部 -->
    <Header/>
    <div class="box">
      <el-row :gutter="20">
      <!-- 左边 -->
      <el-col :span="8"><Left/></el-col>
      
      <!-- 右边 -->
      <el-col :span="16"><Right/></el-col>
    </el-row>
    </div>
    

    <!-- 脚部 -->
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import Left from '@/components/post/postleft.vue'
import Right from '@/components/post/postright.vue'
export default {
  components:{
    Header,Footer,Left,Right
  }
}
</script>

<style scoped lang="less">

.box{
  width: 1000px;
  margin: 10px auto !important
}
</style>