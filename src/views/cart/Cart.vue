<template>
  <div>
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车({{$store.state.cartList.length}})</template>
    </nav-bar>
    <cart-list />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList.vue'

export default {
  name : "Cart",
  components:{
    NavBar,
    CartList,
  }
}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color:#fff;
  font-size: 16px;
}
</style>