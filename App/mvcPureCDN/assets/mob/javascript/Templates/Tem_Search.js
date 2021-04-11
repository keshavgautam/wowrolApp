/*
* 
*/
; (function(W){
   "use strict";
   


var S={
     Wrap:function(name){
       var ch='<div class="block" data-nodeid="searchinnerWrap'+name+'" ><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div></div>';
       
    
          return ch;  
     },
     store:function(x){
         var ch='';
           for(var q in x){
               ch += W.T.C.C2_EntityCard(x[q]);  
            }


         return ch;
     },
     product:function(x){
         var ch='<div class="block G2  m_b10 bg_0" data-nodeid="categoryGrid" >';
          for(var q in x ){
if( typeof x[q].pvL[0]!='undefined'){
    var setting={};
    if(W.A.page.AppId=="checkins"){
var hasShortListed= W.U.StoreBrowsing.IsProductShortListed(x[q].pvL[0].pid);
       if( SBData.role==0){


         setting={addButtonstore:true,hasShortListed:hasShortListed};   
       }else{
         setting={addButtonbuyer:true,hasShortListed:hasShortListed};         
       }
    
    }
 ch+='<div class="block grid_gap bg_0" >'+W.T.C.C2_Prductcard(x[q],setting)+'</div>'; 
 }
    }

           ch+='</div>';
         return ch;
     },
     tablist:function(str,Tab,Tabdifi,setting){
           var tabList=[];  var tabContent=[];
var activeIndex=0;


for(var q=0;q< Tab.length;q++){
      tabList[q]='<a href="javascript:void(0);"  role="tab" ><span >'+Tabdifi[q]+'</span><i class="badge _gbtn"></i></a>'; 
      if(Tab[q]==setting.tab){
          activeIndex=q;
      }  
       }

 var tabsetting = {
         ulClass:'sp0_tm bg_0 fg_4',
         tabLiClass: '',
         data: {
             name:'SearchFilterListtab'+setting.name,
            activeIndex: activeIndex,
            menuLinecolor:'#78c4c4'
         }
     };
 
         var ch='<div class="block  po-re">'; 
       ch+= W.T.CarouselLayout(tabList,tabsetting);
      
       ch+='</div>'; 
         return ch;

     },
     heading:function(str,Tab,Tabdifi,setting){
         var ch='';
var activeIndex=0;


for(var q=0;q< Tab.length;q++){
    
      if(Tab[q]==setting.tab){
          activeIndex=q;
      }  
       }
          ch+='<div class="block m_b10 "><div class=" block bg_0 fg_13 p_5 fw-b al-c _bdy "><span>Showing '+Tabdifi[activeIndex]+' for</span><span>"'+str+'"</span></div></div>';

         return ch;
     },
     paging:function(tab){
        var ch='';
        ch+='<div class="block _bdy m_b5 m_t10"><button type="button" class="btn   btn-block" data-paging="'+tab+'" >Load More</button></div>';
        return ch;

    }   
   };

W.T.Search=S;

})(wowrol);