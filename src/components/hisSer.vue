<template>
  <div>
      <div class="con">
      <p class="title">搜索历史</p>
          <div class="history">
              <ul>
                  <li class="his_con"  @click="getFood(v.latitude,v.longitude)" :key="i" v-for="(v,i) in allo">
                      <p class="his_con_school">{{v.name}}</p>
                      <p class="his_con_address">{{v.address}}</p>
                  </li>
              </ul>
              <p class="his_con all" @click="del()" v-show="show">清空所有</p>
          </div>
  </div>
  </div>
</template>
<script>
export default {
name:"hisser",
data(){
return{
    show:false,
    citys:"",
    all:[],
    allo:[]
}
},
created() {
    this.getCitys();
},
methods: {
    getCitys(){
        if(isCookieKey("adr")){
            console.log("你好");
             var adr=getCookie("adr");
             this.all = adr.split("&");
             console.log(this.all);
             for(var i=0;i<this.all.length;i++){
             const api="https://elm.cangdu.org/v2/pois/"+this.all[i];
             this.$http({
                url:api,
                method:"get"
             }).then(res=>{
                this.allo.push(res.data);
                this.show=true;
             });
             }
            
        }
       
        console.log(this.allo);
    },
    del(){
        delCookie("adr");
        this.allo=[];
        this.show=false;
    },
   getFood(a,b){
       this.$router.push({
           name:"home",
           query:{
               la:a,
               lo:b
           }
       })
   }

  },
}
</script>

<style>
.con{
    width:3.75rem;
    box-sizing: border-box;
}
.title{
    width:3.75rem;;
    height:0.18rem;
    line-height: 0.18rem;
    padding-left:0.05rem;
    box-sizing: border-box;
    border-bottom: 1px solid #e4e4e4;
    font-size: 0.1rem;
}
.history ul{
    list-style-type: none;
    background-color: #ffffff;
}
.his_con {
    width:3.75rem;
    height:0.65rem;
    border:1px solid #e4e4e4;
    box-sizing: border-box;
}
.his_con_school{
     width:3.75rem;
     padding-top:0.15rem;
     padding-bottom:0.1rem;
     padding-left:0.2rem;
    font-size: 0.15rem;
     color:#666;
     white-space:nowrap;
     text-overflow:ellipsis;
     overflow:hidden;
     box-sizing: border-box;
}
.his_con_address{
    width:3.75rem;
    padding-left:0.2rem;
    font-size: 0.1rem;
    color:#666;
    box-sizing: border-box;
    white-space:nowrap;
   text-overflow:ellipsis;
    overflow:hidden;
}
.all{
    width:3.75rem;
     height:0.65rem;
     line-height: 0.65rem;
     background-color: #ffffff;
     text-align: center;
     font-size: 0.15rem;
     color:#666;
}
</style>