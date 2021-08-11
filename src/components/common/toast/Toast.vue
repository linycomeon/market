<template>
  <div :class="{toast:isture}" >
    <div class="toast.tips">{{tips}}</div>
  </div>
</template>

<script>
export default {
  name:"Toast",
  props:{
    tips:{
      type:String,
      default:''
    },
    isture:{
      type:Boolean,
    }
  },
}
</script>

<style>
.toast{
  padding:8px 10px;
  color:#fff;
  background-color:rgba(0,0,0,0.75);
  position:fixed;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
}
</style>