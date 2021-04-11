/*
* 
*/
; (function(W){
   "use strict";

    var URL=W.U.URL;
 var b={//blocks
 I:function(x){//Images
     var ch='';
  var image = W.U.loadImage({ file: x.pvL[0].webimages[0],
                    width: 250,
                    height: 250,
                    type: 'slider'
                });
     ch+='<div class="li m_b5"> <div class="img-media "> <a href="'+ URL('')+x.slug+'"><img class="img-responsive m0_auto" src="" data-src="'+image+'" alt="'+x.pN+'"></a> </div></div>';

     return  ch;
 },
  n:function(x){// Name 

     var ch='<div class="li _bdy_0-5"> <h3 class="fw-b truncate tt-c al-c fs14"><a class="wbk" href="'+URL('')+x.slug+'" title="'+x.pN+'">'+x.pN+'</a></h3> </div>';
       var keyfeature = '<div class="li _bdy ct fs11"><ul >';
                for (var k in x.kf) {
                    keyfeature += '<li class="">' + x.kf[k] + '</li>';
                }
keyfeature+='</ul></div>';

     ch+= keyfeature;
     return  ch;
 },
 pk:function(x){// prices &varient & add buttton
     var ch='';
  ch+='<div class="li _bdy_0-5 " data-junction="varinetPickup" ></div>';


      W.U.JunctionAdd(W.A.page.AppId,'varinetPickup',function(){
    W.U.ProductListing.VarientPickUp.bind({Node:this.Node,ProductData:this.data})();
  },x);  

     return  ch;
 } ,
 rct:function(x){//reaction
     var ch='<div class="li _bdy_0-5 " data-junction="spreadaction'+x.sid+'" ></div>';

      W.U.JunctionAdd(W.A.page.AppId,'spreadaction'+x.sid,function(){
    W.U.spread_ViewReaction.SpreadReactionInit.bind({Node:this.Node,ID:this.data})();  
  },x.sid); 

     return ch;
 },
 spf:function(x){
   var ch='<div class="block li _B-gray " data-collapse="productspf" ><div class="block bg_7"><span class=" block w10 fs13 _bdy tt-c fg_4 ff_3 fw-b">Specifications</span> <div class="w2" ><span class="right" ><a class="btn btn-xs btn-link" href="javascript:void(0);" data-collapsebtn="productspf" ></a></span></div></div><div class="block _bdy bg_0" data-collapseblock="productspf" >'+b.spf0(x.spfl)+'</div></div>';
   
   return ch;
      
 }   ,
 spf0:function(x){
     console.log(x);
   var ch='<div class="block bg_0 m_b10 "> ';
   for(var q in x ){
       ch+='<div class="block spfc m_b10"> <div class="block _bdy h po-re"><h3>'+x[q].heading+'</h3></div> <div class="block">';
       var spf=x[q].specifications;//<!--Specifications row--> 
  for(var p in spf ){
      ch+='<div class="block po-re rl"><div class="w3 rl0"> <p>'+spf[p][0]+'</p></div> <div class="w9 rl1 ad-7"> <p>'+spf[p][1]+'</p> </div> </div>'; 
   }

  ch+='</div>';
   }
   ch+='</div></div></div>  ';

    
   return ch;
      
 } , 
 phi:function(x){ //product history info
     var ch='<div class="block li _B-gray  " data-collapse="productspf" ><div class="block bg_7"><span class=" block w10 fs13 _bdy tt-c fg_4 ff_3 fw-b">Purchase Info</span> <div class="w2" ><span class="right" ><a class="btn btn-xs btn-link" href="javascript:void(0);" data-collapsebtn="productspf" ></a></span></div></div><div class="block _bdy bg_0" data-collapseblock="productspf" >'+b.phi0(x)+'</div></div>';
   
   return ch;  
 }, 
 phi0:function(x){
     var ch='<div class="block   bg_10 ">';
     
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


     var ch='<div class="block li _B-gray " data-collapse="productspf" ><div class="block bg_7"><span class=" block w10 fs13 _bdy tt-c fg_4 ff_3 fw-b">Description</span> <div class="w2" ><span class="right" ><a class="btn btn-xs btn-link" href="javascript:void(0);" data-collapsebtn="productspf" ></a></span></div></div><div class="block _bdy bg_0 t" data-collapseblock="productspf" ><p>'+x.des+'</p></div></div>';
   
   return ch;  
 },

 declmair:function(x){
    var ch='';
    ch+='<div class="block  _B-gray fs10" data-collapse="productrespect" ><div class="block bg_7"><span class=" block w10  _bdy tt-c fg_4 ff_3 fw-b">Disclaimer</span> <div class="w2" ><span class="right" ><a class="btn btn-xs btn-link" href="javascript:void(0);" data-collapsebtn="productrespect" ></a></span></div></div><div class="block " data-collapseblock="productrespect" ><div class="block bg_6 "> <div class="block _bdy al-c "> <p> All the information about product is provided by <b class="fw-b tt-c">test store1 best value</b>. </p></div><div class="block "> <div class="block _bdy m0_auto fnone"> <div class="block"> <div class="w3 _inline"><p>Address -</p></div><div class="w6 _inline"><p class="fw-b al-l"><span>teststore-1hjkhjkhjkh </span><br>325214</p></div></div><div class="block"> <div class="w3 _inline"><p>Location -</p></div><div class="w6 _inline"><p class="fw-b al-l">Laxmi Pura Kota RAJASTHAN India</p></div><div class="block"> <div class="w3 _inline"><p>Contact Number -</p></div><div class="w6 _inline"><p class="fw-b al-l">7891945988</p></div></div></div></div></div><div class="block _bdy"><p><b class="fw-b">Disclaimer:</b> Wowrol is shopping network where stores list their products. The quality, stability, or other specifications of the products offered to be sold and purchased on the platform is the sole responsibility of the stores owners. Wowrol shall not be responsible for any errors or omissions in relation to the products.</p></div></div></div></div>';
    return ch; 
 }
 }; 
 var S ={
     c0:function(x){
          var ch='';
           ch += '<div class="block bg_0 _B-gray m_b10"  >';
           ch += S.commentwrap(x);
            ch += '</div>';


         return ch;
        },
     commentwrap: function (x) {
            var ch = '<div class="block b_gtl " data-junction="commentwrap:'+x.sid+'"></div>';

  W.U.JunctionAdd(W.A.page.AppId,'commentwrap:'+x.sid,function(){
  W.U.SpreadComment.init.bind({Node:this.Node,spreadData:this.data})();  
  },x); 


            return ch;
        } ,
     ViewReactionWrap:function(x){
     var ch = '<div class="block b_gtl " data-junction="ViewReactionWrap:'+x.sid+'"></div>';

  W.U.JunctionAdd(W.A.page.AppId,'ViewReactionWrap:'+x.sid,function(){
   W.U.spread_ViewReaction.init.bind({Node:this.Node,spreadData:this.data})();  
  },x); 


            return ch;
        },
     paging:function(){
        var ch='';
        ch+='<div class="block _bdy m_b5 m_t10"><button type="button" class="btn   btn-block" data-pagingspread="0" >Load More</button></div>';
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

function  setPage(x){
var ch='<div class=" block">';

ch+='<div class="block ul _bdy_5-0  bg_0 m_b10" >'+b.I(x)+b.n(x)+b.pk(x)+b.rct(x)+'</div>';

ch+='<div class="block ul _bdy_5-0   m_b10" >'+b.phi(x)+b.des(x)+b.spf(x)+'</div>';

ch+=b. declmair(x);
ch+='</div>';
    return ch;
    }

function Layout(x){


 var front='<div class="block"><div class="hide"><a class="hide" data-openbtn="productListing" data-btnid="back"  ></a></div><div class=" block" data-nodeid="productwalkway" style="margin-bottom: 100px;"></div></div>';

 var back=W.T.wrap(W.T.FormHeader({ close: '<div class="li b_grl"><a href="javascript:void(0);" data-closebtn="productListing" >' + W.T.SVG('left', 24, '#f1f5fc') + '</a></div>',
                title: '<span class=" block header-link-btn"><span class="fw-b al-c tt-c"><span class="vl-sp" data-jqid="productListingTitle" >View </span></<span></span>',
                done: '<div class="li b_gll tt-c" ><a href="javascript:void(0);"  data-jqid="productListingsubmit" style="display:none;"  ><span>Spread</span><i class="badge _gbtn"></i> </a></div>'
            }),'<div class="block "  data-nodeid="productListingbackpage" ></div>');
   
var blockList=[front,back];
var blockName=["productListingfront","productListingback"];
var setting ={
    name:'productListing',
    target:'productListingfront',
    page:true,
    minheight:'auto'
};
   
   return W.T.ToggleBlock(blockList, blockName,setting);

    }



  W.T.ProductListing={
Layout:Layout,//Not in Use
  setPage:setPage,
  S:S
};
})(wowrol);