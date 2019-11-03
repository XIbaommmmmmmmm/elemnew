export default{
    add(a,b,c){
      console.log(a);
       a[b].foods[c].is_featured++;
       localStorage.setItem("buycart"+this.shop_id,JSON.stringify(a));
   },
}