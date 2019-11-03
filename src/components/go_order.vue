<template>
  <div id="wrap">
      <div class="nav">
            <span class="nav_left el-icon-arrow-left" @click="top()"></span>
            <span class="nav_center">确认订单</span>
            <span class="nav_right el-icon-user-solid"></span>
       </div>
       <div class="head">
           <span class="head_left el-icon-location-outline"></span>
           <span class="head_center">请添加一个收获地址</span>
           <span class="head_right el-icon-arrow-right" @click="toadress()"></span>
       </div>
       <div class="Stime">
           <div class="Stime_left">
               送达时间
           </div>
           <div class="Stime_right">
               <p class="Stime_right_top">
                   <span>尽快送达</span>
                    <span>预计6：02</span>
               </p>
               <p class="Stime_right_bottom">蜂鸟专送</p>
           </div>
       </div>
       <div class="way">
           <div class="way_top">
               <span class="way_top_left">支付方式</span>
               <p class="way_top_right">
                  <span>在线支付</span>
                  <span class="el-icon-arrow-right" @click="selectWay()"></span>
                  <el-drawer
                     :visible.sync="drawer"
                     :direction="direction">
                     <p class="one">支付方式</p>
                     <p class="two"> 
                         <span>货到支付(商家不支持货到付款)</span>
                         <span class="el-icon-check"></span>
                      </p>
                      <p class="two three"> 
                         <span>在线支付</span>
                         <span class="el-icon-check"></span>
                      </p>
                    </el-drawer>
               </p>
           </div>
           <div class="way_bottom">
               <span class="way_bottom_left">红包</span>
               <span class="way_bottom_right">暂时只在饿了么App中支持</span>
           </div>
       </div>
       <ul class="con">
           <li class="con_title">
               <div class="con_title_left">
                    <img :src="imgurlA+shopmsg.image_path" alt="">
                   <span>{{shopmsg.name}}</span>
               </div>
           </li>
           <li class="con_center">
               <div :key="i" v-for="(v,i) in usedata">
                   <span class="o_name">{{v.name}}</span>
                   <span class="o_num">{{"x"+v.is_featured}}</span>
                   <span class="o_price">{{"￥"+v.specfoods[0].price}}</span>
               </div>   
           </li>
           <li class="con_bottom">
               <span class="con_bottom_left">{{"订单￥"+getall()}}</span>
               <div class="con_bottom_right">
                   <p>待支付</p>
                   <p>{{getall()}}</p>
               </div>
           </li>
       </ul>
       <div class="way a">
           <div class="way_top">
               <span class="way_top_left" >订单备注</span>
               <p class="way_top_right">
                  <span class="way_top_right_one">
                      <span :key="a" v-for="(b,a) in arrA">{{b}}</span>
                  </span>
                  <span class="el-icon-arrow-right way_top_right_two" @click="toremark()"></span>
               </p>
           </div>
           <div class="way_bottom">
               <span class="way_bottom_left">发票抬头</span>
               <span class="way_bottom_right ">
                   <span>不需要发票</span>
                   <i class="el-icon-arrow-right" @click="tofapiao()"></i>
               </span>
           </div>
       </div>
        <div class="bottom">
            <span>待支付￥88</span>
            <span>确认下单</span>
        </div>
  </div>
</template>

