<template>
  <div id='tab-bar'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'TabBar'
}
</script>

<style>
body{
  margin:0px;
  padding:0px;
}
#tab-bar{
  display:flex;
  background-color: #f6f6f6;
  position: fixed;
  bottom:0px;
  left:0px;
  right:0px;
  z-index:10;
  box-shadow:0px -3px 1px rgb(100,100,100,0.1);
}
</style>