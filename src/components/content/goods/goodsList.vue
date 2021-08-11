<template>
  <div class="goods-list">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goodsitem="item"></goods-list-item>
  </div>
</template>

<script>
import goodsListItem from 'components/content/goods/goodsListItem'

export default {
  name:"goodsList",
  components:{
    goodsListItem,
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods-list{
  display:flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>