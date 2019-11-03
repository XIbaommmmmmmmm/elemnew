import Vue from 'vue'
import Router from 'vue-router'
import Elm from '@/components/elm'
import Login from '@/components/login'
import Search from '@/components/search'
import Address from '@/components/adress'
import Hisser from '@/components/hisSer'
import Home from '@/components/home'
import Shop_list from '@/components/shop_list'
import Shop_del from '@/components/shop_del'
import Goods_del from '@/components/goods_del'
// 饭店商品
import Shop_del_goods from '@/components/shop_del_goods'
import Good_class from '@/components/good_class'
// 评价
import Shop_del_evaluate from '@/components/shop_del_evaluate'
import Me from '@/components/me'
import Food from '@/components/food'
import Seac from '@/components/seac'
import Order from '@/components/order'
// 购物车
import Buycart from '@/components/buyCart'
// 去结算
import Go_order from '@/components/go_order'
import Order_invoice from '@/components/order_invoice'
import Order_remark from '@/components/order_remark'
import Select_adress from '@/components/select_adress'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      name:"elm",
      component:Elm
    },
    {
      path:"/login",
      name:"login",
      component:Login
    },{
      path:"/search",
      name:"search",
      component:Search,
      redirect:"/hisser",
      children:[
        {
          path:"/adress",
          name:"adress",
          component:Address
        },
        {
          path:"/hisser",
          name:"hisser",
          component:Hisser
        }
      ]
    },
    {
      path:"/food",
      name:"food",
      component:Food,
      redirect:"/home",
      children:[
        {
          path:"/home",
          name:"home",
          component:Home
        },{
          path:"/me",
          name:"me",
          component:Me
        },{
          path:"/order",
          name:"order",
          component:Order
        },{
          path:"/seac",
          name:"seac",
          component:Seac
        }
      ]
    },{
      path:"shop_list",
      name:"shop_list",
      component:Shop_list
    },{
      path:"/shop_del",
      name:"shop_del",
      component:Shop_del,
      redirect:"/good_class",
      children:[
        {
            path:"/good_class",
            name:"good_class",
            component:Good_class
        },
        {
          path:"/shop_del_evaluate",
          name:"shop_del_evaluate",
          component:Shop_del_evaluate
        }
      ]
    },{
      path:"/goods_del",
          name:"goods_del",
          component:Goods_del
    },{
      path:"/go_order",
          name:"go_order",
          component:Go_order
    },{
      path:"/order_invoice",
      name:"order_invoice",
      component:Order_invoice
    },{
      path:"/order_remark",
      name:"order_remark",
      component:Order_remark
    },{
      path:"/select_adress",
      name:"select_adress",
      component:Select_adress
    }

  ]
})
