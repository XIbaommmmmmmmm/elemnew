<template>
  <div id="wrap">
    <div class="lunbo">
        <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide class="lunbo_one">
          <ul>
            <li class="lunbo_title" v-show="i<=7" :key="i" v-for="(v,i) in classA" @click="List()" >
             <img :src="imgurl+v.image_url" alt="" >
              <p>{{v.title}}</p>
            </li>
          </ul>
        </swiper-slide>
        <swiper-slide>
           <ul>
            <li class="lunbo_title" v-show="i>7" :key="i"  v-for="(v,i) in classA" >
            <img :src="imgurl+v.image_url" alt="" >
              <p>{{v.title}}</p>
            </li>
          </ul>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      </div>
      <div class="shop">
            <p class="shop_title">附近商家</p>
            <ul>
              <li class="shop_all" @click="shop_del(v.id)" :key="i" v-for="(v,i) in shops">
                <div class="img">
                  <img :src="imgurlA+v.image_path" alt="">
                </div>
                <div class="shop_all_right">
                    <div class="top">
                      <div class="top_left">
                        <span class="bind">品牌</span>
                        <span class="name">{{v.name}}</span>
                      </div>
                      <div class="top_right" >
                        <span :key="a" v-for="(b,a) in v.supports">{{b.icon_name}}</span>
                      </div>
                    </div>
                    <div class="center">
                      <div class="shop_all_right_left b">
                         <span class="scoreImg">
                           <el-rate v-model="v.rating" disabled class="one"></el-rate>
                         </span>
                          <span class="score">{{v.rating}}</span>
                          <span class="amount">{{"月售"+v.recent_order_num+"单"}}</span>
                      </div>
                      <div class="shop_all_right_right a">
                          <span class="song">{{v.delivery_mode.text}}</span>
                          <span class="da">准时达</span>
                      </div>
                    </div>
                    <div class="bottom">
                        <div class="bottom_left">
                            <span>nihao</span>
                            <span>/</span>
                            <span>{{v.piecewise_agent_fee.tips}}</span>
                        </div>
                        <div class="bottom_right"> 
                            <span>{{v.distance}}</span>
                            <span>/</span>
                            <span class="blue">{{v.order_lead_time}}</span>
                        </div>

                    </div>
                </div>
              </li>
             
            </ul>
      </div>
  </div>
</template>

<script>
export default {
name:"home",
data(){
      return{
        la:"",
        lo:"",
        cityName:"",
        classA:"",
        value:"1",
        imgurl:"https://fuss10.elemecdn.com/", 
        imgurlA:"https://elm.cangdu.org/img/", 
        swiperOption: {
          //  loop:true,
          pagination: {
            el: '.swiper-pagination',
           },  
        },
        shops:""
      }
    },
    created() {
      // 经纬度
      this.la=getCookie("la");
      this.lo=getCookie("lo");
      this.getTwo(this.la,this.lo);
      this.getThree(this.la,this.lo);
    },
    methods: {
        getTwo(){
          const api="https://elm.cangdu.org/v2/index_entry";
          this.$http({
            url:api,
            method:"get"
          }).then(res=>{
            this.classA=res.data;
          })
        },
        getThree(a,b){
           var c = a+","+b;
           console.log(c);
          const api="https://elm.cangdu.org/shopping/restaurants?latitude="+a+"&longitude="+b;
           this.$http({
            url:api,
            method:"get"
          }).then(res=>{
             console.log(res.data);
            this.shops=res.data;
            console.log(c);
          })
        },
        List(){
          this.$router.push({
            name:"shop_list"
          })
        },
        shop_del(a){
            var t = 60*60*32;
            addCookie("shop_id",a,t);
            this.$router.push({
              name:"good_class",
             query:{
               shop_id:a
             }
            })
        }
    }
}
</script>

<style scoped>
.lunbo {
  width:3.75rem;
  padding-top:0.11rem;
  padding-bottom:0.11rem;
  box-sizing:border-box;
  background-color: #fff;
  margin-bottom: 0.06rem;
}
.lunbo_title{
  width:0.93rem;
  height:0.73rem;
  padding:0.07rem 0;
  float:left;
 text-align: center;
  
}
.lunbo_title img {
  width:0.42rem;
  height:0.42rem;
}
.lunbo_title p{
  margin-top:0.05rem;
  color:#666;
  font-size: 0.12rem;
}
.shop_title{
  width:3.75rem;
  height:0.38rem;
  line-height: 0.38rem;
  background-color: #fff;
  color:#666;
  font-size: 0.13rem;
  border-top:1px solid #e4e4ee;
}
.shop_all{
  width:3.75rem;
  box-sizing: border-box;
  padding:0.16rem 0.09rem 0.16rem 0.09rem;
  margin-bottom:0.005rem;
  background-color: #fff;
  overflow: hidden;
}
.shop_all .img {
  width:0.63rem;
  height:0.63rem;
  margin-right:0.09rem;
  background-color: red;
  float:left;
}
.img img{
width:0.63rem;
height:0.63rem;

}
.shop_all_right{
  width:2.83rem;
   height:0.63rem;
  float:left;
  background-color: #fff;

}
.top{
  width:100%;
  box-sizing:border-box;
}
.top_left{
  float:left;
}
.bind{
  width:0.24rem;
  height:0.14rem;
  padding:0 0.02rem;
  font-size: 0.01rem;
  background-color: #ffd930;
  color:#333;
  margin-right:0.04rem;
}
.name{
  color:#333;
  font-size: 0.15rem;
}
.top_right{
  float:right;
  font-size: 0.12rem;
  color:#999;
}
.center {
  clear: both;
  /* width:100%; */
  margin-top:0.26rem;
  height:0.14rem;
  font-size: 0.12rem;
  color:#999;
  position:relative;
 
}
.b{
 font-size: 0.09rem;
  position:absolute;
  left:0;
}
.hop_all_right_left span{
  margin-right:0.03rem;
}
.a{
  position:absolute;
  right:0;
  font-size: 0.12rem;
}
.song{
  width:0.48rem;
  height:0.16rem;
  background-color: #3190e8;
  color:#fff;
}
.da{
  border:1px solid #3190e8;
  color:#3190e8;
}
.bottom{
  clear: both;
  width:3.75rem;
  margin-top:0.1rem;
  height:0.3rem;
  font-size: 0.12rem;
  color:#999; 
  position: relative;
}
.bottom_left{
  position:absolute;
  left:0;
}
.bottom_left span{
   margin-right:0.03rem;
}
.bottom_right{
  position: absolute;
  right: 1rem;;
}
.score{
  color:#ff6000;
  margin-top:0.2rem;
  margin-left:-0.4rem;
}
.scoreImg{
  float:left;
}
.one {
  width:1.5rem;
}
.blue{
  color:#3190e8;
}
.amount{
  margin-top:0.2rem;
}
</style>