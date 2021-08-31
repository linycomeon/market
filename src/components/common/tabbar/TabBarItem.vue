<template>
  <div class='tab-bar-item' @click="itemClick">
    <div v-if="!aCtive"><slot name='item-icon'></slot></div>
    <div v-else><slot name='item-icon-active'></slot></div>
    <div :class="{active:aCtive}" :style='activeStyle'><slot name='item-text'></slot></div>
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  // data(){
  //   return{
  //     aCtive:false,
  //   }
  // },
  computed:{
    aCtive(){
      return this.$route.path.indexOf(this.path) !==-1
    },
    activeStyle(){
      return this.aCtive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path).catch(err => err);
    }
  }
}
</script>

<style>
.tab-bar-item{
  flex:1;
  text-align: center;
  height:49px;
}
.tab-bar-item img{
  height:24px;
  width:24px;
  margin-top:3px;
  vertical-align: middle;
}
.active{
  color:red;
}
</style>