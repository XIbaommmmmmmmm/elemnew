<template>
  <div>
     <div class="nav">
            <span class="nav_left el-icon-arrow-left" @click="top()"></span>
            <span class="nav_center">{{goods_del.name}}</span>
       </div>
       <div class="goods_img">
         <img :src="goods_img+goods_del.image_path" alt="">
       </div>
       <div class="goods_msg">
         <p>{{goods_del.description}}</p>
         <p>{{goods_del.name}}</p>
         <p class="goods_score">
           <span>评分</span>
           <el-rate v-model="goods_del.rating" disabled class="score_img"></el-rate>
           <span class="score_num">{{goods_del.rating}}</span>
         </p>
         <p>
           <span>{{"月售"+goods_del.month_sales+"单"}}</span>
           <span class="color_or">{{"售价￥"+goods_del.specfoods[0].price}}</span>
           <span v-if="goods_del.specfoods.length==2" class="color_or">起</span>
         </p>
         <p>
           <span>{{"评论数"+goods_del.rating_count}}</span>
           <span>{{"好评率"+goods_del.satisfy_rate+"%"}}</span>
         </p>
         <span class="add">+</span>
       </div>
       <div class="shop_bottom">
          <span :class="{icon:buyshop,iconA:buyshop2}">
              <span class="el-icon-shopping-cart-2"></span>
          </span>
          <span>
              <p class="money">￥0.00</p>
              <p class="peisong">配送费$5</p>
          </span>
          <span :class="{close:buyshop,closeA:buyshop2}">
              去结算
          </span>
          <p class="buyshop">{{count}}</p>
    </div>
  </div>
</template>

<script>
export default {
name:"goods_del",
data(){
  return{
    buyshop:true,
    buyshop2:false,
    goods_del:"",
    goods_img:"http://elm.cangdu.org/img/",
    count:""
  }
},
created() {

  this.goods_del=this.$route.query.goods_del;
  console.log(this.goods_del);
},
methods: {
  top(){
    this.$router.go(-1);
  }
},
}
</script>

<style scoped>

.score_img {
  float:left;
}
.score_num {
  color:orange;
}
.goods_score{
  overflow: hidden;
}
.goods_score span{
float:left;
}
.goods_msg {
  width:3.75rem;
  box-sizing: border-box;
  position: relative;
}
.goods_msg p{
  width:100%;
  margin-top:0.15rem;
  margin-bottom: 0.15rem;
  color:#666;
}
.goods_msg p:nth-child(2){
  color:#333;
}
.goods_img {
  width:3.75rem;
  text-align: center;
  box-sizing: border-box;
}
.goods_img img {
  width:3rem;
  height:3.5rem;
}
.add {
  display: inline-block;
  width:0.2rem;
  height:0.2rem;
  line-height: 0.2rem;
  font-size: 0.2rem;
  text-align: center;
  background-color: #3190e8;
  color:#ffffff;
  border-radius: 50%;
  position:absolute;
  right:0;
  
}
.color_or{
  color:orange;
}
.nav{
  width:100%;
  height:0.55rem;
  line-height: 0.55rem;
  background-color: #3190e8;
  color:#ffffff;
  padding-left:0.05rem;
  position: relative;
  box-sizing: border-box;
  text-align: center;
 
  box-sizing: border-box;
}
.nav_left{
  float:left;
  margin-top:0.15rem;
  font-size: 0.3rem;
}
.nav_center{
    font-weight: 700;
    width:1.3rem;
    font-size: 0.2rem;
   position: absolute;
   left:1.8rem;
   transform: translateX(-50%);
   white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
}
.shop_bottom{
    width:3.75rem;
    height:0.46rem;
    position:fixed;
    bottom:0;
    left:0;
    background-color: #555;
    color:#fff;
}
.icon{
width:0.5rem;
height:0.5rem;
font-size: 0.4rem;
line-height: 0.5rem;
text-align: center;
border-radius: 50%;
border:4px solid grey;
/* background-color: rgb(49, 144, 232); */
background-color: #555;
left:0.15rem;
position:absolute;
top:-0.15rem;
}
.iconA{
width:0.5rem;
height:0.5rem;
font-size: 0.4rem;
line-height: 0.5rem;
text-align: center;
border-radius: 50%;
border:4px solid grey;
background-color: rgb(49, 144, 232);

left:0.15rem;
position:absolute;
top:-0.15rem;
}
.shop_bottom>span:nth-child(2){
    position:absolute;
    left:0.9rem;
}
.money {
    font-size: 0.2rem;
    margin-top:0.05rem;
    font-weight: 700
}
.peisong{
    font-size: 0.12rem;
    margin-top:0.05rem;
}
.close{
    width:1.17rem;
    height:0.46rem;
    line-height: 0.46rem;
    position: absolute;
    right: 0;
    text-align: center;
    /* background-color: rgb(76, 217, 100); */
     background-color: grey;
    text-emphasis: center;
    font-size: 0.16rem;
    font-weight: 600;
}
.closeA{
    width:1.17rem;
    height:0.46rem;
    line-height: 0.46rem;
    position: absolute;
    right: 0;
    text-align: center;
    background-color: rgb(76, 217, 100);
    text-emphasis: center;
    font-size: 0.16rem;
    font-weight: 600;
}
</style>