<template>
  <div class="goods">
     <div class="goods_left">
         <ul>
            <li :key="i" v-for="(v,i) in msg" @click="good_class(v.id,i)" class="Aone">
            <a :href="'#'+v.id"> {{v.name}}</a>
            <!-- <p class="num" >{{allmsg}}</p>  -->
            </li>
         </ul>
     </div>
      <router-view></router-view>
  </div>
</template>
<script>
import child from './good_class'
export default {
name:"shop_del_goods",
data(){
    return{
        shop_id:"",
        msg:"",
        allmsg:""
    }
},
created() {
    this.shop_id=getCookie("shop_id");
    this.getOne();
},
// 监听
methods: {
    // 请求的数据
    getOne(){
             const api="https://elm.cangdu.org/shopping/v2/menu?restaurant_id="+this.shop_id;
                this.$http({
                    url:api,
                    method:"get"
                 }).then(res=>{
                     this.msg=res.data;
                     console.log("数据请求成功！"+res.data);
                })
    },
    // 判断每个类别的购买数量
    getNum(a){
        var count=0;
        for(var i=0;i<a.length;i++){
            count+=a[i].is_featured;
        }
        return count;
    },
    // 分类商品
    good_class(a,b){
        this.$router.push({
            name:"good_class",
            query:{
                goods_id:a
            }
        });
        // 点击样式
        this.$nextTick(()=>{
             var li = document.getElementsByClassName("Aone");
             for(var i=0;i<li.length;i++){
                 if(i==b){
                     li[i].style.backgroundColor="#ffffff";
                     li[i].style.color="#666";
                     li[i].style.borderLeft="2px solid blue";
                 }else{
                      li[i].style.backgroundColor="#f5f5f5";
                    li[i].style.color="#333";
                      li[i].style.borderLeft="none";
                 }
             }
         });
    }
},
}
</script>

<style scoped>
.num {
    width:0.15rem;
    height:0.15rem;
    background-color: red;
    color:#ffffff;
    font-size: 0.1rem;
    text-align: center;
    line-height: 0.15rem;
    position: absolute;
    top:0.03rem;
    right:0.03rem;
    border-radius: 50%;
}
.goods{
    width:3.75rem;
    position: relative;
}
.goods_left {
   height:5.5rem;
    position:fixed;
    left:0;
    top:1.3rem;
    overflow:auto;
    overflow-y:scroll;
}
.goods_left::-webkit-scrollbar {
        display: none;
    }

.goods_left li {
    width:0.69rem;
    height:0.31rem;
    line-height: 0.31rem;
    padding:0.16rem 0.07rem;
    color:#333;
    font-weight: 400;
    border-bottom: 1px solid #e4e4e4;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
    position: relative;
}
.goods_left li a{
    color:#333;
}
</style>