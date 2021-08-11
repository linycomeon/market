<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:"Scroll",
  data(){
    return{
      scroll:null,
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullingUpLoad:{
      type:Boolean,
      default:false
    }

  },
  mounted(){
    // 1.创建BScroll对象
    this.scroll = new BScroll (this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullingUpLoad
    })
    // 2.监听滚动
    this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position)
    })
    // 3.上拉加载更多数据
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
  }

}
</script>

<style>

</style>