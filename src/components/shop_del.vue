<template>
  <div class="one">
      <div class="head">
          <div class="head_left">
              <img :src="shop_img+shop_msg.image_path" alt="">
          </div>
          <div class="head_right">
              <p>{{shop_msg.name}}</p>
              <p>
                  <span>商家配送/</span>
                  <span>分钟速达</span>
                  <span>配送费5</span>
               </p>
               <p>公告：欢迎光临，用餐高峰请提前下单，谢谢</p>
          </div>
      </div>
      <div class="nav">
          <span id="goods" @click="shop_del_goods()">商品</span>
          <span id="eva" @click="shop_del_evaluate()">评价</span>
      </div>
      <p id="go" @click="top()">
          <span class="el-icon-arrow-left"></span>
      </p>
       <p id="next" @click="next()">
          <span class="el-icon-arrow-right"></span>
      </p>
      <keep-alive  include="good_class">
       <router-view></router-view>
      </keep-alive>
   
     
  </div>
</template>

<script>

var evaObj=document.getElementById("eva");
export default {
name:"shop_del",
data(){
return{
    buyshop2:false,
    buyshop:true,
    shop_id:"",
    shop_msg:"",
    shop_img:"https://elm.cangdu.org/img/"
}
},
created() {
    this.shop_id=getCookie("shop_id");
    this.getOne()
     this.$nextTick(()=>{
             var evaObj=document.getElementById("eva");
            var goodsObj = document.getElementById("goods");
             goodsObj.style.color="blue";
             goodsObj.style.borderBottom="2px solid blue";
            
             evaObj.style.color="#333";
             evaObj.style.borderBottom="none";
         })
},
methods: {
    getOne(){
        // const api=https://elm.cangdu.org/shopping/restaurant/1"+this.shop_id;
        const api="https://elm.cangdu.org/shopping/restaurant/"+this.shop_id;
        this.$http({
            url:api,
            method:"get"
        }).then(res=>{
            this.shop_msg=res.data;
        })
    },
    // 跳转到商品页面
    shop_del_goods(){
        this.$router.push({
            name:"good_class",
            shop_id:this.shop_id
        });
         this.$nextTick(()=>{
             var evaObj=document.getElementById("eva");
              var goodsObj = document.getElementById("goods");
             goodsObj.style.color="blue";
             goodsObj.style.borderBottom="2px solid blue";
             evaObj.style.color="#333";
             evaObj.style.borderBottom="none";
         });
    },
    top(){
        this.$router.push({
            name:"food"
        });
    },
    // 跳转到评价页面
    shop_del_evaluate(){
        
        this.$router.push({
            name:"shop_del_evaluate",
            query:{
                shop_id:this.shop_id
            }
        });
         this.$nextTick(()=>{
             var evaObj=document.getElementById("eva");
             evaObj.style.color="blue";
             evaObj.style.borderBottom="2px solid blue";
             var goodsObj = document.getElementById("goods");
             goodsObj.style.color="#333";
             goodsObj.style.borderBottom="none";
            })

    }
},
}
</script>

<style scoped>

.one {
    position:relative;
}
.head{
    width:3.75rem;
    height:0.85rem;
    padding:0.09rem 0 0.09rem 0.09rem;
    background-color: rgb(119,103,137);
    overflow: hidden;
    box-sizing: border-box;
    position: fixed;
    top:0;
    z-index: 1;
}
.head_left{
    width:0.67rem;
    height:0.67rem;
    float: left;
}
.head_left img {
    width:100%;
    height:100%;
}
.head_right{
    float:left;
    margin-left:0.05rem;
}
.head_right p:nth-child(1){
    font-size: 0.15rem;
    color:#fff;
}
.head_right p:nth-child(2){
    font-size: 0.1rem;
    color:#fff;
    margin-top:0.1rem;
}
.head_right p:nth-child(3){
    font-size: 0.1rem;
    color:#fff;
    margin-top:0.1rem;
}
.nav{
    width:3.75rem;
    height:0.47rem;
    line-height: 0.47rem;
    background-color: #fff;
    color:#333;
    display: flex;
    justify-content: space-around;
    position: fixed;
    top:0.85rem;
    z-index:1
}
.nav span{
 width:1.7rem;
 text-align: center;
 font-size: 0.15rem;
}
#go .el-icon-arrow-left{
    font-size: 0.4rem;
    color:#fff;
    position:fixed;
    top:0.1rem;
    left:0rem;
    z-index: 3;
}
#next {
font-size: 0.3rem;
    color:#fff;
    position:fixed;
    top:0.3rem;
    right:0rem;
    z-index: 3;
}

</style>