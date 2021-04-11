/*
* page set up 2
*/
; (function(W){
   "use strict";
         var ch='';
     var tabList=[];  var tabContent=[];
       var setting={
       ulClass:'header-link bg_0 fg_4',
       
       tabLiClass:'',
       data:{name:'demotab',
       OnlyList:false,
             activeIndex:0
            }
       };
var limit=50;
       for(var q=0;q< limit;q++){
      tabList[q]='<a href="javascript:void(0);"  role="tab" >'+W.T.SVG('setting',24,'#1274c0')+'<span class="vl-sp">Tab '+q+'</span><i class="badge _gbtn">s</i></a>';   
       }
        for(var q=0;q< limit;q++){
     tabContent[q]='<div role="tabpanel" class="tab-pane" >Tab  '+q+'</div>';   
       }


ch+=  W.T.TabLayout(tabList,tabContent,setting);
/*------=============--------*/
     var tabList=[];  var tabContent=[];
     var  onTabClick=function(){
         console.log('onTabClick');
          console.log(this.wrapdata.activeIndex);
     }
       var setting={
       ulClass:'header-link bg_0 fg_4',
       tabLiClass:'',
       data:{
       name:'demoListtab',
       OnlyList:true,
       onTabClick: onTabClick,
        activeIndex:0
            }
       };
var limit=5;
       for(var q=0;q< limit;q++){
      tabList[q]='<a href="javascript:void(0);"  role="tab" >'+W.T.SVG('setting',24,'#1274c0')+'<span class="vl-sp">Tab '+q+'</span><i class="badge _gbtn">s</i></a>';   
       }

        for(var q=0;q< limit;q++){
     tabContent[q]='<div role="tabpanel" class="tab-pane" >Tab  '+q+'</div>';   
       }


   ch+=  W.T.TabLayout(tabList,tabContent,setting);

  
   var newView=W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>');   
   



           W.U('#page').html(newView);


})(wowrol);