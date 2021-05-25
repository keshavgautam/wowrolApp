

   /*
* page set up 2
*/
; (function(W){
   "use strict";

   var slide_0='';




     var items = [];
     items[0] = '<div class=block style="min-height:300px"data-css="poster_0" ><div class="col2 w2"></div><div class="col4 w4"><div class="block _Bdy bg_0 bs-1 m0_auto"style=max-width:450px;margin-top:120px><h1>The <strong>easiest</strong> way to sell online .</h1><div class="block fs16">Instantly turn your local store to online store front . From placing an order to delivering at the doorstep made so seamless, your customers will keep in <span class=red>Connected</span> with your store online.</div></div></div><div class="col4 w4"><div class=block><img class="m0_auto csr-p img-responsive"src=https://www.shop101.com/img/landing/panels-vp1/whatsapp.png></div></div><div class="col2 w2"></div></div>';
    items[1] = '<div class=block style="min-height:300px" data-css="poster_0" ><div class="col2 w2"></div><div class="col4 w4"><div class="block _Bdy bg_0 bs-1 m0_auto"style=max-width:450px;margin-top:120px><h1>The <strong>easiest</strong> way to sell online .</h1><div class="block fs16">Instantly turn your local store to online store front . From placing an order to delivering at the doorstep made so seamless, your customers will keep in <span class=red>Connected</span> with your store online.</div></div></div><div class="col4 w4"><div class=block><img class="m0_auto csr-p img-responsive"src=https://www.shop101.com/img/landing/panels-vp1/whatsapp.png></div></div><div class="col2 w2"></div></div>';


  var setting={
     items:items,
      type:'Carousel',
       name:'Whirlgig_2',
       itemWidth:100,
       itemResponsive : false,
       control : true,
       pagination : true,
      cssClass:{0:'bg_0 fg_4',1:'',2:''}
  };

   var Jid=  W.U.J(function(){
       
            W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();
       
       
        },setting);


 var ch = '<div class="block _bdy">';  
 ch += '<div class="block" data-junction="'+Jid+'" ></div>';

ch+='</div>';

   var newView='<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>';   
   

     W.U.ccbk.Run(W.U.Page,'materialpleaseinsert',newView); 

 W.U.resize();
})(wowrol);