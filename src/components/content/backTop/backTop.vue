<template>
  <div class="back-top" @click='topclick'>
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name:"backTop",
  methods:{
    topclick(){
      this.$emit('toclick')
    }
  }
}
</script>

<style>
.back-top{
  position:fixed;
  right:10px;
  bottom:50px;
}
.back-top img{
  width:43px;
  height:43px;
}
</style>