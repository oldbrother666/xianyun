<template>
  <div class="box">
      <!-- 头部 -->
      <Head/>
        <div class="write">
            <div class="write-left">
                <h3>发表新攻略</h3>
                <p>分享你的个人游记，让更多人看到哦！</p>
                <el-input v-model="posttitle" placeholder="请输入内容" class="input1"></el-input>

            </div>
            <div class="write-right">
                <div class="drafts">
                    草稿箱（0）
                </div>
            </div>
        </div>
        <!-- 脚部 -->
      <Foot/>
  </div>
</template>

<script>
import Head from "@/components/header.vue";
import Foot from "@/components/footer.vue";
export default {
    components:{
        Head,Foot
    },
    data () {
        return {
            posttitle:''
        }
    }
}
</script>

<style lang='less' scoped>
.write{
    width: 1000px;
    // border: 1px solid black;
    margin: 15px auto;
    display: flex;
    .write-left{
        width: 700px;
        h3{
            font-size: 22px;
            margin-bottom: 10px;
        }
        p{
            font-size: 12px;
            color: #999999;
            margin-bottom: 8px;
        }
    }
    .write-right{
        width: 300px;
        .drafts{
            width: 200px;
            height: 56px;
            border: 1px solid #dddddd;
            text-align: center;
            line-height: 56px;
            margin: 0 auto;
        }
    }
}
</style>