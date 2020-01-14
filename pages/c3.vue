<template>
    <div class="box">
        <button @click="shuffle">按钮</button>
        <transition name="fade">
            <p>{{arr}}</p>
        </transition>
        <div>aaa</div>
    </div>
</template>

<script>
import _ from "lodash/lodash"
export default {
    methods:{
        shuffle(){
            this.arr = _.shuffle(this.arr)
        }
    },
    data () {
        return {
            arr:[1,2,3,4,5]
        }
    }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>