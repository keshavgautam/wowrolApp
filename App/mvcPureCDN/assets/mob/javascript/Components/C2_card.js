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
var varified = (parseInt(x.varified) == 1) ? '<span class="pnl1 span" title="Varified">'+W.T.SVG('ok',13,'#7cb342')+'</span>' : '';
 var imageLink='<a href="'+x.profilepicUrl+'"> <img class="'+imageClass+'" src="'+x.avatar+'" alt="..."> </a>';
  var NameLink='<a href="'+x.entityUrl+'" style="max-width:50px;" >'+x.entityName+'</a>';
if(setting.link==false){
    imageLink='<img class="'+imageClass+'" src="'+x.avatar+'" alt="...">';
    NameLink='<span  style="max-width:50px;" >'+x.entityName+'</span>';
}

  ch += '<div class="block" > <div class="d3 p0 di-td">'+imageLink+'</div><div class="di-td p1 al-l vl-t '+borderbottom+'"> <span class="span _pnl "> <span class="pnl0 truncate"  >'+ NameLink+'</span><span class="span mklabel  circular empty "></span>'+varified+'</span> <span>@'+x.slug+'</span> </span> ';
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

W.T.C.C2_Prductcard=function(x,setting){
 //   console.log(x);  
 var ch ='';var URL=W.U.URL;var menuRol='';
 var Prductcardsetting={addButtonbuyer:false,addButtonstore:false,hasShortListed:false,imagelink:true};
  if(W.A.page.AppId=="checkins"){
      menuRol='checkinmenu';
 }

 setting = W.U.extend(Prductcardsetting, setting);
    if(x.pvL[0]!=undefined){
        
  
 ch += '<div class="block ul _bdy_5-0 ov-hi" data-role="product-card"> ';
 //console.log(x.pvL[0].webimages[0])
  var image = W.U.loadImage({ file: x.pvL[0].webimages[0],
                    width: 250,
                    height: 250,
                    type: 'slider'
                });
var prices=[x.pvL[0].sP,x.pvL[0].cP];
prices[2]=off_price(prices[0],prices[1]);
var stock = (x.pvL[0].stk > 0) ? '<span class=" block fw-b info_text success">In Stock</span>' : '<span class=" block fw-b info_text error">Out of Stock</span>';
  var keyfeature = '<div class="li _bdy ct fs11"><ul >';
                for (var k in x.kf) {
                    keyfeature += '<li class="">' + x.kf[k] + '</li>';
                }
keyfeature+='</ul></div>';
var img_str='<div class="li m_b5"> <div class="img-media "> <a href="'+ URL('')+x.slug+'" role="'+menuRol+'" ><img class="img-responsive m0_auto" src="' + URL('')+ '/assets/imgs/pic/triangle32.gif" data-src="'+image+'" alt="'+x.pN+'" ></a> </div></div>';


var name_str ='<div class="li _bdy_0-5"> <h3 class="fw-b truncate tt-c al-c"><a class="wbk" href="'+ URL('')+x.slug+'" role="'+menuRol+'" title="'+x.pN+'">'+x.pN+'</a></h3> </div>';
     if (prices[0] == '' || x.pvL[0].stk < 0) {

   var img_str = '<div class=" block m_b10"><div class="img-media "><img class="img-responsive m0_auto" src="' + URL('')+ '/assets/imgs/pic/triangle32.gif" data-src="'+image+'" alt="'+x.pN+'" ></div></div>';

    var name_str = '<div class="block _bdy al-c m_b10"> <h3 class="fw-b">' + x.pN+ '</h3> </div>';

                }
if(!setting.imagelink){
    var img_str='<div class="li m_b5"> <div class="img-media "> <img class="img-responsive m0_auto" src="' + URL('')+ '/assets/imgs/pic/triangle32.gif" data-src="'+image+'" alt="'+x.pN+'" ></div></div>';
}


var rating_str ='<div class="li _bdy_0-5 hide"> <div class="di-ib po-re rating-pot " data-rating="rating_id" data-original-title="" title=""> <div class="di-ib po-re bstar-xs "> <div class="di-ib po-re fstar-xs" style="width:80%;"> </div></div><div class="hide" data-ratingpopup="rating_id"> </div></div></div>';

var price_str ='<div class="li _bdy_0-5 "> <div class="block "> <span class="bg-price m0">Rs.' + prices[0] + '</span> <span class="sm-price">Rs.' + prices[1] + '</span><span class="of-tag ">'+prices[2]+'% off</span> '+stock+' </div></div>';

var varient_con_str=(x.Hvrt)?varient_con(x):'';
var addButton='';
if(setting.addButtonbuyer&&(setting.hasShortListed==false)){
   addButton='<div class="li _bdy_0-5 "><div class="btn-group" role="group" aria-label="...">  <button type="button" class="btn _fbtn" data-addsortlist="'+x.pid+'"; >SortList</button></div></div>'; 
}
if(setting.addButtonstore&&(setting.hasShortListed==false)){
   addButton='<div class="li _bdy_0-5 "><div class="btn-group" role="group" aria-label="..."><button type="button" class="btn _fbtn"  data-addsuggest="'+x.pid+'"; >Suggest</button></div></div>'; 
}

ch+=img_str+name_str+price_str+addButton+keyfeature+varient_con_str;

ch+='</div>';
  }else{
       console.log(x);  
  }

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
 function varient_con (x) {
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
 * card.js
 */


W.T.C.C2_CartCard=function(x,setting){
    var ch ='';var URL=W.U.URL;var menuRol='';
var CartCardsetting={quentity:0,closebtn:false,varientid:'',type:'',role:''};
  if(W.A.page.AppId=="checkins"){
      menuRol='checkinmenu';
 }
setting = W.U.extend(CartCardsetting, setting);

  var image = W.U.loadImage({ file: x.pvL[0].webimages[0],
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
var currency=varientData.currency;
//--getting price
//-- getting the main id
var mainId=0;
 priceVal=currency+' '+(parseFloat(prices[0])).toFixed(2);

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
       quentityBtn='<div class="left"><div class="span"><span class="span"><a href="javascript:void(0);" class="btn btn-xs fs14 fw-b" data-onqchange="'+mainId+'-d">-</a></span> <span class=" span fw-b">'+setting.quentity+'</span><span class="span"><a class="btn btn-xs  fs14 fw-b" href="javascript:void(0);" data-onqchange="'+mainId+'-u">+</a></span></div><div class="span"><span class="span">x</span><span class="span">'+priceVal+'</span></div></div>';  
    }else{
           quentityBtn='<div class="left"><div class="span"> <span class=" span fw-b">'+setting.quentity+'</span></div><div class="span"><span class="span">x</span><span class="span">'+priceVal+'</span></div></div>';   
    }


pricetotal=currency+' '+(parseFloat(prices[0])*parseInt(setting.quentity)).toFixed(2); 
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

if(setting.closebtn){
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
     var ch='';
 setting = W.U.extend(EntityStripDefault, setting);
       var imageClass = setting.imageClass;
   var borderbottom = setting.borderbottom;
   var moredata = setting.moredata;
var varified = (parseInt(x.ESd.varified) == 1) ? '<span class="pnl1 span" title="Varified">'+W.T.SVG('ok',13,'#7cb342')+'</span>' : '';
 var imageLink='<a href="'+x.ESd.profilepicUrl+'"> <img class="'+imageClass+'" src="'+x.ESd.avatar+'" alt="..."> </a>';
  var NameLink='<a href="'+x.ESd.entityUrl+'" style="max-width:50px;" >'+x.ESd.entityName+'</a>';


     ch+='<div class="block bg_0 _bdy po-re _B-gray"> <div class="d3 p0 di-td">'+imageLink+'</div><div class="di-td p1 al-l vl-t "><span class="span _pnl "> <span class="pnl0 truncate"  >'+ NameLink+'</span><span class="span mklabel  circular empty "></span>'+varified+'</span> <span>@'+x.ESd.slug+'</span> </span>';
   
       for(var i=0;i<moredata.length;i++){
            
            ch +=moredata[i];
        }


     //button
 
     ch+=' <div class="block _bdy"> '+W.U.relation({twr:x.twr,owr:x.owr,mes:{}},'truncate btn-xs','')+'</div>';

     //end
      ch+='</div></div>';
     return ch;
 }


 } )(wowrol);