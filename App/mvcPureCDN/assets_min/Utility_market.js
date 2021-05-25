/*
* 
*/
; (function(W){
   "use strict";
/*
*/
 function hi_marketData(marketData,forempty){
      if(!W.U.isOK(marketData)&&!W.U.isOK(forempty)){
     marketData= W.U.intentdata.get('marketData');
    }else{
        
 W.U.intentdata.add('marketData',marketData);


    }
    
      return marketData;
 }



 //-------------
 function Handler(walkway){
     this.Node=walkway;
 
     this.TemplateNode=this.initTemplate();
 
       this.setcomponent('locationchoser');
     this.setcomponent('button');
     this.initMarketData();
 }

 //------------
Handler.prototype.initMarketData=function(){
   var URL_info,getvarinfo,market_id,marketData,_this;
   _this=this;
   marketData=hi_marketData();

   if(W.U.isOK( marketData)){
      market_id= marketData.location.id;
   }

//---------------------------

    if(!W.U.isOK(market_id)){
            URL_info=W.U.ParseHref(location.href);   
    getvarinfo= URL_info.vars;  
    market_id=(W.U.isOK(getvarinfo['id']))?getvarinfo['id']:null;

     if(market_id!=null){
   this.setcomponent('info');
     _this.Paging( market_id);
    
    }else{
   //market_id is null  we   look on address infomation.
  // we print all location form user address to select
  this.setcomponent('info');
     this.setcomponent('printuserlocation');

    }
    }else{
        //market data is selected
       _this.Paging( market_id);
    }
 
 
}





Handler.prototype.initTemplate=function(){
     
     var  mainBlock=W.U.Rander( W.T.market.Layout());


    var TemplateNode={
       locationchoser:W.U('[data-block="locationchoser"]',mainBlock[0])[0],
       info:W.U('[data-block="info"]',mainBlock[0])[0],
       button:W.U('[data-block="button"]',mainBlock[0])[0],
       paging:W.U('[data-block="paging"]',mainBlock[0])[0],
       nearmarket:W.U('[data-block="nearmarket"]',mainBlock[0])[0],
       userlocation:W.U('[data-block="userlocation"]',mainBlock[0])[0]
          } ;
 
   
    // W.U.attrclick('[ data-btn="savemenuorder" ]',ArrangemainBlock[0],this.SaveMenuOrder.bind(this));


  W.U.Setview(  this.Node, mainBlock, 'html');
       return TemplateNode;

}
Handler.prototype.setcomponent=function(name){
    var _this=this;
    switch (name){
        case 'info':
          this.marketData=hi_marketData();

   W.U.AttachDom(  this.TemplateNode.info,W.T.market.info(this), 'html',function(){  });
        break;
      case 'button':
          this.marketData=hi_marketData();

   W.U.AttachDom(  this.TemplateNode.button,W.T.market.button(this), 'html',function(){
     
     
  W.U.attrclick('[data-btn="mymarket"]',this.mainBlock[0],function(){ _this.setcomponent('printuserlocation');  });
    W.U.attrclick('[data-btn="market"]',this.mainBlock[0],function(){ _this.setcomponent('paging');  });
  W.U.attrclick('[ data-btn="nearmarket"]',this.mainBlock[0],function(){ _this.setcomponent('nearmarket');  });
   });
        break;
        case 'locationchoser':


       W.U.AttachDom(  this.TemplateNode.locationchoser,W.T.market.locationchoser(this), 'html',function(){

   W.U.attrclick('[data-btn="searchmarket"]',this.mainBlock[0],_this.submitSearchForm.bind(_this));
   });

        break;
     case 'printuserlocation':
        _this.displayControl('userlocation');
        W.U.AttachDom(  this.TemplateNode.userlocation,W.T.market.printuserlocation(this), 'html',function(){
      
  
 W.U.attrclick('[data-btnlocation]',this.mainBlock[0],function(){
   var location_id=this['data-btnlocation'];
  
      _this.Goto(location_id);

 });
   });

     break;
     case 'nearmarket':
          this.marketData=hi_marketData();
       _this.displayControl('nearmarket');
       if(W.U.isOK(this.marketData)){
  var   market_id= this.marketData.location.id;
  _this.NearMarketPaging(market_id);
       }else{
           W.F.Toast({msg:'ajax_33'});
       }
       
      break;
   
           case 'paging':
          this.marketData=hi_marketData();
    
       if(W.U.isOK(this.marketData)){
  var   market_id= this.marketData.location.id;

     _this.Paging( market_id);
       }else{
           W.F.Toast({msg:'ajax_57'});
       }
       
      break;

    }

}
Handler.prototype.submitSearchForm=function(){
        var formname='searchmarket',
        f_value = W.F.walk_way_all(['country','state','citybystate'],formname),
       error=5, alert_mes = [],location_id,URL;
         var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
     
      W.U.extend(f_value,W.F.walk_way_all(['townbycity'], formname));

     if(f_value.townbycity!=''){
   var li_data= W.U.intentdata.get(f_value.townbycity);
      f_value.townbycity=li_data.id;
 }

 if(f_value.citybystate!=''){
   var li_data= W.U.intentdata.get(f_value.citybystate);
      f_value.citybystate=li_data.id;
 }
 location_id=(f_value.townbycity!='')?f_value.townbycity:f_value.citybystate;
 
       if( location_id!=''){
           debugger;
         this.Goto(location_id);
 }else{
     var AlertError = W.T.AlertError({message:['ajax_33']});
      W.U.AddDom(W.U('[data-help="'+formname+'"]'),AlertError,'html');
        W.F.alert();    
 }

}

Handler.prototype.Paging=function( market_id){
    var PagingData,_this;
     this.displayControl('paging');
    _this=this;
    PagingData=this.PagingData();  
     PagingData.Node= this.TemplateNode.paging;  
     PagingData.TranseData={ifo:{market_id: market_id},pgd:1};    
   W.U.paging.init(PagingData);
      var TranseData = W.U.paging.GetTranseData(PagingData.initent);
    //W.U.console(TranseData);
   TranseData.bypass = 1; 
   TranseData.pgd = 1;    

 W.U.paging.load(PagingData.initent,TranseData);

 var presention =(W.I.wf=='mob')?'page':'model';
  W.U.intentdata.add('marketstorefilter.tdata',{ });//dummy data to help init mob filter page
  W.U.Pager.addblockdata({name:'marketstorefilter',htmlStr:'<div class="block bg_0" data-junction="marketstorefilter"></div>',presention:presention});


        W.U.Junction('marketstorefilter',function(){
     
 W.U.filter.init(this.Node,this.data);
  },{
    TranseData: TranseData,
    LoadData:function(TranseData){

       W.U.console(TranseData); 
         TranseData.bypass = 1;   TranseData.pgd = 1; 
  if(  TranseData.tp == 0 ){
     TranseData.tp=1;
   }
         W.U.paging.load('market',TranseData);
       
  W.U.Pager.togglePage(W.I.dp,W.I.checkinblockFront);  
             
    },
    name:'marketstorefilter',
    pager:W.I.dp,
    backblock:'blockFront'
    
    });   


}

Handler.prototype.PagingData=function(){
    var __this,PagingData;
    __this=this;

   PagingData={
   initent:'market' ,
   TranseData:{}, 
   searchHtml: W.T.market.t.searchHtml,
   resultFlow:'bottom',
    showsearch:true,
    onsucess:function(_this){
    

var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
pgd=_this.Data.TranseData.pgd,
result=_this.Data.TranseData.result;
var mainBlock=Render(result,bypass);
 
      _this.DomInsert(walkWay,mainBlock,bypass,result);

   
     //
     
     if(pgd==2){

      hi_marketData(_this.Data.TranseData.ifo.marketData);
      __this.setcomponent('info');
        
     }
  } 
};

function Render(result,bypass){
    var mainBlock=W.U.Rander( W.T.market.t.t0(result,bypass));




 return mainBlock;
}


return PagingData;
}
Handler.prototype.Goto=function(location_id){
    
        var URL=W.U.URL('market')+'?id='+location_id;
 if( W.U.feature.pushState){
      history.pushState('', "", URL );
      hi_marketData(null,true);
    
        this.initMarketData();
 }else{
    W.U.GotoHref(URL);  
 }
}
Handler.prototype.NearMarketPaging=function( market_id){
    var PagingData,_this;
    _this=this;
    PagingData=this.NearMarketPagingData();
     
     PagingData.Node= this.TemplateNode.nearmarket;  
     
   W.U.paging.init(PagingData);
      var TranseData = W.U.paging.GetTranseData(PagingData.initent);
   TranseData.bypass = 1; 
   TranseData.ifo={market_id: market_id};  
   TranseData.pgd = 1;   
   
    W.U.paging.load(PagingData.initent,TranseData);

}

Handler.prototype.NearMarketPagingData=function(){
    var __this,PagingData;
    __this=this;

   PagingData={
   initent:'nearmarket' ,
     TranseData:{}, 
   resultFlow:'bottom',
    onsucess:function(_this){
    

var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
pgd=_this.Data.TranseData.pgd,
result=_this.Data.TranseData.result;
var mainBlock=Render(result,bypass);
  
 _this.DomInsert(walkWay,mainBlock,bypass,result);

   
     //
     
     if(pgd==2){

      hi_marketData(_this.Data.TranseData.ifo.marketData);
      __this.setcomponent('info');
        
     }
  } 
};

function Render(result,bypass){
    var mainBlock=W.U.Rander(W.T.market.t.n0(result,bypass));

     W.U.attrclick('[data-btnlocation]',mainBlock[0],function(){
   var location_id=this['data-btnlocation'];
  
      __this.Goto(location_id);

 });


 return mainBlock;
}


return PagingData;
}

Handler.prototype.displayControl=function(whomShow){
          $(this.TemplateNode.nearmarket).removeClass('block').addClass('hide');
          $(this.TemplateNode.paging).removeClass('block').addClass('hide');
          $(this.TemplateNode.userlocation).removeClass('block').addClass('hide');
  $(this.TemplateNode.info).removeClass('block').addClass('hide');
            $('[data-btnid]').removeClass('active');
   
    switch(whomShow){
     case 'nearmarket':
       $(this.TemplateNode.nearmarket).addClass('block').removeClass('hide');
       $('[data-btnid="nearmarket"]').addClass('active');
  
     break; 
     case 'paging':
       $(this.TemplateNode.info).addClass('block').removeClass('hide');
       $(this.TemplateNode.paging).addClass('block').removeClass('hide');
       $('[data-btnid="market"]').addClass('active');
   
     break;
      case 'userlocation':
      $(this.TemplateNode.userlocation).addClass('block').removeClass('hide');
      $('[data-btnid="mymarket"]').addClass('active');  
       
     break;       
    }


  

}
 //--------------





/*
*/
function init(walkway){


 new Handler(walkway);
}




     W.U.market=  {
       init:init  
     };

 })(wowrol);