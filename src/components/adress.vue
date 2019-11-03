<template>
  <div class="con">
          <div class="history">
              <ul>
                  <li class="his_con" @click="jumpCon(v.latitude,v.longitude)" :key="i" v-for="(v,i) in allmsg1" >
                      <p class="his_con_school">{{v.name}}</p>
                      <p class="his_con_address">{{v.address}}</p>
                  </li>
              </ul>
          </div>
  </div>
</template>
<script>
export default {
name:"adress",
data(){
    return {
        allmsg1:"",
        msg1:"",
        address:""
    }
},
created() {
    this.msg1=this.$route.query.id;
    this.address=this.$route.query.keyword;
    console.log(this.$route.query.keyword);
    this.commit()
},
watch:{
	    "$route":function(newV,oldV){
			console.log("路由改变！")//监听到改变后的路由对象
            this.msg1=newV.query.id;
            this.address=newV.query.keyword;
            this.commit();
		}		
	},
methods: {
      commit(){
            const api="https://elm.cangdu.org/v1/pois?city_id="+this.msg1+"&keyword="+this.address;
            this.$http({
                url:api,
                method:"get"
            }).then(res=>{
                this.allmsg1=res.data;
                console.log(this.allmsg1);
            })
        },
        // 跳转到内容界面
        jumpCon(a,b){
            this.$router.push({
                name:"home",
                query:{
                    la:a,
                    lo:b
                }
            });
            var c= a+","+b;
            var t = 60*60*32;
            // 判断是否之前已经存在
            if(isCookieKey("adr")){
                 var str1 = getCookie("adr");
                var arrLa = str1.split("&");
                for(var i=0;i<arrLa.length;i++){
                      if(c==arrLa[i]){
                    return;
                 }
                }
            }
            if(isCookieKey("adr")){
                addCookie("adr",getCookie("adr")+"&"+c,t);
            }else{
                addCookie("adr",c,t);
            }
       
       }
},
}
</script>

<style scoped>
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
</style>