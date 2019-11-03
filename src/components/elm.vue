<template>
  <div class="home">
      <div class="head">
          <div class="nav">
            <span class="nav_left">ele.me</span>
            <span class="nav_right" @click="login()">登录|注册</span>
          </div>
          <div class="position">
                <span class="posi_left">当前定位城市</span>
                <span class="posi_right">定位不准时，请在城市列表中选择</span>
          </div>
          <div class="now_position">
            <span class="now_position_left">郑州</span>
             <span class="el-icon-arrow-right now_position_right"></span>
          </div>
      </div>
      <div class="hot_citys one">
          <p class="hot_citys_title">热门城市</p>
          <ul class="hot_citys_con" >
            <li class="hot_citys_con1"  :key="i" v-for="(v,i) in hotCitys" @click="sreCity(v.id)">{{v.name}}</li>
          </ul>
      </div>
      <!-- 所有城市展示 -->
      <div class="hot_citys one" :key="i" v-for="(v,i) in newOld">
          <p class="hot_citys_title">{{i}}</p>
          <ul class="hot_citys_con" >
            <li class="hot_citys_con1 two" :key="d" v-for="(a,d) in v" @click="sreCity(a.id)">{{a.name}}</li>
          </ul>
      </div>

  </div>
</template>

<script>
var allKy=[];
var citys=[];
export default {
  name:"elm",
  data:function(){
    return{
      show:false,
      hotCitys:"",
      oldObj:"",
      newOld:""
    }
  },
  created() {
    // 获取热门城市
    this.getCitys();
    this.allCity();
  },
  methods: {
    login(){
      this.$router.push({
        name:"home"
      });
    },
    // 热门城市
    getCitys(){
      const api="https://elm.cangdu.org/v1/cities?type=hot";
      this.$http({
        url:api,
        method:"get",
      }).then((res)=>{
        this.hotCitys=res.data;
      })
    },
    allCity(){
    const api="https://elm.cangdu.org/v1/cities?type=group";
    this.$http({
      url:api,
      method:"get"
    }).then((res)=>{
     this.oldObj=res.data;
     this.sort_citys();
    });
  },
  sort_citys(){
    // 存储key值
    var cityKy=[];
      for (const key in this.oldObj) {
          cityKy.push(key);
      }
      cityKy.sort();
      // 存储排序好的数据
      var newCitys={};
      for(var i=0;i<cityKy.length;i++){
          newCitys[cityKy[i]]=this.oldObj[cityKy[i]];
      }
      this.newOld=newCitys;
  },
  sreCity(id){
      this.$router.push({
        name:"search",
        query:{
          id:id,
          
        }
      });
  }


  
  },
  // 所有城市
 
}
</script>

<style scoped>
.home {
  width:3.75rem;
  box-sizing: border-box;
  background-color: #f5f5f5;
 
}
.head{
  width:3.75rem;
  height:1.275rem;
  box-sizing: border-box;
  border-bottom:1px solid #e4e4e4;
  margin-bottom:0.1rem;
}
.nav{
  width:100%;
  height:0.45rem;
  line-height: 0.45rem;
  background-color: #3190e8;
  color:#ffffff;
  font-size: 0.16rem;
  padding-left:0.05rem;
  box-sizing: border-box;
}
.nav_left{
  float:left;
}
.nav_right {
  float:right;
  margin-right:0.08rem;
}
.position{
  color:#666;
  width: 100%;
  height:0.38rem;
  line-height: 0.38rem;
  background-color:#ffffff;
  overflow: hidden;
  padding:0.05rem;
  box-sizing: border-box;
}
.posi_left{
float: left;
font-size: 0.15rem;
}
.posi_right{
float: right;
font-size: 0.07rem;
color:#9f9f9f;
}
.now_position{
  width:100%;
  height:0.43rem;
  line-height: 0.43rem;
  border-top:1px solid rgb(228, 228, 228);
  color:#3190e8;
  background-color: #ffffff;
  font-size: 0.2rem;
  padding-left:0.05rem;
  padding-right:0.05rem;
  box-sizing: border-box;
}
.now_position_left{
  float:left;
  font-size: 0.16rem;
}
.now_position_right{
  margin-top:0.12rem;
  float:right;
  font-size: 0.2rem;
  color:#999;
}
.hot_citys{
  width:100%; 
  background-color: #ffffff;
  overflow: hidden;
  margin-bottom:0.1rem;
}
.hot_citys_title {
  width:100%;
  height:0.33rem;
  padding-left:0.05rem;
  border-top:2px solid #e4e4e4; 
   border-bottom: 1px solid #e4e4e4;
  line-height: 0.33rem;
  font-size: 0.15rem;
  color:#666;
  box-sizing: border-box;
}
.hot_citys_con{
  list-style-type: none;
 
}
.hot_citys_con1{
background-color: #ffffff;
border-right:1px solid #e4e4e4;
border-bottom:1px solid #e4e4e4;
width:0.927rem;
height:0.4rem;
line-height: 0.4rem;
text-align: center;
float:left;
 color:#3190e8;
 font-size: 0.15rem;
 white-space:nowrap;
 text-overflow:ellipsis;
  overflow:hidden;

}
.hot_citys_con .two {
  color:#999;
}

</style>