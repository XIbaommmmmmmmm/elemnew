<template>
  <div id="app">
      <!-- 订单顶部 -->
        <div id="l_order_top">
          <span class="el-icon-arrow-left" @click="OrderchangeMe()"></span>
          <span>订单备注</span>
        </div>
        <!-- 上部分 -->
        <div id="top">
            <div id="top_top1">
              <p id="top_top1_p1">快速备注</p>
                <el-radio-group v-model="radio1">
                    <el-radio-button label="不要辣" id="1" @change="getValue()">不要辣</el-radio-button>
                    <el-radio-button label="少点辣" @change="getValue()">少点辣</el-radio-button>
                    <el-radio-button label="多点辣" @change="getValue()">多点辣</el-radio-button>
                </el-radio-group>
                <el-radio-group v-model="radio2" >
                    <el-radio-button label="不要香菜" @change="getValue()">不要香菜</el-radio-button>
                </el-radio-group>
            </div>
            <!-- +++++++++++ -->
            <div id="top_top2">
              
                <el-radio-group v-model="radio3">
                    <el-radio-button label="不要洋葱" @change="getValue()"></el-radio-button>
                </el-radio-group>
                <el-radio-group v-model="radio4">
                    <el-radio-button label="多点醋" @change="getValue()"></el-radio-button>
                </el-radio-group>
                <el-radio-group v-model="radio5">
                    <el-radio-button label="多点葱" @change="getValue()"></el-radio-button>
                </el-radio-group>
            </div>
            <div id="top_top3">
              <el-radio-group v-model="radio6">
                    <el-radio-button label="去冰" @change="getValue()"></el-radio-button>
                    <el-radio-button label="少冰" @change="getValue()"></el-radio-button>
              </el-radio-group>
            </div>
            <!-- +++++++++++++ -->
        </div>
        <!-- 其他备注 -->
        <div id="other">
            <p>其他备注</p>
            <textarea name="" v-model="note" id="texX" cols="30" rows="10" placeholder="请输入备注内容（可不填）"></textarea>
        </div>
        <button id="Btn" @click="GetBei()">确定</button>
  </div>
</template>

<script>

export default {
    name:"order_remark",
    data() {
        return {
            radio1: '不要',
            radio2: '不要',
            radio3: '不要',
            radio4: '不要',
            radio5: '不要',
            radio6: '不要',
            cart_id:1,
            name1:"",
            name2:"",
            name3:"",
            name4:"",
            name5:"",
            name6:"",
            note:""
        }
    },
    created() {
       
        
    },
    methods: {
        OrderchangeMe(){
            this.$router.back(-1);
        },
        GetBei() {
          const api = "https://elm.cangdu.org/v1/carts/"+this.cart_id+"/remarks";
          this.$http({
              url:api,
              method:"get"
          }).then(res=>{
              console.log(res);
              console.log(this.note);
              
              this.getValue();
              this.$router.push({
                  name:"go_order",
                  query:{
                    arrA:[this.name1,this.name2,this.name3,this.name4,this.name5,this.name6,this.note]
                  }
              })
              
          });
        },
        getValue(){
          // console.log(this.radio1);
          // console.log(this.radio2);
          // console.log(this.radio3);
          // console.log(this.radio4);
          // console.log(this.radio5);
          // console.log(this.radio6);
          
          
          if (this.radio1=="不要") {
            this.name1="";
            console.log("bbbbbbbb"+this.name1);
          }else{
            this.name1=this.radio1;
            console.log("aaaaaa"+this.name1);
            
          }
          // +++++++++2
          if (this.radio2=="不要") {
            this.name2="";
            console.log("bbbbbbbb"+this.name2);
          }else{
            this.name2=this.radio2;
            console.log("aaaaaa"+this.name2);
            
          }
          // +++++++++=2
           // +++++++++3
          if (this.radio3=="不要") {
            this.name3="";
            console.log("bbbbbbbb"+this.name3);
          }else{
            this.name3=this.radio3;
            console.log("aaaaaa"+this.name3);
            
          }
          // +++++++++=3
          // +++++++++4
          if (this.radio4=="不要") {
            this.name4="";
            console.log("bbbbbbbb"+this.name4);
          }else{
            this.name3=this.radio3;
            console.log("aaaaaa"+this.name4);
            
          }
          // +++++++++4
          // +++++++++5
          if (this.radio5=="不要") {
            this.name5="";
            console.log("bbbbbbbb"+this.name5);
          }else{
            this.name5=this.radio5;
            console.log("aaaaaa"+this.name5);
            
          }
          // +++++++++=5
          // +++++++++6
          if (this.radio6=="不要") {
            this.name6="";
            console.log("bbbbbbbb"+this.name6);
          }else{
            this.name6=this.radio6;
            console.log("aaaaaa"+this.name6);
            
          }
          // +++++++++=3
        },
    },

}
</script>

<style scoped>
#app{
  /* overflow: hidden;
  clear: both; */
}
    /* 订单顶部栏 */
  #l_order_top {
    /* border:1px solid blue; */
    background-color: rgb(83, 83, 216);
    color: #fff;
    /* width: 3.75rem; */
    height: 0.4rem;
    line-height: 0.4rem;
    display: flex;
    justify-content: flex-start;
    font-size: 0.16rem;
    font-family: 微软雅黑;
    font-weight: bolder;
    padding-right: 0.1rem;
    /* position: fixed;
    top: 0;
    left: 0; */
    
  }
  #l_order_top span:nth-child(1){
    line-height: 0.4rem;
    padding-left: 0.05rem;
    padding-right: 1.5rem;
    
  }
  /* ++++++++++++= */
  #top {
    background-color: #fff;
    /* border: 1px solid black; */
    margin-top: 0.1rem;

  }
  /* #top_top1{
    text-align: left;
    padding-left: 0.1rem;
  } */
  #top_top1_p1 {
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: left;
    font-family: 微软雅黑;
    font-weight: bolder;
    padding-left: 0.1rem;

  }
  #top_top2 {
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    text-align: left;
    padding-left: 0.1rem;
    
  }
  #top_top3 {
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    text-align: left;
    padding-left: 0.1rem;
    padding-bottom: 0.2rem;
  }
  /* 其他备注 */
  #other {
    background-color: #fff;
    margin-top: 0.1rem;
    /* width: 3.75rem; */
    /* border: 1px solid black; */
    text-align: left;
    padding-left: 0.1rem;
  }
  #other p{
    text-align: left;
    /* padding-left: 0.1rem; */
    font-family: 微软雅黑;
    font-weight: bolder;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
  }
  #texX{
    width: 3.45rem;
    border: 1px solid gainsboro;
    font-size: 0.15rem;
    padding-left: 0.1rem;
    outline: none;
  }
  #Btn {
    background-color: #4cd964;
    color: #fff;
    height: 0.5rem;
    font-family: Microsoft Yahei;
    width: 3.6rem;
    margin-top: 0.2rem;
    border: none;
    outline: none;
    border-radius: 0.05rem;
    font-size: 0.2rem;
    letter-spacing: 0.07rem;

  }
</style>