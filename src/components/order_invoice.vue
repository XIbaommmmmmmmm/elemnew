<template>
  <div id="wrap">
       <div class="nav">
            <span class="nav_left el-icon-arrow-left" @click="top()"></span>
            <span class="nav_center">选择发票抬头</span>
       </div>
       <div class="con">
         <span>不需要开发票</span>
         <span class="el-icon-check one" v-show="show" @click="colorA()"></span>
         <span class="el-icon-check two" v-show="showa" @click="colorB()"></span>
       </div>
       <button @click="re()">确定</button>
  </div>
</template>

<script>
export default {
name:"order_invoice",
data() {
  return {
    show:true,
    showa:false
  }
},
methods: {
  top(){
      this.$router.go(-1);
  },
  colorA(){
    this.show=false;
    this.showa=true;
  },
  colorB(){
    this.show=true;
    this.showa=false;
  },
  re(){
    this.$router.back(-1);
  }
},
}
</script>

<style scoped>

button{
  width:3.5rem;
  height: 0.4rem;
  line-height: 0.4rem;
  color: #ffffff;
  text-align: center;
  margin-top:0.1rem;
  background-color: #56D176;
  outline: none;
  border:none;
  border-radius: 5%;
  box-sizing: border-box;
}
.con{
width:100%;
height:0.5rem;
line-height: 0.5rem;
padding-left:0.2rem;
margin-top:0.1rem;
background-color: #ffffff;
box-sizing: border-box;
}
.con span:nth-child(1){
  float:left;
}
.one{
float:right;
width:0.2rem;
height: 0.2rem;
line-height: 0.2rem;
background-color: #e4e4e4;
color:#ffffff;
border-radius: 50%;
font-weight: 700;
margin-top:0.15rem;
margin-right:0.2rem;
}
.two{
float:right;
width:0.2rem;
height: 0.2rem;
line-height: 0.2rem;
background-color: #56D176;
color:#ffffff;
border-radius: 50%;
font-weight: 700;
margin-top:0.15rem;
margin-right:0.2rem;
}
#wrap{
  width:3.75rem;
  text-align: center;
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
font-size: 0.2rem;
margin-right:0.08rem;
}
</style>