<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.acm" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'RecommendView',
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
.recommend{
  width:100%;
  display:flex;
  padding:12px 0 15px;
  border-bottom:8px solid #eee;
}
.recommend-item{
  flex:1;
  text-align: center;
  font-size:12px;
}
.recommend img {
  width:75px;
  height:75px;
  margin-bottom:5px;
}
</style>