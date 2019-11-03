<template>
  <div>
      <div class="head">
          <div class="nav">
            <span class="nav_left el-icon-arrow-left" @click="changeCity()"></span>
            <span class="nav_center">{{msg.name}}</span>
            <span class="nav_right" @click="changeCity()">切换城市</span>
          </div>
          <div class="search">
            <input class="inp" type="text" placeholder="输入学校、商务楼、地址" v-model="address"><br>
            <button class="btn" @click="jump()">提交</button>
          </div>
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
    name:"search",
    data(){
        return{
            id:"",
            address:"",
            msg:"",
            allmsg:""
        }
    },
    created() {
        if(this.$route.query.id != undefined){
            var t = 60*60*32;
            addCookie("id",this.$route.query.id,t);
        }
        this.id=getCookie("id");
        console.log("书信"+this.id)
        this.search();
        this.$router.push({
            name:"hisser"
        })
    },
    methods: {
        search(){
            const api="https://elm.cangdu.org/v1/cities/"+this.id
            this.$http({
                url:api,
                method:"get"
            }).then(res=>{
                this.msg=res.data;
                 console.log("刷新"+this.msg);
            })
        },
        jump(){
            if(this.address==""){
                console.log("不能为空！")
                return;
            }
            this.$router.push({
                name:"adress",
                query:{
                    id:this.msg.id,
                    keyword:this.address
                }
            })
        },
        changeCity(){
            this.$router.push({
                name:"elm"
            })
        }
    },
}
</script>

<style scoped>
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
  padding-left:0.05rem;
  position: relative;
  box-sizing: border-box;
  text-align: center;
  margin-bottom:0.1rem;
  box-sizing: border-box;
}
.nav_left{
  float:left;
  margin-top:0.09rem;
  font-size: 0.25rem;
}
.nav_center{
    font-weight: 700;
    font-size: 0.2rem;
   position: absolute;
   left:1.67rem;
   transform: translateX(-50%)
}
.nav_right {
  float:right;
  font-size: 0.15rem;
  margin-right:0.08rem;
}
.search {
    width:100%;
    height:0.89rem;
    padding-top:0.09rem;
    background-color:#ffffff;
    border-top:1px solid #e4e4e4;
    border-bottom:1px solid #e4e4e4;
    text-align: center;
}
.inp{
    margin-top:0.05rem;
    width:3.21rem;
    height:0.3rem;
    color:#333;
    font-size: 0.15rem;
    border:1px solid #e4e4e4;
}
.btn{
    width:3.21rem;
    height:0.35rem;
    text-align: center;
    color:#ffffff;
    outline: none;
    border:none;
    background-color: #3190e8;
    margin-top:0.1rem;
    font-size: 0.17rem;
}


</style>