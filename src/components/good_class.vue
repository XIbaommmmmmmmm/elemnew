<template>
<div class="goods">
    <div class="goods_left">
         <ul>
            <li :key="i" v-for="(v,i) in msg" class="Aone" @click="style(i)">
            <a :href="'#'+v.id"> {{v.name}}</a>
             <p class="num" v-show="gettop(v.id)>0">{{gettop(v.id)}}</p> 
            </li>
         </ul>
     </div>
   <div class="good_class">
      <div class="goods">
          <ul :key="i" v-for="(v,i) in msg">
              <li class="goods_title" :id="v.id">
                 <div class="goods_title_left">
                     <span>{{v.name}}</span>
                     <span>{{v.description}}</span>
                 </div>
                 <div class="goods_title_right">
                     <el-popover
                    placement="bottom"
                    title="标题"
                    width="200"
                    popper-class="a"
                    trigger="click"
                    :content="(v.description)">
                 <span slot="reference">...</span>
                    </el-popover>
                 </div>
              </li>
              <li class="good_con" :key="a" v-for="(b,a) in v.foods" @click="goods_del(b)">
                  <div class="good_left">
                      <img :src="shop_img+b.image_path" alt="">
                  </div>
                  <div class="good_right">
                      <p class="good_right_name">{{b.name}}</p>
                      <p class="good_right__del">{{b.description}}</p>
                      <p class="good_right__count">
                          <span>{{b.tips}}</span>
                          <span>{{"好评率"+b.satisfy_rate+"%"}}</span>
                      </p>
                      <span class="good_right__beizhu" v-if="b.activity!=null">{{b.activity.image_text}}</span>
                      <div class="good_right__bottom">
                          <p class="good_right__bottom_left">
                              <span>{{"￥"+b.specfoods[0].price}}</span>
                              <span v-if="b.specfoods.length==2" class="left_one">送</span>
                          </p>
                          <p class="good_right__bottom_right">
                            <span  class="good_right__bottom_right_one " v-if="b.specfoods[0].specs.length!=0" @click.stop="geta(b.specfoods,b)">
                            选规格
                            </span>
                            <!-- 数量加减 -->
                            <span v-if="b.specfoods[0].specs.length==0">
                                <button class="del" v-show="b.is_featured >0" @click.stop="del(b)">-</button>
                                <span v-show="b.is_featured >0">{{b.is_featured}}</span>
                                <button class="add" @click.stop="add(b)">+</button>
                            </span>
                          </p>
                      </div>     
                 </div>
                 <div class="select_mask" v-show="select_show">
                      <div class="select_mask_title">
                          <span>{{select_name.name}}</span>
                          <span class="el-icon-close" @click.stop="close_mask()"></span>
                      </div>
                      <div class="select_mask_con">
                          <p>规格</p>
                          <p class="select_mask_con_a">
                              <input  :value="h.specs_name" :key="g" v-for="(h,g) in select_data" @click.stop="goods_spec()"></input>
                          </p>
                      </div>
                      <div class="select_mask_bottom">
                          <span :key="g" v-for="(h,g) in select_data" v-show="g==0">{{"￥"+h.price}}</span>
                          <button>加入购物车</button>
                      </div>
                 </div>
              </li>
          </ul>
      </div>
      <!-- 底部购物车 -->
      <div class="shop_bottom" @click="goCart()">
          <span :class="{icon:buyshop,iconA:buyshop2}">
              <span class="el-icon-shopping-cart-2"></span>
          </span>
          <span>
              <p class="money">{{"￥"+two}}</p>
              <p class="peisong">配送费$5</p>
          </span>
          <span :class="{close:buyshop,closeA:buyshop2}" @click.stop="goorder()">
              去结算
          </span>
          <p class="buyshop">{{getCount()}}</p>
     </div>
     <!-- 阴影遮罩 -->
     <div class="mask" v-show="mask_show"></div>
      <!-- 购物车内容 -->
      <div class="buycart_wrap" v-show="cartshow">
            <ul>
                 <li class="b_title">
                      <span class="b_title_left">购物车</span>
                      <span class="b_title_right el-icon-delete">清空</span>
                 </li>
                <li class="b_con" :key="h" v-for="(j,h) in onedata" v-show="j.is_featured>0">
                     <p class="b_name">{{j.name}}</p>
                     <p class="b_price">{{"￥"+j.specfoods[0].price}}</p>
                     <p class="b_num">
                     <button class="b_del" @click.stop="del(j)">-</button>
                        <span>{{j.is_featured}}</span>
                     <button class="b_add" @click.stop="add(j)">+</button>
                     </p>
                 </li>
         </ul>
    </div>   
  </div>
