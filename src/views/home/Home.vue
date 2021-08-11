<template>
  <div id='home'>
    <nav-bar class='nav-bar'>
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control :title="['流行','新款','精选']" 
                  class='tab-control'
                  @click='tabclick' ref="tabControq" 
                  v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pulling-up-load='true' @pullingUp="loadMove">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <featurn-view/>
      <tab-control :title="['流行','新款','精选']" @click='tabclick' ref="tabControqq"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top class="back-top" @toclick="topclick" v-show="backTopScroll"></back-top>

  </div>
</template>

<script>
import HomeSwiper from 'views/home/childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeaturnView from './childComps/FeaturnView'

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl'
import goodsList from 'components/content/goods/goodsList'
import Scroll from 'components/common/scroll/Scroll'
import backTop from 'components/content/backTop/backTop'

import {getHomeMultidata,getHomeGoods} from 'network/home';

export default {
  name : "Home",
  components:{
    HomeSwiper,
    RecommendView,
    FeaturnView,
    NavBar,
    TabControl,
    goodsList,
    Scroll,
    backTop,
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0, list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0, list:[]},
      },
      currentType:'pop',
      backTopScroll:true,
      tabOffsetTop:609,
      isTabFixed:false,
      UserLocationY:0,
    }
  },
  activated(){
    this.$refs.scroll.scroll.scrollTo(0,this.UserLocationY,0);
    this.$refs.scroll.scroll.refresh()
  },
  deactivated(){
    this.UserLocationY = this.$refs.scroll.scroll.absStartY
  },
    // 数据请求
  created() {
    // 1.请求多个数据
    this.getHomeMultidata(),
    // 2.请求商品数据
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')
  },
  mounted(){
    // 3.监听item里面的图片加载
    this.$bus.$on('itemImageLoad',()=>{
      this.$refs.scroll && this.$refs.scroll.scroll.refresh()
    })
    // console.log(this.$refs.tabControl.$el.offsetTop)
  },
  methods:{
    tabclick(index){
      switch(index){
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControq.currentIndex = index;
      this.$refs.tabControqq.currentIndex = index;
    },
    topclick(){
      this.$refs.scroll.scroll.scrollTo(0,0,300)
    },
    contentScroll(position){
      // 1.返回按钮
      this.backTopScroll = (-position.y) > 1000;
      // 2.精选吸顶
      this.isTabFixed = (-position.y) >= this.tabOffsetTop;
    },
    loadMove(){
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControqq.$el.offsetTop
    },
  // 数据请求
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 请求一次就不会请求了，主动调用finishPullUp方法
        this.$refs.scroll.scroll.finishPullUp()
      })
    }

  },
}
</script>

<style scoped>
.nav-bar{
  color:#fff;
  background-color: var(--color-tint);
  /* 用自带滚轮时定位让标题不消失 */
  /* position: fixed;
  top:0px;
  left:0px;
  right:0px;
  z-index:9; */
}
.tab-control{
  position: fixed;
  top:44px;
  left:0px;
  right:0px;
  z-index:10;
}
.content{
  height:calc(100vh - 7vh);
  overflow: hidden;
}
</style>