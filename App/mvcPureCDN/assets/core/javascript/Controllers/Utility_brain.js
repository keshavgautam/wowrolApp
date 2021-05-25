;(function(W){
   "use strict";
/*
*@call  W.U.brain.analytics();
*/


function analytics(){
   
    var f_value ={
        sr:[window.innerWidth,window.innerHeight],
        eid:W.I.entity_id,
        et:W.I.entity_type,
        slug:W.I.entity_slug,
        AppId: W.I.AppId,
        lid: W.I.AppId,
        beg: 0,
         bea: 0,
        wd: W.A.page.AcessData.visit_data.wd,
        ul: W.A.page.AcessData.visit_data.wg,
        t:document.title,
        u:location.href
    };
      var loadingId= W.F.Load('analytics',f_value);
        W.U.ccbk.Run('load'+loadingId ); 
}
/*
*/ 
function ForceLogin(){
    if(!W.A.page.AcessData.LoginStatus){
         
  var pagerName='mainpage',presention='model';
    switch(W.I.initType){
 
     
     case 3://checkin web
        presention='model';   

     break;    
    }

 W.U.Pager.addblockdata({name:'ForceLogin', htmlStr:W.T.ForceLoginPage,objectdata:{},presention:presention});

setTimeout(function(){  W.U.Pager.DirectTogglePage(pagerName,'ForceLogin');    },1000);




          return false;
    }else{
        return true;
    }
}


/*
*/
function init(){
    if( W.I.AppClass!='Wellcome'){
         ForceLogin();
    }
 
    googleAdsInstall();
}



/*
Some Css Apply like marketing background
*/

function CssApply(Node,value){
    var URL=W.C.Setting.staticHTML;
  
     
 switch(value){
          case 'poster_0':

$(Node).css({
      "background-image": 'url("'+URL+'/assets/imgs/pic/poster_0.png")'
    });
            break;
    case 'showafterpageloaded':

$(Node).css({
      "display": 'block'
    });
            break;


        }

}










/*
google ads
*/
function googleAdsInstall(){
   var res={name:"adsbygoogle."+W.U.uId()+"",replace:"0",res:"adsbygoogle",resId:"adsbygooglejs",type:"script",url:'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'};

    (window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-9178174021689239",
    enable_page_level_ads: true
  });


  W.C.loader.loadscript(res.url, res.resId, res.res, function(){
 
  });  
}





   W.U.brain={
       init:init,
       analytics:analytics,
       CssApply:CssApply,
       ForceLogin:ForceLogin

   };


 W.U.ccbk.Add('pageloaded',function(){

     W.U.brain.init();
  
    });


})(wowrol);