<script>
export default {
name:"go_order",
data(){
return {
    drawer: false,
    direction: 'btt',
    msg:"",
    usedata:[],
    shopmsg:"",
    imgurlA:"https://elm.cangdu.org/img/", 
    arrA:[]
  }
},
created() {

    this.shop_id=getCookie("shop_id");
    if(JSON.parse(localStorage.getItem("this.msg"))!=undefined){
        this.msg=JSON.parse(localStorage.getItem("this.msg"));
        console.log(this.msg);
    }else{
        this.msg=this.$route.query.msg;
    }
    
   this.arrA=this.$route.query.arrA;
    console.log(this.arrA);
    console.log(this.msg);
    this.getdata();
    this.getshop();
},
methods: {
    getshop(){
        const api="https://elm.cangdu.org/shopping/restaurant/"+this.shop_id;
        this.$http({
            url:api,
            method:"get"
        }).then(res=>{
            this.shopmsg=res.data;
        })
    },
    top(){
        this.$router.push({
            name:"good_class"
        })
    },
    selectWay(){
        this.drawer = true;
    },
    getdata(){
        var one;
        for(var i=0;i<this.msg.length;i++){
            if(this.msg[i].restaurant_id==this.shop_id){
                 one=this.msg[i];
               for(var j=0;j<one.foods.length;j++){
                   if(one.foods[j].is_featured>0){
                       this.usedata.push(one.foods[j]);
                   }
               }
            }
        }
        console.log(this.usedata);
    },
    getall(){
        var one;
        var two=0;
        for(var i=0;i<this.msg.length;i++){
            if(this.msg[i].restaurant_id==this.shop_id){
                one=this.msg[i];
               for(var j=0;j<one.foods.length;j++){
                   if(one.foods[j].is_featured>0){
                      two+=one.foods[j].is_featured*one.foods[j].specfoods[0].price
                   }
               }
            }
        }
        return two;
    },
    // 添加地址
    toadress(){
        this.$router.push({
            name:"select_adress"
        })
    },
    // 订单备注
    toremark(){
        this.$router.push({
            name:"order_remark",
        })
    },
    // 发票抬头
    tofapiao(){
        this.$router.push({
            name:"order_invoice"
        })
    }
}
}
</script>
<style scoped>
.way_top_right_one {
    font-size: 0.13rem;
}
.two {
    width:100%;
    height:0.5rem;
    line-height: 0.5rem;
    padding-left: 0.2rem;
    padding-right:0.2rem;
    box-sizing: border-box;
}
.two span:nth-child(1){
    float:left;
    color:#999;
}
.two span:nth-child(2){
    margin-top:0.16rem;
    float:right;
    width:0.2rem;
    height:0.2rem;
    line-height: 0.2rem;
    text-align: center;
    background-color: #e4e4e4;
    color:#fff;
    border-radius: 50%;
    font-size: 0.2rem;
    font-weight: 700;
}
.three span:nth-child(1){
  color:#333;
}
.three span:nth-child(2){
  background-color: #4cd964;
}
.one {
    width:100%;
    height:0.5rem;
    line-height: 0.5rem;
    text-align: center;
    background-color: #f7f5f5;
    position: absolute;
    top:0rem;
    z-index: 0;
}
.a {
    margin-bottom: 1rem;
}
.bottom{
    width:3.75rem;
    height:0.5rem;
    padding-left: 0.2rem;
    line-height: 0.5rem;
    box-sizing: border-box;
    background-color: #3c3c3c;
    position: fixed;
    bottom:0;
    left:0;
   
}
.bottom span:nth-child(1){
    float:left;
    color:#fff;
    font-size: 0.2rem;
}
.bottom span:nth-child(2){
    width:1rem;
    height: 100%;
    background-color: #56D176;
    text-align: center;
    color:#fff;
    float:right;
    color:#fff;
    font-size: 0.2rem;
}
.con_bottom {
    width:100%;
    height:1rem;
    padding-left:0.2rem;
    padding-right:0.2rem;
    padding-top:0.15rem;
    box-sizing: border-box;
    border-top:1px solid #e4e4ee;
    background-color: #ffffff;
}
.con_bottom_left{
    float:left;
    color:#666;
}
.con_bottom_right{
    float:right;
    color:orange;
}
.con_bottom_right p:nth-child(2){
    margin-top:0.4rem;
   
}
.con_center{
    /* padding-top:0.1rem; */
    padding-left:0.2rem;
    padding-right:0.2rem;
}
.con_center>div{
    width:100%;
    height:0.5rem;
    line-height: 0.5rem;
    box-sizing:border-box;
    position:relative;
    color:#666;
}
.o_name{
 position: absolute;
 top:0rem;
 left:0rem;
}
.o_num {
    position:absolute;
    top:0rem;
    left:2.3rem;
    color:orange;
}
.o_price{
    position:absolute;
    top:0rem;
    right:0rem;
}
.con {
    margin-top:0.1rem;
    width:100%;
    box-sizing: border-box;
    background-color: #ffffff;
}
.con_title{
    padding-left:0.2rem;
    width:100%;
    height: 0.5rem;
    line-height: 0.5rem;
    border-bottom: 1px solid #e4e4e4;
    box-sizing: border-box;
    position: relative;
}
.con_title img {
    margin-top:0.05rem;
   width:0.4rem;
   height:0.4rem;
}
.con_title span{
    position:absolute;
    top:0rem;
    left:0.7rem;
}
.way {
margin-top:0.1rem;
width:3.75rem;
padding-left:0.2rem;
padding-right: 0.2rem;
height:1rem;
box-sizing: border-box;
background-color: #ffffff;
}
.way_top{
    width:100%;
   height:0.55rem;
   line-height: 0.55rem;
    border-bottom:1px solid #e4e4e4;
    overflow: hidden;
    box-sizing: border-box;
}
.way_top_left{
    float:left;
    color:#666;
} 
.way_top_right{
    float:right;
    color:#999;
}
.way_bottom {
     width:100%;
   height:0.5rem;
   line-height: 0.4rem;
    overflow: hidden;
    box-sizing: border-box;
}
.way_bottom_left{
    float:left;
    color:#666;
}
.way_bottom_right{
    float:right;
    color:#999;
}
.Stime{
    width:3.75rem;
    height:1rem;
   border-left:5px solid #3190e8;
    background-color: #ffffff;
    margin-top:0.1rem;
    position: relative;
    box-sizing: border-box;
}
.Stime_left{
    position: absolute;
    top:0.38rem;
    left:0.3rem;
    font-size: 0.2rem;
    color:#333;
    font-weight: 700;
}
.Stime_right {
    position:absolute;
    top:0.2rem;
    right:0.07rem;
    text-align: right;
}
.Stime_right_top span{
    color:#3190e8;
    font-size: 0.16rem;
}
.Stime_right_bottom {
    margin-top:0.1rem;
    font-size: 0.1rem;
    background-color: #3190e8;
    width:0.5rem;
    height:0.2rem;
    text-align: center;
    color:#ffffff;
    line-height: 0.2rem;
    border-radius: 5%;
    position: absolute;
    right: 0;
}
.head {
    width:100%;
    height:0.8rem;
    line-height:0.8rem;
    background-color: #ffffff;
    padding-left:0.1rem;
    padding-right:0.1rem;
    padding-top:0.4rem;
    box-sizing: border-box;
    position: relative;
    border-bottom: 1px solid #3190e8;
}
.head_left{
    position: absolute;
    top:0.3rem;
    left:0.1rem;
    font-size: 0.25rem;
    color:#3190e8;
}
.head_center{
    position: absolute;
    top:0rem;
    left:0.4rem;
    color:#666;
    font-size: 0.18rem;
}
.head_right{
  position: absolute;
  top:0.3rem;
  right:0.1rem;
  font-size: 0.2rem;
}
.wrap{
    width:3.75rem;
    box-sizing: border-box;
}
.nav{
  width:100%;
  height:0.5rem;
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
  margin-top:0.12rem;
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
.nav_right {
float:right;
font-size: 0.3rem;
margin-right:0.08rem;
margin-top:0.1rem;
}

</style>