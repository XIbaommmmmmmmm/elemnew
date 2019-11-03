<template>
  <div id="app">
       <div class="nav">
            <span class="nav_left el-icon-search"></span>
            <span class="nav_center">{{cityName.name}}</span>
            <span class="nav_right" >登录|注册</span>
       </div>
      <router-view></router-view>
      <div class="last">
         <div @click="foodJup()">
            <p class="el-icon-s-shop"></p>
            <p>外卖</p>
         </div>
        <div @click="seacJup()">
          <p class="el-icon-discover"></p>
          <p>搜索</p>
        </div>
        <div @click="orderJup()">
           <p class="el-icon-tickets"></p>
           <p>订单</p>
        </div>
       <div @click="meJop()">
          <p class="el-icon-user-solid"></p>
          <p>我的</p>
       </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"food",
    data(){
      return{
        la:"",
        lo:"",
        cityName:"",
        classA:"",
        shops:""
      }
    },
    created() {
      // 经纬度
       if(this.$route.query.la != undefined &&this.$route.query.lo != undefined){
            var t = 60*60*32;
            addCookie("la",this.$route.query.la,t);
            addCookie("lo",this.$route.query.lo,t);
        }
        this.id=getCookie("id");
      this.la=getCookie("la");
      this.lo=getCookie("lo");
      this.getOne(this.la,this.lo);
    },
    methods: {
        getOne(a,b){
              var c = a+","+b;
               const api="https://elm.cangdu.org/v2/pois/"+c;
              this.$http({
                  url:api,
                  method:"get"
               }).then(res=>{
                   this.cityName=res.data;
               })
        },
        List(){
          this.$router.push({
            name:"shop_list"
          })
        },
      meJop(){
         this.$router.push({
          name:"me"
      })
      },
      foodJup(){
        this.$router.push({
        name:"home"
      })
      },
      orderJup(){
        this.$router.push({
        name:"order"
      })
      },
      seacJup(){
        this.$router.push({
        name:"seac"
      })
    }
  }
}
</script>

<style scoped>
  #app{
    position: relative;
    overflow: hidden;
  }
.head{
  width:3.75rem;
  height:1.5rem;
  box-sizing: border-box;
  border-bottom:1px solid #e4e4e4;
  margin-bottom:0.1rem;
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
.nav_right {
  float:right;
  font-size: 0.2rem;
  margin-right:0.08rem;
}

.last{
   clear: both;
  width:3.75rem;
  margin-top:0.1rem;
  height:0.5rem;
  padding-top:0.08rem;
  font-size: 0.2rem;
  color:#999;
  position:fixed;
  bottom:0;
  background-color: #fff;
  box-sizing: border-box;
}
.last div {
  width:0.93rem;
  height:0.5rem;
  text-align: center;
  float: left;
}
.last div p:nth-child(2) {
  margin-top:0.07rem;
  font-size: 0.12rem;
}
</style>