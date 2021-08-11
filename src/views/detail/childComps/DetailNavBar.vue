<template>
  <div class="Detai-nav-bar">
    <nav-bar>
      <template v-slot:left>
        <div @click="imgClick">
          <img src="~assets/img/common/back.svg" class="item-img"  alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class='title'>
          <div v-for="(item,index) in title" :key='index' class='title-item' 
                @click="itemClick(index)" 
                :class="{active:currentIndex === index}">{{item}} 
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name:"DetaiNavBar",
  components:{
    NavBar,
  },
  data(){
    return{
      title:['商品','参数','评论','推荐'],
      currentIndex:0,
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      this.$emit('topItemClick',index)
    },
    imgClick(){
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.title{
  display:flex;
}
.title-item{
  flex:1;
}
.active{
  color:var(--color-tint)
}
.item-img{
  margin-top:10px;
}
</style>