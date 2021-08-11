<template>
  <div v-if="Object.keys(Goods).length !== 0" class="detail-base-info">
    <div class="info-top">{{Goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{Goods.newPrice}}</span>
      <span class="o-price">{{Goods.oldPrice}}</span>
      <!-- 优惠价占位 -->
    </div>
    <div class='info-other' @click="aa">
      <span>{{Goods.columns[0]}}</span>
      <span>{{Goods.columns[1]}}</span>
      <span>{{Goods.services[Goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span v-for='index in Goods.services.length-1' :key='index' class="info-service-item">
        <img :src="Goods.services[index-1].icon">
        <span>{{Goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailBaseInfo",
  props:{
    Goods:{
      type:Object,
      default(){
        return {}
      }
    },
  },
  methods:{
    aa(){
      console.log(this.Goods)
    }
  }
}
</script>

<style>
.info-top{
  font-size:20px;
  font-weight:500;
}
.info-other{
  margin-left:10px;
  display:flex;
  justify-content: space-between;
  line-height: 30px;
  font-size:15px;
  margin-top:3px;
  border-bottom:2px solid rgba(100,100,100,.1)
}
.info-price {
  margin-top:3px;
}
.info-price .n-price {
  font-size: 24px;
  color: var(--color-high-text);
}
.info-price .o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.info-price .o-price,.info-other{
  color:#999;
}
.info-top,.info-price,.info-other,.info-service{
  margin-left:10px;
  width:355px;
}
.info-service{
  display:flex;
  justify-content: space-between;
  line-height:32px;
  padding:5px 0px;
  border-bottom:5px solid rgba(100,100,100,.1)
}
.info-service-item img{
  position: relative;
  top:3px;
  width:15px;  
}
.info-service-item{
  font-size:12px;
}
</style>