<template>
  <div class="slider-box" @mouseenter="stops" @mouseleave="start">
    <div class="box1" v-show="num===0">1</div>
    <div class="box2" v-show="num===1">2</div>
    <div class="box3" v-show="num===2">3</div>
    <div class="button">
      <span @click="btn(0)">按钮1</span>
      <span @click="btn(1)">按钮2</span>
      <span @click="btn(2)">按钮3</span>
    </div>
    <div class="time">
      <div class="btn1" @click="left"></div>
      <div class="btn2" @click="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      stop: ""
    };
  },
  mounted() {
    this.stop = setInterval(value => {
      this.right();
    }, 2000);
  },
  methods: {
    btn(index) {
      this.num = index;
    },
    // 点击左边
    left() {
      if (this.num <= 2 && this.num > 0) {
        this.num = this.num - 1;
      } else {
        this.num = 2;
      }
    },
    // 点击右边
    right() {
      if (this.num >= 0 && this.num < 2) {
        this.num = this.num + 1;
      } else {
        this.num = 0;
      }
    },
    // 定时停止
    stops() {
      clearInterval(this.stop);
    },
    // 定时开始
    start() {
      this.stop = setInterval(value => {
        this.right();
      }, 2000);
    }
  }
};
</script>

<style>
/* .time{
    position: relative;
} */
.btn1 {
  position: absolute;
  top: 50%;
  left: 0;
  width: 50px;
  height: 50px;
  background: black;
  transform: translate(0, -50%);
}
.btn2 {
  position: absolute;
  top: 50%;
  width: 50px;
  height: 50px;
  background: black;
  right: 0;
  transform: translate(0, -50%);
}
div {
  transition: all 1s;
}
.button {
  z-index: 100;
  /* background: #000; */
  /* height: 20px; */
  /* width: 130px; */
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
}
span {
  padding: 5px 15px;
}
.slider-box {
  width: 500px;
  height: 500px;
  border: 1px solid black;
  margin: 20px auto;
  position: relative;
  padding: 10px;
}
.box1 {
  position: absolute;
  top: 0;
  left: 0;
  background: skyblue;
  width: 498px;
  height: 498px;
  display: block;
}
.box2 {
  position: absolute;
  top: 0;
  left: 0;
  background: rgb(13, 13, 122);
  width: 498px;
  height: 498px;
  /* display: none; */
}
.box3 {
  position: absolute;
  top: 0;
  left: 0;
  background: red;
  width: 498px;
  height: 498px;
  /* display: none; */
}
.show {
  display: block;
}
</style>