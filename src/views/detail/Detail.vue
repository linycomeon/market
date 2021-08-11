<template>
  <div class="detail">
    <detai-nav-bar class="detai-nav" @topItemClick="ItemClick" ref="nav"></detai-nav-bar>
    <scroll class="detail-scroll" ref="scroll" @scroll="tentscroll" :probeType='3'>
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :Goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imggLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo" ref="param" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommendList" ref="goods" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <toast :tips="DetailTips" :isture="isshow" />
  </div>
</template>

<script>
import DetaiNavBar from './childComps/DetailNavBar'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import goodsList from 'components/content/goods/goodsList'
import DetailBottomBar from './childComps/DetailBottomBar'
import Toast from 'components/common/toast/Toast'


import Scroll from 'components/common/scroll/Scroll'


export default {
  name:"Detail",
  components:{
    DetaiNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    goodsList,
    DetailBottomBar,
    Scroll,
    Toast,
  },
  data(){
    return{
      iid:null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      topDistanceY:[],
      currentIndex: 0,
      DetailTips:'',
      isshow:null,
    }
  },
  activated(){
    // 保存传入的iid
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res =>{
      this.topImages = res.result.itemInfo.topImages;
      const data = res.result;
      // 1.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      // 2.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      // 3.获取详情页面的对象
      this.detailInfo = data.detailInfo;
      // 4.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      // 5.获取评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0] || {};
      }
      //6.请求推荐数据
      getRecommend().then(res=>{
        this.recommendList = res.data.list
      });

    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.scroll.refresh();
      this.topDistanceY = [];
      this.topDistanceY.push(0);
      this.topDistanceY.push(this.$refs.param.$el.offsetTop);
      this.topDistanceY.push(this.$refs.comment.$el.offsetTop);
      this.topDistanceY.push(this.$refs.goods.$el.offsetTop);
      this.topDistanceY.push(Number.MAX_VALUE)
    },
    ItemClick(index){
      this.$refs.scroll.scroll.scrollTo(0,-this.topDistanceY[index],300)
    },
    //判断用户滚动的详情页面位置和商品、参数、评论...导航栏的联动效果
    tentscroll(position){
      const positionY = -position.y
      let length = this.topDistanceY.length
      for(let i=0 ; i<=length-1 ; i++){
        if((this.currentIndex !== i) && (positionY >= this.topDistanceY[i] && positionY < this.topDistanceY[i+1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    //1点击后获取购物车需要展示的信息
    addToCart(){
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //2将商品添加到购物车里面
      this.$store.dispatch('addCart',product).then(res=>{
        this.DetailTips = res;
        this.isshow = true;

        setTimeout(() => {
          this.isshow = false;
        },1500);
      })
    }
  },
}
</script>

<style scoped>
.detail{
  position: relative;
  z-index: 12;
  background-color: #fff;
}
.detail-scroll{
  height:calc(100vh - 7vh - 8vh);
}
.detai-nav{
  position: relative;
  z-index:9;
  background-color: #fff;
  
}
</style>