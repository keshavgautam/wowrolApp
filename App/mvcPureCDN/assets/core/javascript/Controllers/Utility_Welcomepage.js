/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";
  


   




var NewLaunch= function(){
  var _this =this;

     this.location_info=W.I.location_info; 
     this.whereblockshow=0; 
     this.findlocation=function(){    W.I.setLocationPage(_this.location_info,'mainpage','blockFront','newlaunch'); _this.isWhirlgiginstalled=0;       }

  this.wherebtnclick=function(){
          if(_this.whereblockshow==0){
             _this.whereblockshow=1;  
           }else{
                 _this.whereblockshow=0;  
           }
       }; 
    this.locationName=function(){
           var i=_this.location_info;

           return i['town']['name']+' '+ i['city']['name']+' '+i['state']['name']+' '+ i['country']['name'];
       }
       this.isWhirlgiginstalled=0;
  this.Whirlgig={setting:function(){
     
           var TranseData={
          
                ifo: { Afiatr: {}, Cfiatr: {}, Mfiatr: {},Sort:'',market_id: _this.location_info["location"]["id"]},
                 name:'market'
            };

var Template= function(x){
  
 return '<div class="block  bg_0 bs-1"  >'+W.T.C.C2_EntityCard(x,{imageClass:'sr-img-56'})+'</div>'; 

}
   var autoUpdatelistData={
          
               name:'market',
               Template:Template,
               Pagingblock:function(){ return '<div class="block _bdy m_b5 m_t10"><div class="block " style="height: 50x;" ></div><a href="javascript:void(0);" class="btn   btn-block" data-paging="paging"  >Load More</a></div>';}
            };
  var setting={
      autoUpdatelistData:autoUpdatelistData,
      TranseData:TranseData,
      type:'autoupdate_list',
       name:'Whirlgig_category_',
       itemWidth:100,
       itemResponsive : false,
       control : true,
       pagination : false,
      cssClass:{0:'bg_0 fg_4',1:'',2:''}
  };
  return setting;
  },
  isinstall:function(){   return (_this.location_info["location"]["id"]!=0&&_this.isWhirlgiginstalled==0);},
  oninstall:function(){
          _this.isWhirlgiginstalled=1;      
  }
  }
    this.LocationRemove=function(){   
        _this.location_info["location"]["id"]=0;
        _this.location_info["city"]["id"]=0;
        _this.location_info["town"]["id"]=0;
    _this.isWhirlgiginstalled=0;   
                  }

   };










   var Jid=  W.U.J(function(){
       var _this=this;


     
            var style_0=(W.I.wf=='mob')?'   ':' style="max-width:450px;margin-top:120px" ';



      var items = [];
     items[0] = '<div class="block b_gtl b_gbl b_gll b_grl"  style="min-height:300px " data-css="poster_0" ><div class="col2 w2 hide-phone"></div><div class="col4 w4"><div class="block _Bdy bg_0 bs-1 m0_auto m_b10" '+style_0+' ><h2 class="al-c">help_88</h2><div class="block fs14 ">des_1</div></div></div><div class="col1 w1 hide-phone"></div><div class="col3 w3"><div class="block  bs-1">'+W.T.Login()+'</div></div><div class="col2 w2" style="min-height:50px"></div></div>';
    items[1] = '<div class="block b_gtl b_gbl b_gll b_grl" style="min-height:300px" data-css="poster_0" ><div class="col2 w2 hide-phone"></div><div class="col4 w4"><div class="block _Bdy bg_0 bs-1 m0_auto m_b10" '+style_0+'  ><h2 class="al-c" >The <strong>easiest</strong> way to sell online .</h2><div class="block fs14">Instantly turn your local store to online store front . From placing an order to delivering at the doorstep made so seamless, your customers will keep in <span class=red>Connected</span> with your store online.</div></div></div><div class="col4 w4"><div class=block><img class="m0_auto csr-p img-responsive" style="max-height:350px " src="http://wowrol.co/wp-content/uploads/2017/04/screencapture-wowrol-kotakirana-tab-all_products-p-profileTabPlatform-all_productsTabPage-1492167001937-e1492167167640.png" ></div></div><div class="col2 w2 " style="min-height:50px"></div></div>';

    var ContainerSize=[$('#page').find('.container ').width(),300];
    if(W.I.wf=='mob'){
        ContainerSize[0]=$('#page').find('.container ').width()-20;
    }
  var setting={
      ContainerSize:ContainerSize,
     items:items,
      type:'Carousel',
       name:'Whirlgig_2',
       singleItem :  true,
       itemWidth:100,
       itemResponsive : false,
       control : true,
       pagination : true,
      cssClass:{0:'bg_0 ',1:'',2:''}
  };






        setTimeout(function(){
            
 W.U.Whirlgig.bind({Node:_this.Node,Value:setting})();

        },200);  
           
       
       
        },{});






 var NewLaunchJid =  W.U.J(function(){
   


   








          W.KK.InsertComponent(this.Node,W.KK.createModule({
   name:'newlaunch',
   controller:NewLaunch,
   render:W.T.Welcomepage.NewLaunch
}),'html');   
       
       
        },{});

  W.U[W.A.page.AppId]=  {
      Jid:Jid,
      NewLaunchJid:NewLaunchJid


     };



 } )(wowrol);