import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建store对象
const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{

  },
  actions:{
    addCart(context,payload){
      return new Promise((resolve) => {
        let oldProduct = null;
        //1.判断是否有这个数据,有的话加入存入变量，在下一个判断进行个数加一
        for(let item of context.state.cartList){
          if(item.iid === payload.iid){
            oldProduct = item
          }
        }
        //2.个数加一
        if(oldProduct){
          oldProduct.count += 1
          resolve('商品数量加一')
        }else{
          payload.count = 1
          payload.checked = true
          context.state.cartList.push(payload)
          resolve('添加商品成功')
        }
      })
    }
  }
})

//3.挂载Vue实例上
export default store