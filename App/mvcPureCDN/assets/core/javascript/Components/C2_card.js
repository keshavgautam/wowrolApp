;(function (W) {
     "use strict";
     
/**
 * card.js
 */
W.T.C.C2_card=function(x,setting) { 

   var ch = ''; var URL=W.U.URL;
   var border = (setting.border) ? 'bs-2dp' : '';
        ch += '<div class="block m0_auto _ac po-re  '+border+'" > <div class="block h100"> <div class="po-re bg_5"> <div style=" height: 100px; width: 100%; background-size: cover;"></div></div></div><div class="block "> <div class="po-ab block thumbnail a0"><a href="http://localhost:1234/teststore1"> <img class="sr-img-80" src="http://localhost:7891/abimg//photos/rcizb168180.jpeg" alt="teststore1 best value" data-src=""> </a></div><div class="a1 po-re" style="min-height: 27px;"> </div></div><div class="block"> <div class="block a2"> <div class="block _bdy ff_1"> <h3 class="tt-c _bdy_5-0"><a href="http://localhost:1234/teststore1"> teststore1 best value </a></h3> <span>@teststore1</span> <span class="wbk"> <span>teststore-1hjkhjkhjkh </span><br>325214 </span> </div></div></div></div>';

        return ch;

};
/**
 * card.js
 */

W.T.C.C2_EntityStrip=function(x,setting) { 
var ch = ''; var URL=W.U.URL;
var EntityStripDefault={imageClass:'sr-img-45',borderbottom:'',moredata:Array(),link:true};
 setting = W.U.extend(EntityStripDefault, setting);
   var imageClass = setting.imageClass;
   var borderbottom = setting.borderbottom;
   var moredata = setting.moredata;
var varified = (parseInt(x.varified) == 1) ? '<span class="pnl1 span" title="Varified">'+W.T.SVG('ok',12,'#7cb342')+'</span>' : '';

var avatar=W.U.loadImage ({file:x.avatar, width:100,
        height: 100,
        type: 'resize'});



        var Jid_picture=W.U.J(function(){ var _this=this;this.Node.onclick=function(){  W.U.PictureZoom.init(_this.data); }   },{eid:x.eid,avatar:x.avatar});


 var imageLink='<a href="javascript:void(0);" data-junction="'+Jid_picture+'" > <img class="'+imageClass+'" src="'+avatar+'" alt="'+x.entityName+'"> </a>';
  var NameLink='<a href="'+x.entityUrl+'" style="max-width:50px;" >'+x.entityName+'</a>';
if(setting.link==false){
    imageLink='<img class="'+imageClass+'" src="'+avatar+'" alt="'+x.entityName+'">';
    NameLink='<span  style="max-width:50px;" >'+x.entityName+'</span>';
}

var is_online='';
  ch += '<div class="block" data-role="entity-card"  > <div class="d3 p0 di-td">'+imageLink+'</div><div class="di-td p1 al-l vl-t '+borderbottom+'"> <span class="span _pnl "> <span class="pnl0 truncate"  >'+ NameLink+'</span><span data-class="span mklabel  circular empty online online_'+x.eid+'"></span>'+varified+' <span class="fs11 span">@'+x.slug+'</span></span>  <span class="span fs11 fg_9 ff_2 tt-c">'+x.location+'</span></span> ';
        // <span class="span fs11"> soame more info </span> <span class="span fg_4 ff_2"> <time class="timeago" datetime="2016-03-21 22:40:14" title="2016-03-21 22:40:14">10 days ago</time> </span>
     
        for(var i=0;i<moredata.length;i++){

            ch +=moredata[i];
        }

        ch += '</div></div>';
        return ch;


};
/**
 * card.js
 */



/**
 * card.js
 */

W.T.C.C2_Prductcard=function(x,setting){
    var URL=W.U.URL, menuRol='',
     Prductcardsetting={addButtonbuyer:false,addButtonstore:false,hasShortListed:false,imagelink:true,forceNormalLoad:false},
      setting = W.U.extend(Prductcardsetting, setting);

  if(W.A.page.AppId=="checkins"&&(!setting.forceNormalLoad)){
      menuRol='checkinmenu';
 }


var Jid=W.U.KKJ({
       name:x.id+'kkproduct',
       controller:function(){    
       var _this=this;
       this.menuRol=menuRol; 
       this.x=x;
       this.varient_index=0;
       this.cart_text='text_407';
       this.InventoryErrorCode=0;
       this.SBData=W.U.StoreBrowsing.hi_SBdata();
if(W.U.isOK( this.SBData)){
  if(this.SBData.mode!=3){
    if(this.SBData.role==0){
    this.InventoryErrorCode=1;//self store browsering
}
}else{
     this.InventoryErrorCode=3;//log out browsering
}
}else{
    if(W.I.AppId!='checkins'&&W.I.AppId!='messages'){
         this.InventoryErrorCode=5;//Sb data not defined
    }else{
         this.InventoryErrorCode=3;//log out browsering
    }
}

       this.showPlanlink=function(){ var e=(W.U.intval(x.pvL[0].stk) < 0)?true:false;  return e;   }
       this.showbuttonlink=function(){  
        return ((!setting.addButtonstore&&(setting.hasShortListed))&&(!setting.addButtonbuyer&&(setting.hasShortListed)));
         }
       this.showcartbuttonlink=function(){   return ((_this.InventoryErrorCode==0&&(W.U.intval(_this.x.pvL[_this.varient_index].stk)))?true:false); }
       this.showkeyfeature=function(){   return true; }
       this.showvarient=function(){   return true; }
       this.showvarientchooser=false;
       this.varientchooserStyle={'display':'none'};
       this.closeVarientChosser=function(){
         _this.showvarientchooser=true;
         _this.varientchooserStyle={'display':'none'};
  };
       this.getAllVarientId=function(){ 
   var id=[];
    for(var q in _this.x.pvL){
              
       id.push(_this.x.pvL[q].vid);


                }

   
     return id;
      }

        this.hasInCart=function(vid){ 
        
           var SBData=W.U.StoreBrowsing.hi_SBdata(),i={has:false,quantity:0};
          
   if(W.U.isOK(SBData)){
        var cvD=SBData.cvD; 

    for(var q  in cvD){
        if(cvD[q]==vid){
            i.has=true;

            if(W.U.isOK(SBData.cvPD[vid])){
                   i.quantity=SBData.cvPD[vid][0]; 
            }

            break;
        }
    } 
   }
 

return i;
        
        
        }

        this.has_varient=function(){ return ((_this.x.Hvrt=='')?false:true); };

       function off_price(sp,cp){
    var off=0;
    sp=parseFloat(sp);
    cp=parseFloat(cp);
    if(sp!=0&&cp!=0){
    off=-(100*((sp/cp-1))); 
    if( off<0){
        off=0; 
    }
      
    }
    return  Math.ceil10(off);
}
       function get_price(){
           var prices={sp:_this.x.pvL[_this.varient_index].sP,
           cP:x.pvL[_this.varient_index].cP,
           cPShow:1,
           off:0,
           offShow:0,
           currency:W.I.Currency[x.pvL[_this.varient_index].currency].symbol,
           stocktext:'text_406',
           stockClass_success:false,
           stockClass_error:true
           };

           if((x.pvL[0].stk > 0)){
             prices.stocktext='text_405';
             prices.stockClass_success=true; 
             prices.stockClass_error=false; 
           }

        prices.off=off_price(prices.sp,prices.cP);

        prices.cPShow=(W.U.intval(prices.cP)>0)?1:0;
        prices.offShow=(W.U.intval(prices.off)>0)?1:0;
        prices.off+='% off';

           return prices;
       }




       function get_image(){

 var TheImage=(W.U.isOK(_this.x.pvL[_this.varient_index].featureimage.url))?_this.x.pvL[_this.varient_index].featureimage.url:'';
 if(TheImage==''){
     TheImage=(W.U.isOK(_this.x.pvL[_this.varient_index].mainimages[0]))?_this.x.pvL[_this.varient_index].mainimages[0].url:'';
 if(TheImage==''){
     TheImage=(W.U.isOK(_this.x.pvL[_this.varient_index].webimages[0]))?_this.x.pvL[_this.varient_index].webimages[0].url: W.I.PRODUCT_PLACEHOLDER;
   
 }
  if(!W.U.isOK(TheImage)){
     TheImage=W.I.PRODUCT_PLACEHOLDER;
   
 }

 }

 
  var image = W.U.loadImage({ file: TheImage,
                    width: 250,
                    height: 250,
                    type: 'slider'
                });


           var i={palceholder:W.I.PRODUCT_PLACEHOLDER,src:image};

           return i;
       }

       function get_ratting(){
         var i={show:0};
if(W.U.isOK(x.rf.Total)){
 var r=x.rf.Total;
        var Total_rating = r['5star'] + r['4star'] + r['3star'] + r['2star'] + r['1star'];
        var Total_rating_wet = (r['5star'] * 5) + (r['4star'] * 4) + (r['3star'] * 3) + (r['2star'] * 2) + (r['1star'] * 1);
        var Avg_rating = W.U.positive((Total_rating_wet / Total_rating));
        Avg_rating=((Avg_rating==0)?0.0:Avg_rating).toFixed(1);


        i.Avg_rating=Avg_rating;
        i.show=1;
}

           return i;
       }

       function get_button(){
           var i= [];

  i.push({text:'text_408',click:function(){ //Suggest
          var __this=this,pid=__this.x.pid,Node=e.srcElement||e.target;
       W.U.Browsing.AddInShortList(pid,1,Node,function(){});   
       },show:setting.addButtonstore&&(setting.hasShortListed==false)});  

   i.push({text:'text_409',click:function(e){ //shortlist
             var __this=this,pid=__this.x.pid,Node=e.srcElement||e.target;

 W.U.Browsing.AddInShortList(pid,1,Node,function(){});   
              },show:setting.addButtonbuyer&&(setting.hasShortListed==false)});   



          // i.push({text:'text_410',click:function(){  }});  

           return i;
       }

       function get_keyfeature(){
       var kfparse= W.U.arraybase64_decode(x.kf),i=[] ;
        for (var k in kfparse) {
                    if(kfparse[k]!=''){
                  i.push({text:kfparse[k]})    ; 
                   
                 
                    }
                    
                }

       return i;
       }

       function get_varient(){
           var i=[],names=_this.x.pvN,values=[],p={};
             for(var q in _this.x.pvL){
                 values[q]='';  
                   for(var o in _this.x.pvL[q].pvV){
                 values[q]+=_this.x.pvL[q].pvV[o];  
                }
                }


 for(var q in names){
        if(names[q]!=''&&W.U.isOK(values[q])){
       i.push({name:names[q],value:values[q]});     

        }
        }
           return i;


       }

       function get_cartbutton(){
            var i= {};
//cart
   var v=_this.x.pvL[_this.varient_index],
    hasInCart= _this.hasInCart(v.vid);
  

if(_this.InventoryErrorCode==0){
    if(_this.x.Hvrt==''){
   if(! hasInCart.has){
     //------button on
    


   }else{
      //------button off
   }  

       i={text:'text_407',cartAdd:function(e){
                   if(W.I.LoginStatus){
                      
  var __this =this.cartbutton,Node=e.srcElement||e.target,vid=__this.i.vid;
     __this.quantity++;
          var text =(__this.quantity==0)?'text_407':'+';
           Node=null;
          if( __this.quantity==1){
             Node=null;
          }
      W.U.Browsing.AddInCart(_this.x.pid,vid,__this.quantity,Node,function(){
                  W.F.Toast('text_411');
                  W.U.Browsing.cartIconUpdate('update');
                 
            },'add to cart',text,false);
        
               }else{
                  
                 W.U.brain.ForceLogin(); 
                  
                     
                 }

         }
         ,cartRemove:function(e){ 
            if(W.I.LoginStatus){   
   var __this =this.cartbutton,Node=e.srcElement||e.target,vid=__this.i.vid;


     __this.quantity--;
      Node=null;
     var text =(__this.quantity==0)?'text_407':'-';

             W.U.Browsing.AddInCart(_this.x.pid,vid,__this.quantity,Node,function(){
                  W.F.Toast('text_417');
                  W.U.Browsing.cartIconUpdate('update');
                 
            },'-',text,false);
        }else{
                  
                 W.U.brain.ForceLogin(); 
                  
                     
                 }
   
        },quantity:hasInCart.quantity,pid:_this.x.pid,i:_this.x.pvL[0]
         
           
         };
        
    }else{// multi varient
        
   i={text:'text_407',cartAdd:function(e){
        if(W.I.LoginStatus){
            var intent_name=W.U.uId();
                 W.U.intentdata.add(intent_name+'.0',_this.x);
                 W.U.Pager.ParseForGoToBlock(['mainpage','selectVarient',intent_name,0]);
                 
                 
             }else{
                  
                 W.U.brain.ForceLogin(); 
                  
                     
                 }
        
         }};

    }
  
 }         




    return i;
       }



      this.url=URL('')+x.slug;
      this.price=get_price();
      this.image=get_image();
      this.ratting=get_ratting();
      this.button=get_button();
      this.cartbutton=get_cartbutton();

      this.keyfeature=get_keyfeature();
      this.varient=get_varient();
     
     

       },
       listenccbk:[['cartremove',function(data){ return true; }]]


 });

 var ch='<div class="block ul _bdy_5-0 ov-hi s-img" data-role="product-card" data-kkcomponent="'+Jid+'" >'
  //-- name and image
 +'<div kk-show="(this.showPlanlink())" >'
  +'<div class=" block m_b10"><div class="img-media "><img class="img-responsive m0_auto"  background:'+W.U.RandomBGColor() +';"  src="{{this.image.palceholder}}" data-src="{{this.image.src}}" alt="{{this.x.pN}}" ></div></div>'

 +'<div class="li _bdy_0-5"> <h3 class="fw-b tt-c al-c">{{this.x.pN}}</h3> </div>'
 +'</div>'
 //--
 +'<div kk-show="(this.showPlanlink()==false)" >'


 +'<div class=" block m_b10"><a class="wbk" href="{{this.url}}" role="{{this.menuRol}}" title="{{this.x.pN}}"><div class="img-media"><img class="img-responsive m0_auto"  background:'+W.U.RandomBGColor() +';"  src="{{this.image.palceholder}}" data-src="{{this.image.src}}" alt="{{this.x.pN}}" ></div></a></div>'

 +'<div class="li _bdy_0-5"> <h3 class="fw-b tt-c al-c"><a class="product-title" href="{{this.url}}" role="{{this.menuRol}}" title="{{this.x.pN}}">{{this.x.pN}}</a></h3> </div>'


 +'</div>'

 //-- name and image

  //--PRice
 +'<div class="li _bdy_0-5 "> <div class="block "> <span class="bg-price m0"><i class="tt-c">{{this.price.currency}}</i><i>&nbsp;</i><i>{{this.price.sp}}</i></span> <span class="sm-price" kk-show="(this.price.cPShow==1)"><i class="tt-c">{{this.price.currency}} </i><i>&nbsp;</i><i>{{this.price.cP}}</i></span><span class="of-tag " kk-show="(this.price.offShow==1)">{{this.price.off}}</span><span class=" di-ib _bdy_0-5 fw-b info_text error tt-c" kk-class="{success: this.price.stockClass_success, error: this.price.stockClass_error}"  >{{this.price.stocktext}}</span><span class="di-ib _bdy_0-5  fg_10 " style="background-color: rgb(55, 190, 95);"><span class="span vl-m">{{this.ratting.Avg_rating}}</span> <span class="di-ib   vl-m" style="fill :#fff;"> '+W.T.SVG('star',14,'#fff','')+'</span> </span>  </div></div>'


  // cart button
 +'<div kk-show="(this.showcartbuttonlink())" >'
 +'<div class="block _Bdy"> <a class="btn _fbtn tt-c" href="javascript:void(0);" kk-show="(cartbutton.quantity==0||this.has_varient())"  kk-click="cartbutton.cartAdd" >{{this.cart_text}}</a>'
 +'<div class="block" kk-show="(cartbutton.quantity>0)" ><span class="span"><a href="javascript:void(0);" class="btn btn-xs fs14 fw-b ad-4" kk-click="cartbutton.cartRemove" >-</a></span> <span class=" span fw-b">{{cartbutton.quantity}}</span><span class="span"><a class="btn btn-xs  fs14 fw-b ad-4" href="javascript:void(0);" kk-click="cartbutton.cartAdd" >+</a></span></div> </div>'
 +'</div>'


 //button
 +'<div  kk-show="(this.showbuttonlink()==true)" >'
 +'<div class="block _Bdy"> <div class="btn-group " role="group" >  <a  href="javascript:void(0);" class="btn _fbtn tt-c" kk-repeat="button in this.button" kk-show="(button.show)"     kk-click="button.click" >{{button.text}}</a></div></div>'
 +'</div>'
  //keyfeature
 +'<div class="li _bdy ct fs11" kk-show="(this.showkeyfeature()==true)" >'
 +'<ul ><li class="" kk-repeat="feature in this.keyfeature"  >{{feature.text}}</li></ul>'
 +'</div>'
   //varient
 +'<div class="li _bdy ct fs11" kk-show="(this.showvarient()==true)" >'
 +'<div class="block ov-hi" kk-repeat="varientrow in this.varient" ><span class="fw-b">{{varientrow.name}}</span><span >:</span><span class="span">{{varientrow.value}}</span></div>'
 +'</div>'

    //varient
 +'<div class="po-ab bg_0 " kk-show="(this.showvarientchooser==true)" kk-style="this.varientchooserStyle" >'

  +'<div class="block "> <div class="di-td "> <a href="javascript:void(0);" class="block  header-cell hov" kk-click="this.closeVarientChosser()" > </a></div><div class="di-td w-100-010 "><a href="javascript:void(0);" class="block header-cell fg_6 fs14 ov-hi">chose varient</a> </div></div>'

  +'<div class="block ov-hi" kk-repeat="varientrow in this.varient" ><span class="fw-b">{{varientrow.name}}</span><span >:</span><span class="span">{{varientrow.value}}</span></div>'
 +'</div>'
 //--

 +'</div>';

 return ch;h


}


/**
 * card.js
 */


W.T.C.C2_CartCard=function(x,setting){
    var ch ='';var URL=W.U.URL;var menuRol='';
var CartCardsetting={quentity:0,closebtn:false,varientid:'',type:'',role:'',currencysymbol:''};
  if(W.A.page.AppId=="checkins"){
      menuRol='checkinmenu';
 }
setting = W.U.extend(CartCardsetting, setting);

 var TheImage=(W.U.isOK(x.pvL[0].featureimage.url))?x.pvL[0].featureimage.url:'';
 if(TheImage==''){
     TheImage=(W.U.isOK(x.pvL[0].mainimages[0]))?x.pvL[0].mainimages[0].url:'';
 if(TheImage==''){
     TheImage=(W.U.isOK(x.pvL[0].webimages[0]))?x.pvL[0].webimages[0].url: W.I.PRODUCT_PLACEHOLDER;
   
 }
  if(!W.U.isOK(TheImage)){
     TheImage=W.I.PRODUCT_PLACEHOLDER;
   
 }

 }

 
  var image = W.U.loadImage({ file: TheImage,
                    width: 250,
                    height: 250,
                    type: 'slider'
                });

var closeBtn='',quentityBtn='',varientstrip='',priceVal='',pricetotal='',priceStrip='';
//--getting price
var prices=[x.pvL[0].sP,x.pvL[0].cP];
var varientData=W.U.StoreBrowsing.GetVarientData(x,x.pvL[0].vid);  
if(setting.varientid!=''){
 
 var varientData=W.U.StoreBrowsing.GetVarientData(x,setting.varientid);  

 var prices=[varientData.sP,varientData.cP];

}
var currency=setting.currencysymbol;
//--getting price
//-- getting the main id
var mainId=0;
 priceVal=currency+' '+(W.U.floatval(prices[0])).toFixed(2);

switch(setting.type){
    case 'suggestion':
    mainId=x.pid;
pricetotal=prices[0];
priceStrip='<div class="block li _bdy_0-5 "><div class="right"><span class="bg-price m0">'+priceVal+'</span> </div></div>'; 
    break;
    case 'shortlist':
     mainId=x.pid;
pricetotal=prices[0];
priceStrip='<div class="block li _bdy_0-5 "><div class="right"><span class="bg-price m0">'+priceVal+'</span> </div></div>'; 
    break;
    case 'cart':
    mainId=setting.varientid;
    if(setting.role==1){
       quentityBtn='<div class="left"><div class="span"><span class="span"><a href="javascript:void(0);" class="btn btn-xs fs14 fw-b ad-4" data-onqchange="'+mainId+'-d">-</a></span> <span class=" span fw-b">'+setting.quentity+'</span><span class="span"><a class="btn btn-xs  fs14 fw-b ad-4" href="javascript:void(0);" data-onqchange="'+mainId+'-u">+</a></span></div><div class="span"><span class="span">x</span><span class="span">'+priceVal+'</span></div></div>';  
    }else{
           quentityBtn='<div class="left"><div class="span"> <span class=" span fw-b">'+setting.quentity+'</span></div><div class="span"><span class="span">x</span><span class="span">'+priceVal+'</span></div></div>';   
    }


pricetotal=currency+' '+(W.U.floatval(prices[0])*W.U.intval(setting.quentity)).toFixed(2); 
priceStrip='<div class="block li _bdy_0-5 ">'+quentityBtn+'<div class="right"><span class="bg-price m0">'+pricetotal+'</span> </div></div>'; 
    
    break;
}


//-->>
if((setting.type=='shortlist'||setting.type=='suggestion')&&x.Hvrt){
 varientstrip='<div class="block ul ul-menu dc_divider ov-hi">'+vareint_List(x,setting.varientid)+'</div>';
}

if(setting.varientid!=''&&x.Hvrt&&setting.type=='cart'){
 varientstrip='<div class="block ul ul-menu dc_divider ov-hi">'+varient_con (x,setting.varientid)+'</div>';
}

if(setting.role==1){
 closeBtn='<a class="ad-6 po-ab" href="javascript:void(0);"  data-onremove="'+mainId+'-'+setting.type+'" ><i class="sclose"></i></a>';
}





//->>
ch+='<div class="block ul _bdy_5-0 ov-hi bg_0" data-role="cart-card">';
ch+='<div class="block li m_b5">';

ch+='<div class="w2"><div class="img-media "><a href="'+ URL('')+x.slug+'" role="'+menuRol+'" ><img class="img-responsive m0_auto" src="' + URL('')+ '/assets/imgs/pic/triangle32.gif" data-src="'+image+'" alt="'+x.pN+'" ></a></div></div>';

ch+='<div class="w9"><h3 class="fw-b truncate tt-c al-c" ><a class="wbk" href="'+ URL('')+x.slug+'" role="'+menuRol+'" title="'+x.pN+'">'+x.pN+'</a></h3>'+varientstrip+'</div>';

ch+='<div class="w1">'+closeBtn+'</div>';
ch+='</div>';
ch+=priceStrip;



ch+='</div>';
function varient_con (x,vid) {
      var names=x.pvN;
     var values=[];
                for(var q in x.pvL){
                    if(x.pvL[q].vid==vid){
                    values=x.pvL[q].pvV;  
                    break;    
                    }
                 
                }

     var varient_con ='';
    for(var q in names){
   varient_con +='<div class="li "><span class="dc_0">'+names[q]+' :</span><span class="dc_1">'+values[q]+'</span></div>';   
  
        
    }

    
                return varient_con;
            }

function vareint_List(x){
   var names=x.pvN;
     var values=[];
                for(var q in x.pvL){
                 values[q]=x.pvL[q].pvV;  
                }

     var varient_con ='<div class="li _bdy tt-c">', varientlist0 = '';
    for(var q in names){
   varient_con +='<div class="block ov-hi"><span class="fw-b">'+names[q]+' :</span>'; 
   
     for(var e in  values){
   varient_con +=(values.length!=e&&e!=0)?',':'';       
  varient_con +='<span class="span">'+values[e][q]+'</span>';   
          }
          varient_con +='</div>';
    }

       varient_con +='</div>';
                return varient_con;
}

return ch;
}
/**
 * entity card.js
 */

 W.T.C.C2_EntityCard=function(x,setting){
var EntityStripDefault={imageClass:'sr-img-45',borderbottom:'',moredata:Array()};
     var ch='',collectionName='',type=x.ESd.type; 
 setting = W.U.extend(EntityStripDefault, setting);
       var imageClass = setting.imageClass;
   var borderbottom = setting.borderbottom;
   var moredata = setting.moredata;

var varified = (parseInt(x.ESd.varified) == 1) ? '<span class="pnl1 span" title="Varified">'+W.T.SVG('ok',13,'#7cb342')+'</span>' : '';

 var imageLink='<a href="'+x.ESd.profilepicUrl+'"> <img class="'+imageClass+'" src="'+x.ESd.avatar+'" alt="..."> </a>';
  var NameLink='<a href="'+x.ESd.entityUrl+'" style="max-width:50px;" >'+x.ESd.entityName+'</a>';

 if(type==1){
     var collectionlink=[];
     if(W.U.isOK(x.ESd.collection)){
  for(var q in x.ESd.collection){
       collectionlink.push(x.ESd.collection[q].name);
  }
     }
     collectionName = '<span class="span fs11 fg_9 ff_2 tt-c">'+collectionlink.join(',')+'</span>';  
    
 }


     ch+='<div class="block li bg_0 _bdy po-re bs-1"> <div class="d3 p0 di-td">'+imageLink+'</div><div class="di-td p1 al-l vl-t "><span class="span _pnl "> <span class="pnl0 truncate"  >'+ NameLink+'</span><span class="span mklabel  circular empty "></span>'+varified+'</span> <span>@'+x.ESd.slug+'</span> <span class="span fs11 fg_9 ff_2 tt-c">'+x.ESd.location+'</span>'+collectionName+' </span>';
   
       for(var i=0;i<moredata.length;i++){
            
            ch +=moredata[i];
        }


     //button
 
     ch+=' <div class="block _bdy"> '+W.U.relation({twr:x.twr,owr:x.owr,mes:x.mes,shg:x.shg},'truncate btn-xs','')+'</div>';

     //end
      ch+='</div></div>';
     return ch;
 }

 /*
 
 
 */
 W.T.C.C2_AdCard=function(x,setting){
  var DefaultSetting={link:true};
  var DefaultData={Template_id:0,h1:'heading 1',h2:'heading 2',url:'javascript:void(0);'};
   var ch='',
    setting = W.U.extend(DefaultSetting, setting),
    x = W.U.extend(DefaultData , x),
     link= ( setting.link)?x.url:'javascript:void(0);';
  switch( x.Template_id){
    case 0:
    ch+='<div class="block td-n "><a href="'+x.url+'" class="block "> <div class="block _B-gray bg_0 po-re ul _bdy_5-0 ov-hi ff_3"> <span class="po-ab bg_13 fg_10 ff_3 _bdy fs10" style="bottom: 0px; right: 0px;">Ad</span> <div class="li _bdy_0-5 fw-b "><span>'+x.h1+'</span> <span>'+x.h2+'</span></div><div class="li _bdy_0-5 fg_4 ff_10">'+x.des+'</div><div class="li _bdy_0-5 fg_9 ff_4">'+x.url+'</div></div></a></div>';
    break;  


  }
  
   return   ch;
 }


W.U.ccbk.Add('pageloaded',function(){


    var presention =(W.I.wf=='mob')?'page':'model';
  W.U.Pager.addblockdata({  name:'selectVarient', htmlStr:function(block){
          var data=block.objectdata;
     
  
     var header  =W.T.DashbordFormHeader({titleText:'select vareint',sublitText:'done',submitbuttonAttrstr:' data-pagerbtn="mainpage:blockfront"',backblock:'blockfront',pager:'mainpage' }); 
  var Jid=W.U.KKJ({
       name:data.id+'selectVarient',
       controller:function(){    
       var _this=this;
     this.x=data;
     this.hasInCart=function(vid){ 
        
           var SBData=W.U.StoreBrowsing.hi_SBdata(),i={has:false,quantity:0};
          
   if(W.U.isOK(SBData)){
        var cvD=SBData.cvD; 

    for(var q  in cvD){
        if(cvD[q]==vid){
            i.has=true;

            if(W.U.isOK(SBData.cvPD[vid])){
                   i.quantity=SBData.cvPD[vid][0]; 
            }

            break;
        }
    } 
   }
 

return i;
        
        
        }


      function get_varient(vid){
           var i=[],names=_this.x.pvN,values=[],p={};
            for(var q in _this.x.pvL){
                    if(_this.x.pvL[q].vid==vid){
                    values=_this.x.pvL[q].pvV;  
                    break;    
                    }
                 
                }


 for(var q in names){
        if(names[q]!=''&&W.U.isOK(values[q])){
       i.push({name:names[q],value:values[q]});     

        }
        }
           return i;


       }   
       
       
      function vareint_List(){
           var i=[],hasInCart;
    
            for(var q in _this.x.pvL){
    hasInCart= _this.hasInCart(_this.x.pvL[q].vid);

         i.push({v:get_varient(_this.x.pvL[q].vid),cartAdd:function(e){ 
   var __this =this.varientrow,Node=e.srcElement||e.target,vid=__this.i.vid;
     __this.quantity++;
       Node=null;
             W.U.Browsing.AddInCart(_this.x.pid,vid,__this.quantity,Node,function(){
                  W.F.Toast('text_411');
                  W.U.Browsing.cartIconUpdate('update');
                 
            },'add to cart','+',false);
     
   
        },cartRemove:function(e){ 
   var __this =this.varientrow,Node=e.srcElement||e.target,vid=__this.i.vid;
     __this.quantity--; Node=null;
             W.U.Browsing.AddInCart(_this.x.pid,vid,__this.quantity,Node,function(){
                  W.F.Toast('text_411');
                  W.U.Browsing.cartIconUpdate('update');
                 
            },'-','-',false);
     
   
        },quantity:hasInCart.quantity,pid:_this.x.pid,i:_this.x.pvL[q]}); 
                }

return i;
      }  


 this.varient=vareint_List();
  
       }


 });    
 /*
  +'<div class="block  bs-1"  ><div class="block bs-1 _Bdy  bg_0" kk-repeat="varientrow in this.varient" ><div  class="w8 ov-hi" >'
 +'<span class="" kk-repeat="varient in varientrow.v" > <span  class="span">{{varient.name}}</span><span  class="span fw-b" >{{varient.value}}</span></span>'
 +'</div><div class="w4"  >'
 +'<a class="btn btn-xs" href="javascript:void(0);" kk-show="(varientrow.quantity==0)"  kk-click="varientrow.cartAdd" >add to cart</a>'
 +'<div class="block" kk-show="(varientrow.quantity>0)" ><span class="span"><a href="javascript:void(0);" class="btn btn-xs fs14 fw-b ad-4" kk-click="varientrow.cartRemove" >-</a></span> <span class=" span fw-b">{{varientrow.quantity}}</span><span class="span"><a class="btn btn-xs  fs14 fw-b ad-4" href="javascript:void(0);" kk-click="varientrow.cartAdd" >+</a></span></div>'
 
 +'</div></div></div></div>'
 */


 var ch='<div class="block _Bdy bg_0"  data-kkcomponent="'+Jid+'" >'
   +'<div class="block  bs-1"  ><div class="block bs-1 _Bdy  bg_0" kk-repeat="varientrow in this.varient" ><div  class="w8 ov-hi" >'
 +'<span class="" kk-repeat="varient in varientrow.v" > <span  class="span">{{varient.name}}</span><span  class="span fw-b" >{{varient.value}}</span></span>'
 +'</div><div class="w4"  >'

  +'<a class="btn btn-xs tt-c" href="javascript:void(0);" kk-show="(varientrow.quantity==0)"  kk-click="varientrow.cartAdd" >add to cart</a>'
 +'<div class="block" kk-show="(varientrow.quantity>0)" ><span class="span"><a href="javascript:void(0);" class="btn btn-xs fs14 fw-b ad-4" kk-click="varientrow.cartRemove" >-</a></span> <span class=" span fw-b">{{varientrow.quantity}}</span><span class="span"><a class="btn btn-xs  fs14 fw-b ad-4" href="javascript:void(0);" kk-click="varientrow.cartAdd" >+</a></span></div>'

  +'</div></div></div>'

 +'</div>';
 
   var ret= '';

  switch(W.I.initType){
      case 2:
 var  col=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'',true)+'</div>';    
       ret= W.T.ColumnWrapXXX(['',col, ''],['','w-x-12 col-offset-3','']); 
      break;
      case 3:
    var  col=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'')+'</div>';    
       ret= W.T.ColumnWrapXXX(['',col, ''],['','w-x-12 col-offset-3','']); 
   
      break;
      default:
 ret=  W.T.wrap(header,ch,''); 
  }

     
  return ret; 
  },presention:presention});


   });


 } )(wowrol);