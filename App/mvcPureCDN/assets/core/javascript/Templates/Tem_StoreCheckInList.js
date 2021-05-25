 ;(function (W) {
     "use strict";



var t={
  t0:function(x){
     var ch=''; 
    if(x.length>0){
     ch='<div class="block ul hover bg_0 bs-1" >';
     
      for(var q in x){
         ch+=t.t1(x[q]); 
      }

      ch+='</div>';

      }else{
        
 ch+=W.T.RNF_banner({}); 
    }
      return ch;
  } ,
  t1:function(x){
    var URL =W.U.URL;
        var y=W.U.Browsing.ParseEntityData(x.Ed);
        var desData=W.U.Browsing.CheckInDescrition(x);
 
      
   var ch='<div class="li"><a class="block fg_11 no-t-deco"  href="'+URL('checkins')+'&id='+x.id+'"   data-point="'+x.updater_id+'" data-id="'+x.id+'" > <div class="di-td _bdy"><img class=" x48" alt="64x64" src="'+W.I.IMAGE_PLACEHOLDER+'"  data-src="'+y.avatar+'"  ></div><div class="di-td vl-t bs-1-bottom _bdy w212"> <div class="block fw-b">'+desData.name+'</div><div class="block "> <div class=" wball  "  >'+desData.line1+'</div></div></div><div class="di-td bs-1-bottom _bdy po-re"> <div class="block"> <div class="block  "><span class="block fg_12 fs11 time "></span></div><div class="block m_t5"><span class="badge-0 right br-10 br-10px bg_10 "></span></div></div></div></a></div>';
  return ch;   
  },
  s0:function(x,buyer_id){
     var ch=''; 
    if(x.length>0){
     ch='<div class="block ul hover bg_0 bs-1" >';
     
      for(var q in x){
         ch+=t.s1(x[q],buyer_id); 
      }

      ch+='</div>';

      }else{
        
 ch+=W.T.RNF_banner({}); 
    }
      return ch;
  } ,
 s1:function(x,buyer_id){
    var URL =W.U.URL;
        var y=W.U.Browsing.ParseEntityData(x.Ed);
        var desData=W.U.Browsing.CheckInDescrition(x);
 
      
   var ch='<div class="li"><a class="block fg_11 no-t-deco"  href="'+URL('checkins')+'&action=\'add\'&store_id='+x.Ed[0].eid+'&member_id='+buyer_id+'"   data-point="'+x.updater_id+'" data-id="'+x.id+'" > <div class="di-td _bdy"><img class=" x48" alt="64x64" src="'+W.I.IMAGE_PLACEHOLDER+'"  data-src="'+y.avatar+'"  ></div><div class="di-td vl-t bs-1-bottom _bdy w212"> <div class="block fw-b">'+desData.name+'</div><div class="block "> <div class=" wball  "  >'+desData.line1+'</div></div></div><div class="di-td bs-1-bottom _bdy po-re"> <div class="block"> <div class="block  "><span class="block fg_12 fs11 time "></span></div><div class="block m_t5"><span class="badge-0 right br-10 br-10px bg_10 "></span></div></div></div></a></div>';
  return ch;   
  }

};



//--
  function button(x,name){
   var ch='';
   switch(x.mode){
    case 2:   
    ch= '<span>Self Store Browsing.</span>';
    break;
    case 3:   
    ch= '<span>Login required to checkin.</span>';
    break;
      case 4:   
    ch= '<span>Other Store Browsing.</span>';
    break;
    default:
    ch= '<button type="button" class="btn btn-primary btn-xs"    class="btn _fbtn btn-xs "  data-pagerbtn="'+W.I.dp+':storecheckinlist:storecheckinlist:0" ><span>Check-In</span><span></span></button>';

 W.U.intentdata.add('storecheckinlist.0',x);
  W.U.Pager.addblockdata({ name:'storecheckinlist', htmlStr:page});

   W.U.intentdata.remove('paging.storecheckinlist');

   }
   
    
        return ch;

    }
//-
function page(block){
 
  var Header  =W.T.DashbordFormHeader({titleText:'text_219',submitbutton:false,backblock:  W.I.dpbf ,pager:'mainpage'});
  var ch='<div class="block" data-junction="storecheckinlist"></div>';
   
   W.U.Junction('storecheckinlist',function(){
     var intent='storecheckinlist';
   var PagingData=  W.U.StoreCheckInList.paging;

   PagingData.TranseData={ ifo:{AppId:W.A.page.AppId,store_id:W.A.page.AppView.SBData.Ed[0].eid} } ;
   PagingData.initent=intent ;
   PagingData.Node=  this.Node;   
//--
      var TranseData = W.U.paging.GetTranseData(intent);
      
var loadData=true;
if(W.U.isOK(TranseData.pgd)){
    if(TranseData.pgd>0){
  //  loadData=false;
         }
}

if(loadData){
 
   W.U.paging.init(PagingData);

   //--
     var TranseData = W.U.paging.GetTranseData(intent);
   
 
 
 W.U.paging.load(intent,TranseData);
 
  W.U.ccbk.Add('viewloaded',function(){
     W.U.Pager.DeletePager(intent);
    });
 }


   },{});

    return   W.T.DashbordFormWrap(Header, ch);
}

function GoOnShoppingPage(block){





     


       var data=block.triggerdata;
 var Jid=  W.U.J(function(){
      
       if(W.U.isOK( data[2])){
       
      
     var intent='goOnshoppingcheckinlist';
   var PagingData=  W.U.StoreCheckInList.buyercheckinpaging;

   PagingData.TranseData={ ifo:{AppId:W.A.page.AppId,buyer_id:data[2]} } ;
   PagingData.initent=intent ;
   PagingData.Node=  this.Node;   
//--
      var TranseData = W.U.paging.GetTranseData(intent);
      
var loadData=true;
if(W.U.isOK(TranseData.pgd)){
    if(TranseData.pgd>0){
 // loadData=false;
         }
}

if(loadData){
 
   W.U.paging.init(PagingData);

   //--
     var TranseData = W.U.paging.GetTranseData(intent);
   
 
 
 W.U.paging.load(intent,TranseData);

  W.U.ccbk.Add('viewloaded',function(){
     W.U.Pager.DeletePager(intent);
    });
 }

  }
   },{});











  var Header  =W.T.DashbordFormHeader({titleText:'text_218',submitbutton:false,backblock:  W.I.dpbf ,pager:'mainpage'});
  var ch='<div class="block bg_0" data-junction="'+Jid+'"></div>';



    return   W.T.DashbordFormWrap(Header, ch);

}


W.T.StoreCheckInList={
 GoOnShoppingPage:GoOnShoppingPage,
 page:page,
 button: button,
 t:t
};

 })(wowrol);