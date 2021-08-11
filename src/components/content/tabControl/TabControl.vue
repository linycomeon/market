<template>
  <div class="tabcontrol">
    <div v-for="(item,index) in title" :key='item' class="tabcontrol-item" 
         :class="{active:index === currentIndex}"
         @click="itemclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    title:{
      type:Array,
      default() {
        return []
      }
    }
  },
  data(){
    return{
      currentIndex:0,
    }
  },
  methods:{
    itemclick(index){
      this.currentIndex = index; 
      this.$emit('click',index)
    },
  }
}
</script>

<style>
.tabcontrol{
  display:flex;
  text-align: center;
  height:44px;
  line-height: 44px;
  font-size: 15px;
  background-color:#fff;
}
.tabcontrol-item{
  flex:1;
}
.active{
  color:var(--color-high-text);
}
.active span {
  border-bottom:3px solid var(--color-tint);
}
.tabcontrol-item span{
  padding:3px;
}
</style>