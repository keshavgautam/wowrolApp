/*
* 
*/
; (function(W){
   "use strict";

    var URL=W.U.URL;

     var b={//blocks

 I:function(x){//Images
       var ch='<div class="block  " data-nodeid="productSlider" ></div>';
            W.U.ccbk.Add('productSliderchange',function(data){

var smallimages,bigimages,
selected=data.selected,
pvL=data.data.pvL;

     smallimages= W.U.ProductImage(pvL,'varientsmallimage',selected);
     bigimages= W.U.ProductImage(pvL,'varientbigimages',selected);
 

   
var wf=(W.I.AppId!='checkins')?W.I.wf:'mob';
            if(wf=='mob'){
  W.U.ZoomMobile(W.U.id('productSlider'),{smallimages:smallimages,bigimages:bigimages});   
            }
   if(wf=='web'){
      W.U.ZoomWeb(W.U.id('productSlider'),{smallimages:smallimages,bigimages:bigimages});             
            }

            });
       return ch;
 },
 n:function(x){// Name 

     var ch='<div class="block _bdy_0-5"> <h2 class="fw-b wball tt-c al-l ">'+x.pN+'</h2> </div>';
       var keyfeature = '<div class="li _bdy ct fs13"><ul style="    margin-left: 20px;" >';
  x.kfparse= W.U.arraybase64_decode(x.kf);
                for (var k in x.kfparse) {
                    if(x.kfparse[k]!=''){
                   keyfeature += '<li class="">' + x.kfparse[k] + '</li>';      
                    }
                   
                }
keyfeature+='</ul></div>';

     ch+= keyfeature;
     return  ch;
 },
 pk:function(x){// prices &varient & add buttton
     var ch='';
  ch+='<div class="block _bdy_0-5 " data-junction="varinetPickup" ></div>';


      W.U.Junction('varinetPickup',function(){
   W.U.BrandListing.VarientPickUp.bind({Node:this.Node,ProductData:this.data})();
  },x);  

     return  ch;
 } ,
 rct:function(x){//reaction
   var ch='';
   if(W.A.page.AcessData.LoginStatus){
       ch='<div class="block _bdy_0-5 " data-junction="spreadaction'+x.sid+'" ></div>';

      W.U.JunctionAdd(W.A.page.AppId,'spreadaction'+x.sid,function(){
 W.U.spread_ViewReaction.SpreadReactionInit(this.Node,this.data);  
  },x.sid);  
   }


     return ch;
 },
 spf:function(x){
   var ch='<div class="block  bs-1 " data-collapse="productspf" ><div class="block bg_7"><span class=" block w10 fs13 _Bdy tt-c fg_4 ff_3 fw-b">Specifications</span> <div class="w2 _bdy" ><span class="right" ><a class="btn btn-xs btn-link" href="javascript:void(0);" data-collapsebtn="productspf" ></a></span></div></div><div class="block bs-1 bg_0" data-collapseblock="productspf" >'+b.spf0(x.spfl)+'</div></div>';
   
   return ch;
      
 }   ,
 spf0:function(y){
 var x=W.U.arraybase64_decode(y);
  
   var ch='<div class="block bg_0 m_b10 "> ';
   for(var q in x ){
       ch+='<div class="block spfc m_b10"> <div class="block _bdy h po-re"><h3>'+x[q].heading+'</h3></div> <div class="block">';
       var spf=x[q].specifications;//<!--Specifications row--> 
  for(var p in spf ){
      ch+='<div class="block po-re rl"><div class="w3 rl0"> <p>'+spf[p][0]+'</p></div> <div class="w9 rl1 ad-7"> <p>'+spf[p][1]+'</p> </div> </div>'; 
   }

  ch+='</div></div>';
   }
   ch+='</div>  ';

    
   return ch;
      
 } , 
 phi:function(x){ //product history info
     var ch='<div class="block  bs-1   " data-collapse="productspf" ><div class="block bg_7"><span class=" block w10 fs13 _Bdy tt-c fg_4 ff_3 fw-b">Purchase Info</span> <div class="w2 _bdy" ><span class="right" ><a class="btn btn-xs btn-link" href="javascript:void(0);" data-collapsebtn="productspf" ></a></span></div></div><div class="block _bdy bg_0" data-collapseblock="productspf" >'+b.phi0(x)+'</div></div>';
   
   return ch;  
 }, 
 phi0:function(x){
     var ch='<div class="block    ">';
     
     ch+= b.phi00(x.rf);
   
  ch+= b.phi01(x);
     ch+='</div>';
     return ch;
 },
 phi00:function(x){
     var ch='';
 ch='<div class="block w6 col6 _bdy"><div class="block  bg_0 bs-0 _bdy ">';
 var r=x.Total;
        var Total_rating = r['5star'] + r['4star'] + r['3star'] + r['2star'] + r['1star'];
        var Total_rating_wet = (r['5star'] * 5) + (r['4star'] * 4) + (r['3star'] * 3) + (r['2star'] * 2) + (r['1star'] * 1);
        var Avg_rating = W.U.positive((Total_rating_wet / Total_rating).toFixed(1));

     ch += '<div class="block m0_auto" style="max-width: 320px;" >';
        ch += '<div class=" w4 col4"> <div class="block rating-pot m_b10"> <div class="bigstar m0_auto al-c" style="padding: 20px 0;">' + Avg_rating + '</div></div><div class="block "> <div class="fs11 al-c">' + Total_rating + ' total</div></div></div>';

        ch += ' <div class="w8 col8"> <div class="block _bdy"> <div class="ul block ">';

        for (var key in r) {
            if (r.hasOwnProperty(key)) {

                var percent = ((r[key] / Total_rating) * 100).toFixed(0);
                ch += '<div class="block li m_b5"> <div class="block w3 rating-pot"> <span class="di-ib po-re bstar-xs-one vl-m"> </span><span class="span vl-m">' + key + '</span> </div><div class="block w7 rating-bar"> <div class="progress"> <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: ' + percent + '%;"> </div></div></div><div class="block w2 "> <div class="span vl_m">' + r[key] + '</div></div></div>';
            }
        }





        ch += '  </div></div></div>';
        ch += ' </div>';

        ch+='</div></div>';
     return ch;
 },
 phi01:function(x){
     var ch='';
 ch='<div class="block w6 col6 ">';
 var w =[['Times Added in Cart',x.pic],['Times Viewd',x.pvs]];
 for(var q in w){
 ch+='<div class="block w4 col4 _bdy   "><div class="block  bg_0 bs-0 _bdy "><div class="block m_b10 fw-b al-c"><h3>'+w[q][1]+'</h3></div><div class="block m_b10 fw-b al-c">'+w[q][0]+'</div></div></div>';   
 }

 ch+='</div>';
     return ch;
 },
 des:function(x){ //product history info
   var ch='';
   if(x.des.length>0){
   ch='<div class="block  bs-1  " data-collapse="productspf" ><div class="block bg_7"><span class=" block w10 fs13 _Bdy tt-c fg_4 ff_3 fw-b">Description</span> <div class="w2 _bdy" ><span class="right" ><a class="btn btn-xs btn-link" href="javascript:void(0);" data-collapsebtn="productspf" ></a></span></div></div><div class="block _bdy bg_0 t" data-collapseblock="productspf" ><p>'+x.des+'</p></div></div>';
   }
   return ch;  
 },
 upsell:function(x){
        var ch='';var items=[];
        if(x.upS.length>0){
  

    for(var q in x.upS){
     items[q]='<div class="block  bg_0 bs-1" style="height: 300px;" >'+W.T.C.C2_Prductcard(x.upS[q])+'</div>';    
    }
   
   var setting={
     items:items,
       name:'upsell_0',
      type:'list',
      itemWidth:250,
       itemResponsive : true,
       control : true,
       pagination : true,
      cssClass:{0:'bg_0 fg_4',1:'',2:''}
  };

var Jid=   W.U.J( function () {
       W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();
       
     }, setting);


  ch+='<div class="block  bs-1  fs10 m_b10"  >';
  ch+='<div class="block bg_7 _b-gbl" " ><span class=" block w10 fs13 _Bdy tt-c fg_4 ff_3 fw-b">Similar Products</span></div >'; 
    ch+='<div class="block  " data-junction="'+Jid+'" ></div >';  
  ch+='</div>';


}
    return ch;  
 },
 declmair:function(x){
    var ch='';
    ch+='<div class="block  bs-1  fs10" data-collapse="productrespect" ><div class="block bg_7"><span class=" block w10  _bdy tt-c fg_4 ff_3 fw-b">Disclaimer</span> <div class="w2" ><span class="right" ><a class="btn btn-xs btn-link" href="javascript:void(0);" data-collapsebtn="productrespect" ></a></span></div></div><div class="block " data-collapseblock="productrespect" ><div class="block bg_6 "> <div class="block _bdy al-c "> <p> All the information about product is provided by <b class="fw-b tt-c">test store1 best value</b>. </p></div><div class="block "> <div class="block _bdy m0_auto fnone"> <div class="block"> <div class="w3 _inline"><p>Address -</p></div><div class="w6 _inline"><p class="fw-b al-l"><span>teststore-1hjkhjkhjkh </span><br>325214</p></div></div><div class="block"> <div class="w3 _inline"><p>Location -</p></div><div class="w6 _inline"><p class="fw-b al-l">Laxmi Pura Kota RAJASTHAN India</p></div><div class="block"> <div class="w3 _inline"><p>Contact Number -</p></div><div class="w6 _inline"><p class="fw-b al-l">7891945988</p></div></div></div></div></div><div class="block _bdy"><p><b class="fw-b">Disclaimer:</b> Wowrol is shopping network where stores list their products. The quality, stability, or other specifications of the products offered to be sold and purchased on the platform is the sole responsibility of the stores owners. Wowrol shall not be responsible for any errors or omissions in relation to the products.</p></div></div></div></div>';
    return ch; 
 }


 }; 



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


/*
*/

function Layout(x){
     var ch='',colone,coltwo;
ch='<div class=" block ">';
var wf=(W.I.AppId!='checkins')?W.I.wf:'mob';

    if(wf=='mob'){
   
ch+='<div class="block    m_b10" >'+ W.T.BreadCrumb(x)+'</div>';
ch+='<div class="block   bg_0 m_b10" >'+b.I(x)+b.n(x)+b.pk(x)+b.rct(x)+'</div>';


//ch+=b. declmair(x);

ch+='<div class="block   m_b10" ><a class="btn btn-xs btn-link" href="javascript:void(0);"  data-pid="'+x.id+'"  data-action="1"  data-junction="reportproduct"  >text_8</a></div>';//


    }

   if(wf=='web'){
    

  var NnameCol='<div class="block   bg_0 _Bdy" >'+b.n(x)+b.pk(x)+b.rct(x)+'</div>';
ch+='<div class="block  m_b10" >'+ W.T.BreadCrumb(x)+'</div>';
     ch+='<div class="block   m_t10 m_b10" >'+W.T.ColumnWrapXXX([b.I(x),NnameCol],['w-x-12','w-x-12'])+'</div>';//
  ch+=b.upsell(x);
    ch+='<div class="block   m_t10" >'+W.T.ColumnWrapXXX([b.phi(x)+b.des(x)+b.spf(x),''],['w-x-18','w-x-6'])+'</div>';//
  
 //ch+='<div class="block   m_t10" >'+W.T.ColumnWrapXXX([b. declmair(x),''],['w-x-18','w-x-6'])+'</div>';//

 ch+='<div class="block   m_b10" ><a class="btn btn-xs btn-link" href="javascript:void(0);"  data-pid="'+x.id+'"  data-action="1"  data-junction="reportproduct"  >text_8</a></div>';//
    }
ch+='</div>';
       return ch;
}


 W.T.BrandListing={
 Layout:Layout
 
 };

})(wowrol);