</div>
</template>
<script>
export default {
name:"good_class",
data(){
    return{
        loMsg:"",
        newlomsg:"",
        drawer: true,
        direction: 'btt',
        buyshop2:false,
        buyshop:true,
        show:false,
        shop_id:"",
        msg:"",
        shop_img:"https://elm.cangdu.org/img/",
        mask_show:false,
        cartshow:false,
        select_show:false,
        select_data:"",
        select_name:"",
        allcount:"",
        onedata:[],
        twodata:""
    }
},
created() {
     // 店铺的id
    this.shop_id=getCookie("shop_id");
    // 路由传入商品的id
    this.id=this.$route.query.good_id;
    // this.getMsg();
    this.getCount();
    if(JSON.parse( localStorage.getItem("buycart"+this.shop_id))!=undefined){
        this.msg = JSON.parse( localStorage.getItem("buycart"+this.shop_id));
    }else{
         this.getMsg()
    }
},
watch: {
    msg:{
        handler:function(newv,oldv){
         localStorage.setItem("buycart"+this.shop_id,JSON.stringify(newv));
         localStorage.setItem("allprice",this.twodata);
		},
		deep:true
    }
},
computed: {
    two:function(){
        var price=0;
        for(var i=0;i<this.$store.state.a.length;i++){
            if(this.$store.state.a[i].restaurant_id==this.shop_id){
                price+=this.$store.state.a[i].specfoods[0].price*this.$store.state.a[i].is_featured;
            }
        }
        this.twodata=price;
        return price;
    }
},
methods: {
    getMsg(){
        const api="https://elm.cangdu.org/shopping/v2/menu?restaurant_id="+this.shop_id;
        this.$http({
            url:api,
            method:"get"
        }).then(res=>{
            this.msg=res.data;
         })
    },
    // 样式
    style(b){
        this.$nextTick(()=>{
            console.log(b)
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
    },
    gettop(v){
        var count=0;
        for(var i=0;i<this.$store.state.a.length;i++){
            if(this.$store.state.a[i].category_id==v){
                count+=this.$store.state.a[i].is_featured;
            }
        }
        return count;
    },
    // 选择商品种类
    geta(a,b){
        this.mask_show=true;
        this.select_show=true;
        this.select_data=a;
        this.select_name=b;
        console.log(b);
    },
    // 关闭遮罩
    close_mask(){
        this.mask_show=false;
        this.select_show=false;
    },
    // 加
    add(d){
        d.is_featured++;
        if(d.is_featured==1){
            this.onedata.push(d);
        }
        this.$store.state.a=this.onedata;
    },
    // 减
    del(d){
        d.is_featured--;
        if(d.is_featured==0){
             this.onedata.splice(
             this.onedata.findIndex(item => item === d),
             1
          );
         }
         this.$store.state.a=this.onedata;
    },
    // 商品总数量
    getCount(){
        var count=0;
        var one;
        for(var i=0;i<this.msg.length;i++){
            if(this.msg[i].restaurant_id==this.shop_id){
               one=this.msg[i];
               for(var j=0;j<one.foods.length;j++){
                   if(one.foods[j].is_featured>0){
                        count+=one.foods[j].is_featured;
                   }
                 
               }
            }
        }
        if(count>0){
            this.buyshop2=true;
            this.buyshop=false;
        }else{
            this.buyshop2=false;
            this.buyshop=true;
        }
        this.allcount=count;
        if(this.allcount<=0){
            this.carshow=false;
            count=0;
            
        }
        return count;
        
    },
    // 商品详情
    goods_del(a){
        this.$router.push({
            name:"goods_del",
            query:{
                goods_del:a,
            }
        })
    },
    // 购物车
    goCart(){
        if(this.allcount>0){
            this.mask_show=!this.mask_show;
            this.cartshow=!this.cartshow;
         }else {
             this.mask_show=false;
              this.cartshow=false;
         }
    },
    //去结算
    goorder(){
        localStorage.setItem("this.msg",JSON.stringify(this.msg));
        this.$router.push({
            name:"go_order",
            query:{
                msg:this.msg
            }
        })
    }
}
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
    box-sizing: border-box;
}
.goods_left {
    height:5rem;
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
.b_name {
  position:absolute;
  top:0.15rem;
  left:0.05rem;
  font-size: 0.18rem;
}
.b_price {
  position: absolute;
  top:0.15rem;
  left:2.5rem;
}
.b_num {
  position: absolute;
  top:0.12rem;
  right:0.2rem;
}
.b_del {
  width:0.2rem;
    height:0.2rem;
    line-height: 0.15rem;
    font-size: 0.15rem;
    background-color: #ffffff;
    border:1px solid #3190e8;
    color:#333333;
    border-radius: 50%;
    outline: none;
}
.b_add {
  width:0.2rem;
    height:0.2rem;
    line-height: 0.2rem;
    font-size: 0.1rem;
    background-color: #3190e8;
    color:#ffffff;
    border-radius: 50%;
    border:none;
    outline: none;
}
.buycart_wrap{
    width:3.75rem;
    height:3rem;
    position: fixed;
    bottom:0.45rem;
    left:0;
    z-index:9;
    background-color:#fff;
    overflow: scroll;
}
.b_title {
  width:100%;
  padding:0.018rem 0.14rem;
  height:0.4rem;
  line-height: 0.4rem;
  color:#333;
  font-weight: 400;
  background-color: #eceff1;
  box-sizing: border-box;
}
.b_title_left{
  float:left;
}
.b_title_right{
  float:right;
  margin-top:0.1rem;
}
.b_con{
  width:100%;
  height:0.5rem;
  background-color: #fff;
  position:relative;
}
.select_mask_bottom{  
    width:100%;
    height:0.5rem;
    line-height: 0.5rem;
    background-color: gainsboro;
    overflow: hidden;
    margin-top:0.3rem;
}
.select_mask_bottom span {
    float:left;
    color:orange;
    font-size: 0.2rem;
    margin-bottom: 0;
    margin-left:0.07rem;

}
.select_mask_bottom button {
    margin-top:0.1rem;
    float:right;
    width:1rem;
    height:0.3rem;
    border:none;
    background-color: #3190e8;
    color:#fff;
    text-align: center;
    outline: none;
    margin-right:0.05rem;
    
}
.select_mask_con {
    margin-top:0.3rem;
    width:100%;
}
.select_mask_con p:nth-child(1){
    margin-left:0.1rem;
    font-size: 0.1rem;
}
.select_mask_con_a{
    margin-top:0.15rem;
    margin-left:0.1rem;
}
.select_mask_con_a input {
    text-align: center;
    width:0.5rem;
    height:0.3rem;
    background-color: #ffffff;
    border:1px solid #3190e8;
    outline: none;
    border-radius: 10%;
    margin-right:0.1rem;
}
.select_mask{
    width:3rem;
    background-color: #ffffff;
    position: fixed;
    top:2rem;
    left:0.3rem;
    z-index:2000;
}
.select_mask_title{
    width:100%;
    height:0.5rem;
}
.select_mask_title span:nth-child(1){
    display: inline-block;
    position:absolute;
    top:0.15rem;
    left:1.2rem;
    font-size: 0.2rem;
}
.select_mask_title span:nth-child(2){
    position:absolute;
    top:0.15rem;
    right:0.1rem;
    font-size: 0.2rem;
}
.mask{
    width:3.75rem;
    height: 7rem;
    background-color: rgba(0,0,0,0.5);
    position:fixed;
    top:0;
    left:0;
    z-index:8;
}
.buyshop{
    width:0.25rem;
    height:0.25rem;
    line-height: 0.25rem;
    text-align: center;
    font-size: 0.1rem;
    background-color:red;
    color:#fff;
    position: absolute;
    top:-0.18rem;
    left:0.5rem;
    border-radius: 50%;
}
.good_class{
    width:2.9rem;
    height: 5.5rem;
    position:fixed;
    top:1.4rem;
    right:0rem;
    overflow:auto;
    overflow-y:scroll;
}
.goods_title {
width:2.55rem;
height:0.31rem;
padding:0.09rem;
line-height: 0.31rem;
overflow: hidden;
}
.goods_title_left{
    float:left;
}
.goods_title_left span:nth-child(1){
    color:rgb(102, 102, 102);;
    font-size: 0.16rem;
    font-weight: 700;
}
.goods_title_left span:nth-child(2){
    color:rgb(153, 153, 153);
    font-size: 0.1rem;
    margin-left:0.06rem;
    
}
.goods_title_right{
    float:right;
}
.good_con {
    width:2.9rem;
    height:1.06rem;
    /* padding:0.14rem 0.03rem; */
    padding-top:0.14rem;
    padding-bottom:0.14rem;
    background-color: #ffffff;
    overflow: hidden;
}
.good_left {
    width:0.46rem;
    height:0.6rem;
    margin-right:0.09rem;
    float: left;
    margin-left:0.09rem;
   
}
.good_left img {
    width:0.46rem;
    height:0.6rem;
}
.good_right{
    float:left;
}
.good_right_name {
    width:2.2rem;
    color:#333;
    font-size: 0.16rem;
    font-weight: 600;
    white-space:nowrap;
text-overflow:ellipsis;
overflow:hidden;
}
.good_right__del {
    color:rgb(153, 153, 153);
    font-size: 0.1rem;
    margin-top:0.1rem;
}
.good_right__count {
    color:rgb(51, 51, 51);
    font-size: 0.12rem;
    margin-top:0.1rem;
    margin-bottom:0.05rem;
}
.good_right__count span {
    margin-right:0.06rem;
}
.good_right__beizhu {
    padding:0;
    margin-top:0.1rem;
    color:rgb(241, 136, 79);
    font-size: 0.08rem;
    border:1px solid rgb(240, 115, 115);
    border-radius: 30%;
}
.good_right__bottom{
    width:2.2rem;
    height:0.4rem;
    margin-top:0.1rem;
    position:relative;
   
    overflow: hidden;
}
.good_right__bottom_left {
    float:left;
}
.good_right__bottom_left span:nth-child(1){
    color:#f60;
    font-size: 0.16rem;
}
.left_one {
    font-size: 0.08rem;
    color:#666;
}
.good_right__bottom_right {
    position:absolute;
    right:0;
}
.good_right__bottom_right_one{
    border:1px solid #3190e8;
    color:#ffffff;
    font-size: 0.08rem;
    padding:0.01rem;
    background-color: #3190e8;
}
.del{
    width:0.2rem;
    height:0.2rem;
    line-height: 0.2rem;
    font-size: 0.1rem;
    border:none;
    outline: none;
    border:1px solid #3190e8;
    background-color: #ffffff;
    color:#3190e8;
    border-radius: 50%;
}
.add {
    width:0.2rem;
    height:0.2rem;
    line-height: 0.2rem;
    font-size: 0.1rem;
   
    background-color: #3190e8;
    color:#ffffff;
    border-radius: 50%;
    border:none;
    outline: none;
}
.a {
    background-color: #666;
}
.shop_bottom{
    width:3.75rem;
    height:0.46rem;
    position:fixed;
    bottom:0;
    left:0;
    background-color: #555;
    color:#fff;
}
.icon{
width:0.5rem;
height:0.5rem;
font-size: 0.4rem;
line-height: 0.5rem;
text-align: center;
border-radius: 50%;
border:4px solid grey;
/* background-color: rgb(49, 144, 232); */
background-color: #555;
left:0.15rem;
position:absolute;
top:-0.15rem;
}
.iconA{
width:0.5rem;
height:0.5rem;
font-size: 0.4rem;
line-height: 0.5rem;
text-align: center;
border-radius: 50%;
border:4px solid grey;
background-color: rgb(49, 144, 232);

left:0.15rem;
position:absolute;
top:-0.15rem;
}
.shop_bottom>span:nth-child(2){
    position:absolute;
    left:0.9rem;
}
.money {
    font-size: 0.2rem;
    margin-top:0.05rem;
    font-weight: 700
}
.peisong{
    font-size: 0.12rem;
    margin-top:0.05rem;
}
.close{
    width:1.17rem;
    height:0.46rem;
    line-height: 0.46rem;
    position: absolute;
    right: 0;
    text-align: center;
    /* background-color: rgb(76, 217, 100); */
     background-color: grey;
    text-emphasis: center;
    font-size: 0.16rem;
    font-weight: 600;
}
.closeA{
    width:1.17rem;
    height:0.46rem;
    line-height: 0.46rem;
    position: absolute;
    right: 0;
    text-align: center;
    background-color: rgb(76, 217, 100);
    text-emphasis: center;
    font-size: 0.16rem;
    font-weight: 600;
}
.shop_bottom{
    width:3.75rem;
    height:0.46rem;
    position:fixed;
    bottom:0rem;;
    left:0;
    background-color: #555;
    color:#fff;
    z-index: 10;
}
.icon{
width:0.5rem;
height:0.5rem;
font-size: 0.4rem;
line-height: 0.5rem;
text-align: center;
border-radius: 50%;
border:4px solid grey;
/* background-color: rgb(49, 144, 232); */
background-color: #555;
left:0.15rem;
position:absolute;
top:-0.15rem;
}
.iconA{
width:0.5rem;
height:0.5rem;
font-size: 0.4rem;
line-height: 0.5rem;
text-align: center;
border-radius: 50%;
border:4px solid grey;
background-color: rgb(49, 144, 232);
left:0.15rem;
position:absolute;
top:-0.15rem;
}
.shop_bottom>span:nth-child(2){
    position:absolute;
    left:0.9rem;
}
.money {
    font-size: 0.2rem;
    margin-top:0.05rem;
    font-weight: 700
}
.peisong{
    font-size: 0.12rem;
    margin-top:0.05rem;
}
.close{
    width:1.17rem;
    height:0.46rem;
    line-height: 0.46rem;
    position: absolute;
    right: 0;
    text-align: center;
    /* background-color: rgb(76, 217, 100); */
     background-color: grey;
    text-emphasis: center;
    font-size: 0.16rem;
    font-weight: 600;
}
.closeA{
    width:1.17rem;
    height:0.46rem;
    line-height: 0.46rem;
    position: absolute;
    right: 0;
    text-align: center;
    background-color: rgb(76, 217, 100);
    text-emphasis: center;
    font-size: 0.16rem;
    font-weight: 600;
}
</style>