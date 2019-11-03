<template>
  <div class="eva_con" id="all">
      <div class="eva_con_score">
        <div class="eva_con_score_left">
            <p>{{one}}</p>
            <p>综合评价</p>
            <p>{{"高于周边商家"+two+"%"}}</p>
        </div>
        <div class="eva_con_score_right">
            <p>
              <span>服务态度</span>
             <el-rate v-model="three" disabled class="one"></el-rate>
            </p>
            <p>
              <span>菜品评价</span>
              <el-rate v-model="four" disabled class="one"></el-rate>
            </p>
             <p>
              <span> 送达时间</span>
              
             </p>
        </div>
      </div>
      <div class="eva_con_class">
        <span>全部(473)</span>
         <span>满意(453)</span>
         <span>不满意(20)</span>
         <span>有图(2)</span>
         <span>味道好(47)</span>
         <span>送货快(32)</span>
         <span>分量足(32)</span>
         <span>包装精美(15)</span>
         <span>干净卫生(15)</span>
         <span>食材新鲜(15)</span>
         <span>服务不错(15)</span>
      </div>
      <ul class="user_con" id="ul1">
        <li :key="i" v-for="(v,i) in shopMsg" @scroll="get()">
          <div class="user_left">
              <img :src="shop_img+v.avatar+'.jpeg'" alt="" v-show="v.avatar!=''">
              <img src=" http://elm.cangdu.org/img/default.jpg" alt="" v-show="v.avatar==''">
          </div>
          <div class="user_right">
            <p class="user_name">{{v.username}}</p>
            <p class="user_score">
              <el-rate v-model="v.rating_star" disabled></el-rate>
            </p>
            <div class="user_img" v-show="v.item_ratings.length!=0">
                  <p :key="a" v-for="(b,a) in v.item_ratings" v-show="b.image_hash!=''">
                    <img :src="shop_img+b.image_hash+'.jpeg'" alt="">
                  </p>
            </div>
            <p class="user_mark">
              <span :key="a" v-for="(b,a) in v.item_ratings" v-show="v.item_ratings.length!=0">{{b.food_name}}</span>
            </p>
          </div>
          <p class="time">{{v.rated_at}}</p>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
name:"shop_del_evaluate",
data(){
  return{
    shopScore:"",
    shop_id:"",
    shopMsg:"",
    shop_img:"https://fuss10.elemecdn.com/",
  }
},
created() {
  this.shop_id=this.$route.query.shop_id;
  this. getScore();
  this.getMsg();
},
computed: {
  one:function(){
    return Math.floor(this.shopScore.overall_score*100)/100;
  },
  two:function(){
     return (Math.floor(this.shopScore.compare_rating*100)/100)*100;
  },
  three:function(){
    return this.shopScore.service_score;
  },
  four:function(){
    return this.shopScore.food_score
  }
},
methods: {
  getScore(){
    console.log("店铺id是"+this.shop_id);
    const api="https://elm.cangdu.org/ugc/v2/restaurants/"+this.shop_id+"/ratings/scores";
    this.$http({
      url:api,
      method:"get"
    }).then(res=>{
      this.shopScore=res.data;
      
    })
  },
  getMsg(){
    const api="https://elm.cangdu.org/ugc/v2/restaurants/"+this.shop_id+"/ratings?offset=0&limit=10";
    this.$http({
      url:api,
      method:"get"
    }).then(res=>{
      this.shopMsg=res.data;
      console.log(res.data);
    })
  },
  get(){
   
  }
},
}
</script>

<style scoped>
.eva_con{
  border-top:1px solid #e4e4e4;
  position:absolute;
  top:1.32rem;
}
.eva_con_score{
  width:3.75rem;
  height:1.3rem;
  background-color: #ffffff;
  overflow: hidden;
}
.eva_con_score_left{
  float:left;
  margin-left:0.3rem;
  margin-right:0.2rem;
}
.eva_con_score_left p:nth-child(1){
  color:orange;
  font-size: 0.4rem;
  margin-top:0.1rem;
}
.eva_con_score_left p:nth-child(2){
  font-size: 0.2rem;
  color:#333;
  margin-top:0.1rem;
}
.eva_con_score_left p:nth-child(3){
  font-size: 0.1rem;
  color:#999;
  margin-top:0.1rem;
}
.eva_con_score_right{
  float:left;
}
.eva_con_score_right p{
  width:2.1rem;
  
  font-size: 0.17rem;
  color:#333;
  margin-top:0.15rem;
  overflow: hidden;
 
}
.eva_con_score_right p span {
  float:left;
}
.one {
  float:right;
  /* border:1px solid red; */
  width:1.3rem;
}
.eva_con_class{
  margin-top:0.1rem;
  width:3.75rem;
  height:1.5rem;
  background-color: #ffffff;
  padding:0.12rem;
  padding-top:0.16rem;
  box-sizing: border-box;
}
.eva_con_class span {
  display: inline-block;
  padding:0.09rem;
  background-color: rgba(208, 226, 240, 0.884);
  margin-right: 0.05rem;
  color:#ffffff;
  font-size: 0.1rem;
  margin-top:0.05rem;
  border-radius: 10%;
}
.user_con li{
  padding-top:0.09rem;
  width:3.75rem;
  height:1.5rem;
  background-color: #ffffff;
  border-top:1px solid #e4e4e4;
  position: relative;
}
.user_left{
  float:left;
  width:0.7rem;
height: 100%;
  margin-right:0.09rem;
}
.user_left img {
  width:0.5rem;
  height:0.5rem;
  margin-left:0.087rem;
  border-radius: 50%;
}
.user_right{
  float:left;
}
.user_name{
  color:#333;
  font-size: 0.13rem;
  margin-bottom: 0.1rem;
}
.user_score{
  margin-bottom:0.05rem;
}
.user_img {
  margin-bottom:0.09rem;
  width:2rem;
  height:0.6rem;
  overflow: hidden;
}
.user_img>p {
   width:0.6rem;
  height:0.6rem;
  float: left;
  margin-right: 0.05rem;
}
.user_img>p img {
  width:100%;
  height:100%;
}
.user_left span {
  width:100%;
  height:0.1rem;
  background-color: blue;
}
.user_mark span {
  display: inline-block;
  width:0.5rem;
  height:0.2rem;
  line-height: 0.2rem;
  text-align: center;
  border:1px solid #e4e4e4;
  border-radius: 10%;
  font-size: 0.1rem;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
  margin-right:0.05rem;
}
.time{
  position:absolute;
  top:0.1rem;
  right:0.03rem;
  font-size: 0.1rem;
  color:#333;
}
</style>