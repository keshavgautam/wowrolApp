/*
* 
*/
; (function(W){
   "use strict";
var bank=[];
//Tab
/*
var Tab=['store','product','location_store','people','selltagstore','sellfavstore','incurrentstore'];
var Tabdifi=['Stores','Products','Stores at location','People','Selling in stores','Selling in favorite stores','In This Store'];
*/
var Tab=['store','product','location_store','people'];
var Tabdifi=['Stores','Products','Stores at location','People'];

function GetTranseData(tab){
   var defaultTranseData={
                ifo: {AppId:W.A.page.AppId,tab:tab,search:true,eid:0 },  //info
                result: [],  //all retrived data will stored in this varible
                fr: 0,  //fire
                slcid: '',  //selected id
                sstr: '',  //search str
                ps: 5,  //pagesize
                tp: 1,  //total page
                pgd: 1   //paged
            };
  if(typeof bank[tab] != 'undefined'){
 defaultTranseData= bank[tab] ;
  }

  return defaultTranseData;
}
function AddInBank(tab,result,Tdata){
   
     var TranseData=bank[tab];
   
      bank[tab]=Tdata;
      if(typeof result!="undefined"){
        var i=result.length;     
      }else{
           var i=0;  
      }
     
    for(var q in result){
       
bank[tab].result[i]=result[q];
  i++;
    }
      console.log(bank); 
   
}
//--





//--
function initWrap(SearchStr,setting){
       function Handler(SearchStr,setting){
          this.str=SearchStr;
          this.setting=setting;
         this.init();
       } 
Handler.prototype.init=function(){
    
  var Tdata=GetTranseData(this.setting.tab);
  Tdata.ifo=JSON.stringify(this.setting);
  Tdata.bypass=1;
  this.Load(Tdata);

}
Handler.prototype.tabclickinit=function(){
    
  var Tdata=GetTranseData(this.setting.tab);
  Tdata.ifo=JSON.stringify(this.setting);
  Tdata.bypass=7;
  this.Load(Tdata);

}
       Handler.prototype.Load=function(Tdata){
       var walkwayNode=this.walkway();

      
       var walkwayLoading=(Tdata.bypass!=1&&Tdata.bypass!=7)?(walkwayNode.Loading):(walkwayNode.submitLoading);
     var     f_value= Tdata;var _this=this;
      f_value.name= 'search';
       Tdata.sstr= this.str;
               var formData = {
                form: 'paging',
                f_value: f_value
            };
               W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
                    Tdata.fr = 1;
                  
                 $(walkwayLoading).html( W.T.blockLoading());
                     
                    },
                    success: function (data) {
                $(walkwayLoading).html('');
               Tdata.fr = 0;

                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
                   var Hret = ret.mistake;
                   //     console.log(Hret);

                        }
                        if (ret.state == 200) {
                 var Hret = ret.response;
                  Tdata.ps = Hret.pagesize;
                  Tdata.tp = Hret.totalpage;
                  Tdata.pgd = Hret.paged;
                  AddInBank(_this.setting.tab,Hret.result,Tdata);
                   _this.Insert(Hret.result,Tdata.bypass);
                   _this.SetPaging(_this.setting.tab,Tdata);

                        }
                        
                    }

                });  
       }
       
       Handler.prototype.walkway=function(){
          var Node=W.U.id("searchinnerWrap"+this.setting.name).childNodes;
  
    return {main:Node[3],
            Loading:Node[4],
            Heading:Node[1],
            submitLoading:Node[2],
            paging:Node[5],
            tablist:Node[0]
            };
       }
 Handler.prototype.Insert=function(result,bypass){
  var walkwayNode=this.walkway();
  var walkWay=walkwayNode.main;
    
     var mainBlock=this.render(result,bypass);


    switch(bypass){
        case 1://html
this.Tablist();this.headingUpdate();
 W.U.Setview(walkWay,mainBlock,'html');
        break;
        case 0://append
 W.U.Setview(walkWay,mainBlock,'append');
        break;
        case 5://append
 W.U.Setview(walkWay,mainBlock,'append');
        break;
       case 7:// tab click html
this.headingUpdate();
 W.U.Setview(walkWay,mainBlock,'html');
        break;
   
    }
}
 Handler.prototype.render=function(result,bypass){
  
     switch(this.setting.tab){
        case 'store'://html
 var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+ W.T.Search.store(result)+'</div></div>')[0];
        break;
    case 'location_store'://html
 var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+ W.T.Search.store(result)+'</div></div>')[0];
        break;
    case 'product'://html
 var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+ W.T.Search.product(result)+'</div></div>')[0];
        break;
    case 'people'://html
 var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+ W.T.Search.store(result)+'</div></div>')[0];
        break;
   default:
 var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+ W.T.ProfieTabViewer.t00(result)+'</div></div>')[0];
   
    }


var mainBlock=RanderInDiv.childNodes;// do not disturb it



  

 return mainBlock;
}
 Handler.prototype.SetPaging=function(tab,Tdata){
  var walkwayNode=this.walkway();
  var _this=this;
 if((Tdata.pgd <= Tdata.tp)&&Tdata.pgd!=0){

  var mainBlock=W.U.Rander( W.T.Search.paging(tab));

    W.U.attrclick('[data-paging]',mainBlock[0],function(){
        var tab=this['data-paging'],
        TranseData =  GetTranseData(tab);
       TranseData.bypass = 5; 
        _this.Load(TranseData);
    });
    W.U.Setview(walkwayNode.paging,mainBlock,'html');
 }else{
     W.U.Setview(walkwayNode.paging,'','html');
 }
  
} 

 Handler.prototype.Tablist=function(){
     var _this=this;
       var walkwayNode=this.walkway();
       var mainBlock=W.U.Rander(W.T.Search.tablist(this.str,Tab,Tabdifi,this.setting,this.onTabclick));
    
W.U.Setview(walkwayNode.tablist,mainBlock,'html');
 $(W.U.id('carousel.SearchFilterListtab'+this.setting.name)).on('updaten',function(e){
       var activeIndex=e.activeIndex;
    console.log(activeIndex);
if(Tab[activeIndex]!=_this.setting.tab){
       _this.setting.tab=Tab[activeIndex];
       _this.tabclickinit(); 
}
 });


       }
Handler.prototype.headingUpdate=function(){
       var walkwayNode=this.walkway();
       var mainBlock=W.U.Rander(W.T.Search.heading(this.str,Tab,Tabdifi,this.setting));
    
W.U.Setview(walkwayNode.Heading,mainBlock,'html'); 
}



        new Handler(SearchStr,setting)
}


function init(walkway,SearchStr,setting){
var  defalutSetting={AppId:W.A.page.AppId,name:'store',tab:'store',search:true,seid:0,lid:0};
   setting = W.U.extend(defalutSetting, setting);

   console.log(walkway);
   console.log(SearchStr);
   console.log(setting);
var mainBlock=W.U.Rander( W.T.Search.Wrap(setting.name));
W.U.Setview(walkway,mainBlock,'html');
  initWrap(SearchStr,setting);


}


//

//
W.U.Search={init:init};

})(wowrol);