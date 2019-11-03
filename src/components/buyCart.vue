<template>
  <div class="buycart_wrap" v-show="show">
     <ul>
       <li class="b_title">
         <span class="b_title_left">购物车</span>
         <span class="b_title_right el-icon-delete">清空</span>
       </li>
       <li class="b_con" :key="i" v-for="(v,i) in usedata">
           <p class="name">{{v.name}}</p>
           <p class="price">{{"￥"+v.specfoods[0].price*v.is_featured}}</p>
           <p class="num">
             <button class="del" @click="del(v)">-</button>
             <span>{{v.is_featured}}</span>
             <button class="add" @click="add(v)">+</button>
           </p>
       </li>
     </ul>
  </div>
</template>
<script>
export default {
name:"buycart",
data(){
return{
  show:true,
  msg:"",
  usedata:[],
  shop_id:""
 }
},
created() {
  this.shop_id=getCookie("shop_id");
  this.show=this.$route.query.cartshow;
  // this.msg=this.$store.state.a;
  this.msg=JSON.parse( localStorage.getItem("buycart"+this.shop_id));
  this.getmsg();
},
methods: {
  getmsg(){
      var b;
      for(var i=0;i<this.msg.length;i++){
        b=this.msg[i];
        for(var j=0;j<b.foods.length;j++){
          if(b.foods[j].is_featured>0){
            this.usedata.push(b.foods[j]);
          }
        }
      }
  },
  add(a){
    console.log(a);
    a.is_featured++;
        // for(var i=0;i<a.length;i++){
        //   for(var j=0;j<a[i].foods.length;j++){
        //     if(b[c].item_id==a[i].foods[j].item_id){
        //       a[i].foods[j].is_featured++;
        //     }
        //   }
        // }
        // console.log("asss")
      //  localStorage.setItem("buycart"+this.shop_id,JSON.stringify(a));
       this.msg=JSON.parse( localStorage.getItem("buycart"+this.shop_id));
    },
    // 减
    del(a,b,c){
       for(var i=0;i<a.length;i++){
          for(var j=0;j<a[i].foods.length;j++){
            if(b[c].item_id==a[i].foods[j].item_id){
              a[i].foods[j].is_featured--;
            }
          }
        }
       localStorage.setItem("buycart"+this.shop_id,JSON.stringify(a));
       this.msg=JSON.parse(localStorage.getItem("buycart"+this.shop_id));
    },
},
watch: {
  "$route":function(newv,oldv){
      this.show=newv.query.cartshow;
  }
},
}
</script>

<style scoped>
.name {
  position:absolute;
  top:0.15rem;
  left:0.05rem;
  font-size: 0.18rem;
}
.price {
  position: absolute;
  top:0.15rem;
  left:2.5rem;
}
.num {
  position: absolute;
  top:0.12rem;
  right:0.2rem;
}
.del {
  width:0.2rem;
    height:0.2rem;
    line-height: 0.15rem;
    font-size: 0.15rem;
    background-color: #ffffff;
    border:1px solid #3190e8;
    color:#333333;
    border-radius: 50%;
    outline: none;
}
.add {
  width:0.2rem;
    height:0.2rem;
    line-height: 0.2rem;
    font-size: 0.1rem;
    background-color: #3190e8;
    color:#ffffff;
    border-radius: 50%;
    border:none;
    outline: none;
}
.buycart_wrap{
    width:3.75rem;
    /* height:5rem; */
    position: fixed;
    bottom:0.45rem;
    left:0;
    z-index:9;
    background-color:#fff;
    overflow: scroll;
}
.b_title {
  width:100%;
  padding:0.018rem 0.14rem;
  height:0.4rem;
  line-height: 0.4rem;
  color:#333;
  font-weight: 400;
  background-color: #eceff1;
  box-sizing: border-box;
}
.b_title_left{
  float:left;
}
.b_title_right{
  float:right;
  margin-top:0.1rem;
 
}
.b_con{
  width:100%;
  height:0.5rem;
  background-color: #fff;
  position:relative;
 
}
</style>