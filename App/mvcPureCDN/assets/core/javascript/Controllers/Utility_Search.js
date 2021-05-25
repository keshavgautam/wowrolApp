/*
* 
*/
; (function(W){
   "use strict";
//Tab
/*
var Tab=['store','product','location_store','people','selltagstore','sellfavstore','incurrentstore'];
var Tabdifi=['Stores','Products','Stores at location','People','Selling in stores','Selling in favorite stores','In This Store'];
*/
var TabList = [
['store','Stores'],
['product','Products'],
['market','Market'],
['people','People'],
['incurrentstore','In This Store'],
['brand','Brands'],
['category','Category']
];
//var Tab=[0,5,2,3,4];
var Tab=[0,2,3];
var SalectedTab=0;
var HandlerRef=null;
//------
function defaultSerachOption(){
var  defalutSetting={AppId:W.A.page.AppId,name:'store',tab:'store',search:true,seid:0,lid:0,fl_id:0,cid:0};
    return W.U.clone(defalutSetting);
}

function Handler(walkway,SearchStr,setting){
    this.SearchStr=SearchStr;
   
      this.setting=W.U.extend(defaultSerachOption(),setting);
     this.TemplateNode=this.initTemplate(walkway);
     if( this.setting.seid==0){
         
  
     this.setting.tab=TabList[0][0];
     this.Tablist();
     this.init();
        }else{

  this.setting.tab=TabList[4][0];     
  Tab=[1,6];
  this.InStoreTablist();
     this.init();
        }
      W.U.ccbk.Run('SearchSuggestionhide'); 
   
  
}

Handler.prototype={
initTemplate: function(walkway){
     
   
    var   mainBlock=W.U.Rander(W.T.Search.Wrap());
   
    var TemplateNode={
 location: mainBlock[0].childNodes[0],
 tab: mainBlock[0].childNodes[1],
 paging: mainBlock[0].childNodes[2]
          } ;
 
   



W.U.Setview( walkway,  mainBlock, 'html');
       return TemplateNode;

},
init:function(){
    var __this=this;
   this.searchPaging='searchpaging'+this.setting.tab;
 

   this.PagingData={
   initent:__this.searchPaging ,
   Node:__this.TemplateNode.paging,
     TranseData:{ifo:__this.setting,sstr:__this.SearchStr}, //,sstr:__this.SearchStr
   resultFlow:'bottom',
    onsucess:function(_this){
    
        
var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=__this.render(result,bypass);
 _this.DomInsert(walkWay,mainBlock,bypass,result);

   
     //
     

  }  
};

 W.U.paging.init(this.PagingData);
 this.pagingNode=W.U.paging.GetNode(this.searchPaging,{});
   var TranseData = W.U.paging.GetTranseData(this.searchPaging);
  
   TranseData.bypass = 1; 
   TranseData.pgd = 1;    

 W.U.paging.load(this.searchPaging,TranseData);

   

},
render:function(result,bypass){
    var mainNode= this.pagingNode.main;
  $(mainNode).removeClass('G2');
  if(result.length>0){
     switch(this.setting.tab){
        case 'store'://html
 var RanderInDiv=W.U.Rander(W.T.Search.store(result));
        break;
    case 'market'://html
 var RanderInDiv=W.U.Rander(W.T.Search.market(result));
        break;
    case 'product'://html
 var RanderInDiv=W.U.Rander( W.T.Search.product(result,bypass));
 //var p =(bypass==1)?'<div class="block G2  m_b10 bg_0" data-nodeid="categoryGrid" >'+ch+'</div>':ch;
    $(mainNode).addClass('G2');

        break;
    case 'incurrentstore'://html
 var RanderInDiv=W.U.Rander( W.T.Search.product(result,bypass));
 //var p =(bypass==1)?'<div class="block G2  m_b10 bg_0" data-nodeid="categoryGrid" >'+ch+'</div>':ch;
    $(mainNode).addClass('G2');

        break;
    case 'category'://html
 var RanderInDiv=W.U.Rander( W.T.Search.category(result));
        break;
    case 'people'://html
 var RanderInDiv=W.U.Rander( W.T.Search.store(result));
        break;

     case 'brand'://html
 var RanderInDiv=W.U.Rander( W.T.Search.product(result,bypass));
 //var p =(bypass==1)?'<div class="block G2  m_b10 bg_0" data-nodeid="categoryGrid" >'+ch+'</div>':ch;
    $(mainNode).addClass('G2');
        break;
   default:
 var RanderInDiv=W.U.Rander( W.T.ProfieTabViewer.t00(result));
   
    }
    }else{
     var RanderInDiv=W.U.Rander(W.T.RNF_banner({msg:' No Result Found'}));
    }

var mainBlock=RanderInDiv;// do not disturb it



  

 return mainBlock;
},
Tablist:function(){
     var _this=this;
     var  ch = '<div class="block" data-junction="Whirlgig_search_Tab" ></div>';

      var items = [];
  for (var q = 0; q <  Tab.length; q++) {
         items[q] = '<a href="javascript:void(0);"  class="truncate"  role="tab" ><span class="vl-sp ">'+TabList[Tab[q]][1]+'</span></a>';

     }
  
  var setting={
     items:items,
       name:'Whirlgig_ExploreMenu_Tab',
      type:(W.I.wf=="web")?'tablist':'tabsimple',
      cssClass:{0:' header-link bg_0 fg_4',1:'',2:''},
       itemWidth :100,
       onItemclick:function(){
        var index= this.state.activeIndex;
        SalectedTab=index;
       _this.setting.tab=TabList[Tab[index]][0];
       _this.init();
         }
  };

   W.U.Junction( 'Whirlgig_search_Tab', function () {
        W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();
       
     }, setting);
   



W.U.AddDom(this.TemplateNode.tab,ch,'html');



       },
InStoreTablist:function(){
  var _this=this;   
 var ED=W.A.page.AppView.EntityStripdata; 
       var  ch = '<div class="block" ><div class="block _Bdy al-c  fs12 ">Showing the result from '+ED['entityName']+' </div><div class="block" data-junction="Whirlgig_search_Tab" ></div></div>';



    

      var items = [];
  for (var q = 0; q <  Tab.length; q++) {
         items[q] = '<a href="javascript:void(0);"  class="truncate"  role="tab" ><span class="vl-sp ">'+TabList[Tab[q]][1]+'</span></a>';

     }
  
  var setting={
     items:items,
       name:'Whirlgig_ExploreMenu_Tab',
      type:(W.I.wf=="web")?'tablist':'tabsimple',
      cssClass:{0:' header-link bg_0 fg_4',1:'',2:''},
       itemWidth :100,
       onItemclick:function(){
        var index= this.state.activeIndex;
        SalectedTab=index;
       _this.setting.tab=TabList[Tab[index]][0];
       _this.init();
         }
  };

   W.U.Junction( 'Whirlgig_search_Tab', function () {
        W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();
       
     }, setting);

  W.U.AddDom(this.TemplateNode.tab,ch,'html');
}

};




//--


 W.U.ccbk.Add(W.U.Page,'viewloaded',function(){  HandlerRef=null;Tab=[0,2,3];   });   
W.U.ccbk.Add(W.U.Page,'pageloaded',function(){ 

  //
      W.I.AfterLocationSelectCallback= function (){
          
  if((W.I.location_info["town"]["id"]=='')){
     W.I.location_info["location"]["id"]=   W.I.location_info["city"]["id"];
     W.I.location_info["location"]["name"]=  W.I.location_info["city"]["name"];
      
   }else{
      W.I.location_info["location"]["id"]=  W.I.location_info["town"]["id"];
      W.I.location_info["location"]["name"]=  W.I.location_info["town"]["name"];
   }
    

          W.U.ccbk.Run(W.U.Page,'KK_update_data_'+this.kk_name,{location_info:W.I.location_info});
  if( W.U.isFunction(this.callback)){
       this.callback(W.I.location_info);
   }
         }
        
             W.U.ccbk.Add(W.U.Page,'apply_AfterLocationSelectCallback',function(data){
              
                       if(W.I.wf=='web'){
               W.U.ccbk.Add(W.U.Page,'onHidePage_'+data.backblock,W.I.AfterLocationSelectCallback.bind(data));  
         }else{
                W.U.ccbk.Add(W.U.Page,'onHidePage_FindSearchWhere',W.I.AfterLocationSelectCallback.bind(data)); 
         } 

             });  
 
 
  });
 W.U.ccbk.Add('beforepageloaded',function(){


      




    W.I.setLocationPage =function (x,pager,backblock,kk_name,callback){
         var ch='',body;
        var Header  =W.T.DashbordFormHeader({titleText:'text_401',   pager:pager,
    backblock:backblock,submitbuttonAttrstr:' data-pagerbtn="'+pager+':'+backblock+'" ',sublitText:'Done'});

           var datalocation={Task:100,

    Data:{
   pager:'mainpage',
    backblock:'FindSearchWhere',
    town:x.town,
    city:x.city,
    state:x.state,
    country:x.country 
    },
   Option:{
onsetNode:function(Node,Data){          var ch='<div class="block ">';
 ch+='<div  data-block="town" ></div>';
 ch+='<div class="block" data-block="city" ></div><div class="block"  data-block="state" ></div>';
    ch+='<div  data-block="addlocationbutton" ></div>';
    ch+='<div  data-block="country" ></div>';

          ch+='</div>';

   var  mainBlock=W.U.Rander(ch);

    var TemplateNode={
   town:W.U.getbyblockattr('[data-block="town"]',mainBlock[0]),
     city:W.U.getbyblockattr('[data-block="city"]',mainBlock[0]),
     addlocationbutton:W.U.getbyblockattr('[data-block="addlocationbutton"]',mainBlock[0]),
     state:W.U.getbyblockattr('[data-block="state"]',mainBlock[0]),
     country:W.U.getbyblockattr('[data-block="country"]',mainBlock[0])       
    };
       W.U.Setview(Node,mainBlock,'html');

       return TemplateNode;   },
ontaskset:function(id,name){    

 this.setcomponent('town');
 this.setcomponent('city');
    this.setcomponent('state');
    this.setcomponent('country');   },
onCountrySelect:function(id,name){  
 this.Data.city={id:0,name:''};
 this.Data.state={id:0,name:''};
 this.Data.country={id:id,name:name};
this.setcomponent('state');
this.setcomponent('city');
this.setcomponent('town');
this.setcomponent('addlocationbutton');
 W.I.location_info['country']={id:id,name:name};   },
onSateSelect:function(id,name){ 
 this.Data.city={id:0,name:''};

 this.Data.state={id:id,name:name};
   this.setcomponent('addlocationbutton');
  this.setcomponent('city');
   this.setcomponent('town');
    W.I.location_info['state']={id:id,name:name};

    },
oncitySelect:function(id,name){  this.Data.city={id:id,name:name};
   this.setcomponent('town');
    W.I.location_info['city']={id:id,name:name};    },
ontownSelect:function(id,name){   this.Data.town={id:id,name:name};
    W.I.location_info['town']={id:id,name:name};    }
   }
    };
          body=W.U.location.set(datalocation); 

    if((W.I.wf=='mob')){
 ch= W.T.DashbordFormWrap(Header, body);
    }else{
         ch=W.T.ColumnWrapXXX(['', W.T.wrapForModal(Header,'<div class="block _Bdy">'+body+'</div>','',true), ''],['w-x-6','w-x-12','w-x-6']);
    }
   

    var presention =(W.I.wf=='mob')?'page':'model';
 W.U.Pager.addblockdata({  name:'FindSearchWhere', htmlStr: ch,presention:presention  });
 
 W.U.Pager.DirectInitPage('mainpage','FindSearchWhere');


              W.U.ccbk.Run(W.U.Page,'apply_AfterLocationSelectCallback',{ pager:pager,
    backblock:backblock,kk_name:kk_name,callback:callback});  


     }



     W.U.KKJunction('headersearchpg',{
       name:'headersearchpg',
       controller:function(){ 
       var _this=this;    
       this.whereblockshow=0; 
     
   
       this.wherebtnclick=function(){
          if(_this.whereblockshow==0){
             _this.whereblockshow=1;  
           }else{
                 _this.whereblockshow=0;  
           }
       }; 

       this.findlocation=function(){      W.I.setLocationPage(_this.location_info,'mainpage','search','headersearchpg');       }
       this.location_info=W.I.location_info; 
       this.locationName=function(){
           var i=_this.location_info;

           return i['town']['name']+' '+ i['city']['name']+' '+i['state']['name']+' '+ i['country']['name'];
       }


      //  this.location_id=this.location_info["location"]["id"]; 

        this.SearchStr='';
        this.PlaceHolder='';
         this.store_id=0;
         if( W.I.AppClass=='ProfilePageStore'){
    var ED=W.A.page.AppView.EntityStripdata; 
    this.PlaceHolder='Search in '+ ED['entityName'] ;
   this.store_id=ED['eid'];
}


        this.SearchSubmit=function(){   
     
          _this.whereblockshow=0;    
        
         init(W.U.id('searchwrap'),_this.SearchStr,{seid:_this.store_id,
        lid:_this.location_info["location"]["id"],
        fl_id:_this.location_info["state"]["id"],
        cid:_this.location_info["country"]["id"]
        }); 
          W.U.resize();
        
           }
        this.LocationRemove=function(){   
        _this.location_info["location"]["id"]=0;
        _this.location_info["city"]["id"]=0;
        _this.location_info["town"]["id"]=0;
    
                  }
    
      

       }


 });




  
    });
/*
*/
function  init(walkway,SearchStr,setting){
     if( SearchStr!=''){
    if(!W.U.isOK(HandlerRef)){
      HandlerRef= new Handler(walkway,SearchStr,setting); 
    }else{
        HandlerRef.SearchStr=SearchStr;
        HandlerRef.init();
    }
  }else{
        W.F.Toast('ajax_41');
       
    }
      
}


/*
*/
function SearchSuggestion(inputNode,dropdownNode){
    function Suggestion(inputNode,dropdownNode){   
        this.inputNode=inputNode;
        this.suggestionDropDown=  W.U.DropDown(dropdownNode.parentNode.firstChild,{
       type:'suggestion',
       placement:'bottom', 
       trigger:'',
       width:function(){
         
              return  this.parentNode.parentNode.offsetWidth;
            },
        Dropdown:dropdownNode});//initialization
        this.inputNode.oninput=this.oninput.bind(this);
        this.fire=0;
        var _this=this;
    W.U.ccbk.Add('SearchSuggestionhide',function(){
            _this.suggestionDropDown.hide();
    } )
    }

   Suggestion.prototype.oninput=function(){
     var _this=this;
   
     var val = this.inputNode.value;
   
    var  f_value= {
                inputval: val,
                selected: [],
               ifo: '',
                suggest: 'SearchSuggestion'
            } ;
            
    if(_this.fire==0&&val.length>0){    
                
        var loadingId= W.F.Load('suggestion',f_value);
     W.U.ccbk.Add('progress'+loadingId ,function(){  _this.fire=1;          });
     W.U.ccbk.Add('complete'+loadingId ,function(){     _this.fire=0;         });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){ 
    
     if(data.length>0){
         


            var list = '<ul class="block ul hover bg_0 fg_4 ff_5 fs13 ov-au b_gbl"      >';   
           for (var q in data) {
    var li_data = data[q].li_data;
var saveingId='suggestion.'+W.U.uId();
li_data.saveingId=saveingId;
 W.U.intentdata.add(saveingId,li_data);
                
         list  += '<li  class="li bs-1"  ><a class="block _Bdy"  href="javascript:void(0);" data-suggestionli="'+saveingId+'"  > <i class="ad-1">'+W.T.SVG('watch',16,'#f1f5fc')+'</i> <span class="vl-sp ">' + W.U.highlight(data[q].name, val) + '</span>  </a></li>';
                }
           list += '</ul> ';
     

     
     
  

            W.U.AttachDom( _this.suggestionDropDown.Dropdown, list, 'html',function(){
        var allLink=W.U(' a ',this.mainBlock[0]); 
            $(allLink).click(onNodeLinkclick); 

           
            });  
       _this.suggestionDropDown.show();







     }
    


    
       });
     W.U.ccbk.Run('load'+loadingId );
      
    }

//--
function onNodeLinkclick(){
    //W.U.console(this);
    var saveingId=this.getAttribute('data-suggestionli');
 
    var li_data= W.U.intentdata.get(saveingId);

   
  
  W.U.Search.init(W.U.id('searchwrap'),li_data.name,{});   
  _this.inputNode.value=li_data.name;
 
      _this.suggestionDropDown.hide();
}


}

    new Suggestion(inputNode,dropdownNode);
}



/*
*/
function submitSearch(){
    var e =W.U.intentdata.get('headersearchpg');
 
    if(W.U.isOK(e)){
        e.SearchSubmit();
    }

}


//---------
W.U.Search={
init:init,
page:page,
SearchSuggestion:SearchSuggestion,
submitSearch:submitSearch

};

})(wowrol);