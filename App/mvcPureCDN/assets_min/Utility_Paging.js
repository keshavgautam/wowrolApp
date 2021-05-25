/*
* 
*/
; (function(W){
   "use strict";

   var intentAbbr={
    'spread':'spread',
    'spreadcomment':'spreadcomment',
    'spreadViewReaction':'spreadViewReaction'
}
function getintentname(text){
//W.U.console(text);

    return  text.replace(/(:\d+)/g, ''); 
}
   /////////-----
   function Handler(Data){
        
     this.Data = W.U.extend(HandlerDefaults(), Data);
  
  this.Data.TranseData = W.U.extend(TranseDataDefaults(),   this.Data.TranseData);
  
this.Data.TranseData.ifo = W.U.extend({},  this.Data.TranseData.ifo);

 this.Data.onbeforeInit();

  if( this.Data.Node !=null){
    this.TemplateNode= this.initTemplate();  
     this.init();
  
 W.U.intentdata.add('paging.'+this.Data.initent,this);

 //--
 var onupdateInsert=this.updateInsert.bind(this);

  W.U.Updater.AddInRail(this.Data.updaterail,{Node:this.Data.Node,
                                              data:{name:getintentname(this.Data.initent),
                                                  init:this.Data.TranseData.ifo 
                                                  },
                                              onsucess:onupdateInsert}
                                              );


  }
  

   }

  Handler.prototype.init=function(){
    //W.U.console(this);
this.SetSearch();
  }
 Handler.prototype.initTemplate=function(){

 var ch='<div class="block"><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div></div>';


       var  Node=W.U.Rander(ch);
      
  var  childNodes=Node[0].childNodes;
                               var   ret={
            main:childNodes[3],
            search:childNodes[0],
            LoadingTop:childNodes[2],
            LoadingBottom:childNodes[4],
            pagingTop:childNodes[1],
            pagingBottom:childNodes[5]

                                        };
ret.submitLoading=(this.Data.resultFlow=='bottom')? ret.LoadingTop:ret.LoadingBottom;
ret.scrollLoading=(this.Data.resultFlow=='bottom')? ret.LoadingBottom:ret.LoadingTop;
ret.paging=(this.Data.resultFlow=='bottom')? ret.pagingBottom:ret.pagingTop;                                     
         W.U.Setview(this.Data.Node,Node,'html');
         return ret;

  }

  Handler.prototype.Load=function(){
 var Tdata=this.Data.TranseData;
 var _this=this;



   if((W.F.ScrollLoadAllow()||Tdata.bypass == 1)&& (Tdata.fr == 0) && (Tdata.pgd <= Tdata.tp)){
          var form = 'paging',
     f_value = { name: getintentname(_this.Data.initent), ps: Tdata.ps, tp: Tdata.tp, pgd:Tdata.pgd,sstr:Tdata.sstr, ifo:JSON.stringify(Tdata.ifo) };

            var formData = {
                form: form,
                f_value: f_value
            };
          
                W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
               Tdata.fr = 0;
              
                W.U.paging.Loading(_this.Data.initent,'scrollshow'); 
                    },
                    success: function (data) {
            W.U.paging.Loading(_this.Data.initent,'hide'); 
      Tdata.fr = 0;

                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
   var Hret = ret.mistake;
                   //     //W.U.console(Hret);

                        }
                        if (ret.state == 200) {
             var Hret = ret.response;
                        Tdata.pgd = Hret.paged;
                          Tdata.ps = Hret.pagesize;
                         Tdata.tp = Hret.totalpage;
                        Tdata.sstr = Hret.searchstr;
                       Tdata.tr = Hret.totalresult;
                      Tdata.ifo=   W.U.extend(Tdata.ifo, Hret.ifo);
                        Tdata.result=[];
                     _this.Insert(Hret.result);
                     _this.SetSearch();

                        }
                        
                    }

                }); 

   }   
}
 Handler.prototype.SetSearch=function(){
        var _this=this;
        if(this.Data.showsearch){
   W.U.AttachDom( this.TemplateNode.search, t.search(this.Data), 'html',function(){
        
       W.U.attrclick('[data-searchbtn="'+_this.Data.initent+'"]',this.mainBlock[0],function(){
           var  all_value = W.F.walk_way_all(['searchvalue'],'serachform'+_this.Data.initent);
           _this.Data.TranseData.bypass=1;
           _this.Data.TranseData.sstr=all_value.searchvalue;
           _this.Data.TranseData.pgd=0;
          _this.Load();

       });

       W.U.attrclick('[ data-searchrefinebtn="'+_this.Data.initent+'"]',this.mainBlock[0],function(){
    
           _this.Data.TranseData.sstr='';   _this.Data.TranseData.pgd=0;
          _this.Load();

       });
      

   });
   }
 }
 Handler.prototype.SetPaging=function(){
   var Tdata=this.Data.TranseData,_this=this;
   if(_this.Data.paging){
      if((Tdata.pgd <= Tdata.tp)&&Tdata.pgd!=0){
            var mainBlock=W.U.Rander(this.Data.pagingHTML);

    W.U.attrclick('[data-paging]',mainBlock[0],function(){
      
 Tdata.bypass = (_this.Data.resultFlow=='bottom')? 5:6;

     _this.Load(_this.Data.initent,Tdata);
    });
    W.U.Setview(_this.TemplateNode.paging,mainBlock,'html');
 }else{
     W.U.Setview(_this.TemplateNode.paging,'','html');
 }
 }
 }
