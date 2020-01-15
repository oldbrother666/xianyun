<template>
<div class="box">
<div class="comment1">
    <div class="comment-top1">
      <img :src="'http://127.0.0.1:1337'" alt />
      1
      <span>2020-20-5</span>
      <div class="num">2</div>
    </div>
    <div class="comment-text1">{{data.content}}</div>
    <div class="return1" @click="a">
        回复
    </div>
  </div>
</div>
  
</template>

<script>
export default {
    props:{
        data:{
            type: Object,
            default(){
                return {

                }
            }
        }
    },
    methods:{
        a(){
            console.log(this.data)
        }
    }
};
</script>

<style lang='less' scoped>
.comment1 {
//   background: #cccccc;
  padding: 15px;
  border: 1px solid #dddddd;
  .comment-top1 {
    display: flex;
    font-size: 12px;
    img {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
    span {
      padding: 0 7px;
    }
    .num{
        text-align: right;
        flex: 1;
        padding-right: 3px
    }
  }
  .comment-text1{
      padding:0 25px;
  }
  .return1{
      font-size: 13px;
      text-align: right;
      padding: 0 15px;
      color: blue;
      cursor: pointer;
  }
}
</style>