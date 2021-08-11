<template>
  <div>
    <scroll class="content" ref="scroll">
      <div class="cart-list" v-for="(item,index) in itemInfo" :key="index">
        <div class="item-click">
          <img src="~assets/img/cart/tick.svg"  :class="{check: itemInfo[index].checked}" @click="clickIcon(index)">
        </div>
        <div class="item-img">
          <img :src="item.image" alt="商品图片">
        </div>
        <div class="item-info">
          <div class="item-info-top">{{item.title}}</div>
          <div class="item-info-center">{{item.desc}}</div>
          <div class="item-info-bottom">
            <span class="spanleft">{{item.price}}</span>
            <span class="spanright">x{{item.count}}</span>
          </div>
        </div>
      </div>
    </scroll>
    <div class="settlement">
      <div class="set-click">
        <img src="~assets/img/cart/tick.svg" :class="{check:isSelectAll}" @click="qxclick"> 全选
      </div>
      <div class="set-total">
        合计{{totalPrice}}
      </div>
      <div class="set">
        结算
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
  name:"CartList",
  components:{
    Scroll,
  },
  data(){
    return{
      itemInfo:[],
    }
  },
  activated(){
    this.itemInfo = this.$store.state.cartList;
    this.$refs.scroll.scroll.refresh()
  },
  methods:{
    clickIcon(index){
      this.itemInfo[index].checked = !this.itemInfo[index].checked
    },
    qxclick(){
      if(this.isSelectAll){
        this.itemInfo.forEach(item => item.checked = false)
      }else{
        this.itemInfo.forEach(item => item.checked = true)
      }
    }
  },
  computed:{
    totalPrice(){
      return this.itemInfo
        .filter(item => item.checked)
        .reduce((prev,item) => prev + item.price * item.count,0)
        .toFixed(2)
    },
    isSelectAll(){
      if(this.itemInfo.length === 0) return false
      return !(this.itemInfo 
        .filter(item => !item.checked).length)
    }
  }
}
</script>

<style scoped>
.content{
  height:calc(100vh - 7vh - 8vh - 7vh);
  overflow: hidden;
}
.cart-list{
  display:flex;
  height:150px;
  border-bottom:1px solid #DCDCDC;
}
.item-img{
  flex:1
}
.item-img img{
  height:130px;
  width:86.6px;
  margin:0 10px;
  border-radius: 10px;
}
.item-info-top{
  width:250px;
  padding:10px 0;
  font-size:20px;
  font-weight: 500;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-info-center{
  width:255px;
  padding: 10px 0 30px 0;
  font-size:16px;
  font-weight:400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-info-bottom{
  display:flex;
  width:255px;
  justify-content: space-between;
  padding-top:20px;
  font-size:19px;
}
.item-info-bottom .spanleft{
  color:chocolate
}
.item-info-bottom .spanright{
  padding-right:15px;
}
.item-click{
  width:100%;
  display: flex;
  align-items:center;
}
.item-click img{
  border:1px solid darkgray;
  border-radius: 10px;
  width:20px;
  margin-left:5px;
}
.check{
  border-color:darkorange;
  background-color: darkorange;
}
.settlement{
  height:49px;
  background-color:#DCDCDC;
  position:fixed;
  display:flex;
  line-height: 49px;
  z-index: 999;
  bottom:53px;
}
.settlement img{
  position: relative;
  top:4px;
  border:1px solid darkgray;
  border-radius: 10px;
  width:20px;
  margin-left:5px;
}
.set-click{
  width:100px;
  flex:1;
}
.set-total{
  width:150px;
}
.set{
  width:125px;
  background-color: darkred;
  color:#fff;
  text-align: center;
}
</style>