Handler.prototype.Insert=function(result){
  
       var Tdata=this.Data.TranseData;
        Tdata.result=[];
          for (var q=0;q<result.length;q++) {
                                var Dresult = result[q];

if(W.U.isOK(Dresult.id)){

  var IntentName=this.Data.initent+'.'+Dresult.id;
  //W.U.console(IntentName);
 Dresult.updater_id=   W.U.Updater.GetUpdateId(IntentName);
if(Dresult.id!=0){
       
          //  W.U.console(Dresult);  
       W.U.intentdata.add(IntentName,Dresult);
}
                        
      Tdata.result.push(Dresult);
   }             
                
                          }
       this.Data.onsucess(this);
           this.SetPaging();

//update the saved Trancedata
    W.U.intentdata.add('paging.'+this.Data.initent,this);
  }
Handler.prototype.updateInsert=function(result){
   
  result=  this.Data.onUpdateResultParse(result);

       var Tdata=this.Data.TranseData;
        Tdata.updateresult=[];
          for (var q=0;q<result.length;q++) {
                                var Dresult = result[q];

if(W.U.isOK(Dresult.id)){

  var IntentName=this.Data.initent+'.'+Dresult.id;
  //W.U.console(IntentName);
 Dresult.updater_id=   W.U.Updater.GetUpdateId(IntentName);

  $('[data-point="'+ Dresult.updater_id+'"]').remove();


if(Dresult.id!=0){
       
         //   W.U.console(Dresult);  
       W.U.intentdata.add(IntentName,Dresult);
}
                        
      Tdata.updateresult.push(Dresult);
   }             
                
                          }
       this.Data.onupdatesucess(this);
      

//update the saved Trancedata
    W.U.intentdata.add('paging.'+this.Data.initent,this);
  }

/*
*  bypass 
*           1      for  html  firstload   
*           0      for  append   default for Flow:'bottom'
*           2      for  prepend   default for Flow:'top'
*           3      for  replace   with toast
*           4      for  replace   without toast
*           5      for  append    for paging  Flow:'bottom'
*           6      for  prepend  for paging  Flow:'top'
*           7      for  prepend    for submit  Flow:'bottom'
*           8      for append  for submit   Flow:'top'
*/
Handler.prototype.DomInsert=function(walkWay,mainBlock,bypass,result){

       if(bypass==1){
             
 W.U.Setview(walkWay,mainBlock,'html');
         }


   if(bypass==0||bypass==5||bypass==8){
             
 W.U.Setview(walkWay,mainBlock,'append');
         }
         
    if(bypass==2||bypass==6||bypass==7){
             
 W.U.Setview(walkWay,mainBlock,'prepend');
         }         
             
     if(bypass==3||bypass==4){
     
 var referenceNode=W.U('[data-'+getintentname(this.Data.initent)+'card="'+result[0].id+'"]')[0];
 ////W.U.console(mainBlock[0]); 
 //W.U.console(referenceNode); //W.U.console(W.U.isOK(referenceNode));
 if(W.U.isOK(referenceNode)){
//walkWay.childNodes[0].replaceChild(mainBlock[0].childNodes[0] , referenceNode);
	
$(referenceNode).replaceWith(mainBlock[0].childNodes[0] );

 }else{
     bypass = (this.Data.resultFlow=='bottom')? 7:8;
  this.DomInsert(walkWay,mainBlock,bypass,result);
 }
    }  
     if(bypass==3){
             
 W.F.Toast({msg: W.U.GetText('Change has been saved'),theme:'sucess',duration:2000});  
         }

 if(bypass==8||bypass==7){
     this.TemplateNode.submitLoading.scrollIntoView();   
 }


  setTimeout (function(){  W.U.lazy_load(); },1000);
}
   //-----
  var t={
 search:function(x){   return '<div class="block">'+t.SearchRefine(x)+x.searchHtml(x)+'</div>';     },
 searchHtml:function(x){
   
     return '<div class="block _bdy "><div class="w6 col6 m_b10 right"><form name="serachform'+x.initent+'" onsubmit="return false;" ><div class="input-group"><input type="text" name="searchvalue" class="form-mold" placeholder="'+x.searchPlaceholder+'"  value="'+x.TranseData.sstr+'" autocomplete="off" > <span class="input-group-btn"> <button class="btn " type="button"  data-searchbtn="'+x.initent+'" >'+W.T.SVG('search',14,'#f1f5fc')+'</button></span></div></form></div></div>';
     
       },
 SearchRefine:function(x){
     var ch='';
  if(x.TranseData.sstr!=''){
        ch = '<div class=" block _bdy al-l Fw-b"><p><span>'+W.U.strformat(W.U.GetText('text_217'),(x.TranseData.tr),'<i class="fw-b">'+x.TranseData.sstr+'</i>')+'</span>  &nbsp;&nbsp; <a   href="javascript:void(0);" data-searchrefinebtn="'+x.initent+'"  >text_216</a></p></div>';
}
     return ch;


 }         
  }

 function HandlerDefaults(){
     return {  Node:null,
       initent:'test',
       TranseData:TranseDataDefaults(),
       loadingHTML:W.T.blockLoading,
       pagingHTML:'<div class="block _bdy m_b5 m_t10"><button type="button" class="btn   btn-block" data-paging="" >Load More</button></div>',
       NoResultText:'No result found',
       LoadonScroll:true,
       paging:true,
       resultFlow:'bottom',//'top' like chats ,'bottom' like spread
       updaterail:'main',
       searchHtml:t.searchHtml,
       showsearch:false,
       searchPlaceholder:'search',
       onsucess:W.U.noop,
       onbeforeInit:W.U.noop,
       onupdatesucess:W.U.noop,
       onUpdateResultParse:function(x){return x;}
       };


 }
 function TranseDataDefaults(){
    var TranseData = {ifo: { },  //info
               bypass: 0,
                fr: 0,  //fire
                slcid: '',  //selected id
                sstr: '',  //search str
                ps: 5,  //pagesize
                tp: 1,  //total page
                tr: 1,  //total result
                pgd: 1 ,  //paged
                sb:'',//sortby
                st:''//sorttype
            };

return  W.U.clone(TranseData);
 }
   //------------
