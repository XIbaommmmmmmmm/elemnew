import Vue from 'vue'
import Vuex from 'vuex'
import state from "./state"
import mutations from "./mutations"
import getters from "./getters"
import actions from "./actions"
Vue.use(Vuex);
//配置vuex,配置store存储器用来存储组件之间共享的资源
const store = new Vuex.Store({
    // state状态值 类似于组件中的data数据源
    state,
    // 修改状态的方法（共享方法），类似于组件中的methods
    mutations,
    // actions:{
    //   // 异步的递减
    //     asyncReduce(context){
    //       AudioContext.commit("reduce",5);
    //     }
    // },
    // 类似于组件中的computed，依赖于state创建共享属性，该方法对state的数据作处理
    getters,
    actions,
  
  })

// 到处存储对象store给外界使用
export default store;