function init(data){
   new Handler(data);


}

//--W.U.paging.empty('spread',{});

function  empty(initent,msg){
   var _this= W.U.intentdata.get('paging.'+initent); 
   if(W.U.isOK(_this)){
   _this.Data.TranseData.pgd=1;
      W.U.AddDom(_this.TemplateNode.main,msg,'html');
   }
}


// W.U.paging.load('spread',{});
function load(initent,Tdata){              
var _this= W.U.intentdata.get('paging.'+initent);
//W.U.console('going to load page');
if(W.U.isOK(_this)){
 Tdata=(typeof(Tdata)!= 'undefined')? Tdata:{};
 var ifo=(W.U.isOK(_this.Data.TranseData.ifo))?_this.Data.TranseData.ifo:{};
_this.Data.TranseData = W.U.extend(_this.Data.TranseData,  Tdata);
_this.Data.TranseData.ifo = W.U.extend(_this.Data.TranseData.ifo, ifo);

_this.Load();
}else{
    //console.warn('Null refernce found for '+initent);
}
}



//--W.U.paging.AddRow('spread',{});
function AddRow(initent,result,bypass){
var _this= W.U.intentdata.get('paging.'+initent);
   _this.Data.TranseData.bypass = bypass;

     _this.Insert(result);
}




//--W.U.paging.GetNode('spread',{});
function GetNode(initent){
    var _this= W.U.intentdata.get('paging.'+initent);  var Node={};
if(typeof(_this)!='undefined'&&_this!=null){
  Node=    _this.TemplateNode
}else{
    //console.warn('Null refernce found for '+initent);
}

return Node;
    
}





//--W.U.paging.GetTranseData('spread',{});
function GetTranseData(initent){
    var _this= W.U.intentdata.get('paging.'+initent);

    return (W.U.isOK( _this)?_this.Data.TranseData:{}) ;
}
//--W.U.paging.Loading(initent,action);
function Loading(initent,action){
  
    var _this= W.U.intentdata.get('paging.'+initent);  var Node={};
if(typeof(_this)!='undefined'&&_this!=null){
    if(action!='hide'){
action =(_this.Data.TranseData.bypass==1)? 'submitshow': 'scrollshow';
}
    switch(action){
       case'submitshow':
      
         $(_this.TemplateNode.submitLoading).html( W.T.blockLoading());  
         if(W.I.wf=='mob'&&(!W.U.IselementInViewport(_this.TemplateNode.submitLoading))){
           _this.TemplateNode.submitLoading.scrollIntoView();  
         }
     
       break;
        case'scrollshow':
          $(_this.TemplateNode.scrollLoading).html( W.T.blockLoading());  
    if(W.I.wf=='mob'&&(!W.U.IselementInViewport(_this.TemplateNode.scrollLoading))){
           _this.TemplateNode.scrollLoading.scrollIntoView();  
         }
       break;
         case'hide':
          $(_this.TemplateNode.submitLoading).html('');  
              $(_this.TemplateNode.scrollLoading).html('');  
       break;  
    }
}
}
/*
@call   W.U.paging.DeleteTranseData();
*/
function DeleteTranseData(initent){
  W.U.intentdata.add('paging.'+initent,null);
}

   W.U.paging={
       init:init,
       load:load,
       AddRow:AddRow,
       GetNode:GetNode,
       GetTranseData:GetTranseData,
       DeleteTranseData:DeleteTranseData,
       Loading:Loading,
       getintentname:getintentname,
       empty:empty
   };



})(wowrol);