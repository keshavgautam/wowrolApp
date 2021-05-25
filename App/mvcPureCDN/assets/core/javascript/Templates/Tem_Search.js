/*
* 
*/
; (function(W){
   "use strict";
   


var S={
    page:function(){
var header='<form name="searchbar" onsubmit="wowrol.U.Search.submitSearch(); return false; " ><div class="block" data-kkcomponent="headersearchpg"  >'
+'<div class="block po-re" ><div class="block bs-0 po-re ">'
+'<div class="di-td "><a href="javascript:void(0);" class="block _Bdy al-c hov" data-pagerbtn="mainpage:blockFront"   >'+W.T.SVG('left',24,'#f1f5fc')+' </a></div><div class="di-td w-100-010 vl-t"><div class="block "> <input type="search" name="suggestion" class="form-mold no-border p" style="min-height: 47px;" placeholder="" autocomplete="off"  kk-model="this.SearchStr" > </div></div><div class="di-td "><a class="block _Bdy al-c hov" href="javascript:void(0);" kk-click="this.wherebtnclick()" kk-show ="(this.store_id==0)"   kk-class="{bg_13:(this.whereblockshow==1)}"  ><span kk-show ="(this.location_info.location.id==0)">'+W.T.SVG('place',24,'#f1f5fc')+'</span><span kk-show ="(this.location_info.location.id!=0)">'+W.T.SVG('location_done',24,'#f1f5fc')+'</span> </a> </div><div class="di-td "><a class="block _Bdy al-c hov" href="javascript:void(0);"  kk-click="this.SearchSubmit"  > '+W.T.SVG('search',24,'#f1f5fc')+' </a> </div>'
+'</div>'
+'<div class="po-ab hide bg_0 bs-1-bottom" ></div>'
+'</div>'
+'<div class="block po-ab bg_0 bs-0 z-1"  kk-show ="(this.whereblockshow==1)" ><div class="block "   >'

+'<div class="block po-re"  kk-show ="(this.location_info.location.id==0)"  ><div class="block  po-re "><div class="di-td "><a href="javascript:void(0);" class="block _Bdy al-c"    >'+W.T.SVG('place',24,'#f1f5fc')+' </a></div><div class="di-td w-100-010 vl-t"><div class="block  _Bdy"> <a href="javascript:void(0);" class="block btn" kk-click="this.findlocation()"  >Where ?</a></div></div></div></div>'

+'<div class="block po-ab bg_0 bs-0 z-1" kk-show ="(this.location_info.location.id!=0)" ><div class="block  po-re "><div class="di-td "><a href="javascript:void(0);" class="block _Bdy al-c"    >'+W.T.SVG('place',24,'#f1f5fc')+' </a></div><div class="di-td w-100-010 vl-t"><div class="block _Bdy"> <a href="javascript:void(0);" class="block btn"  kk-click="this.findlocation()" >{{this.locationName()}}</a></div></div><div class="di-td  vl-t"><div class="block _Bdy"> <a href="javascript:void(0);" class="block btn btn-xs"  kk-click="this.LocationRemove()"  >'+W.T.SVG('cross',14,'#f1f5fc')+' </a></div></div></div></div>'

+'</div></div>'
+'</div></form>';





var body='<div class="block " ><div class="block _bdy" data-nodeid="searchwrap" ></div></div>';


    


   
  var search;

  if(W.I.wf=="mob"){
    search= W.T.wrap(header, body,null,'');  
  }
   if(W.I.wf=="web"){
    search=W.T.ColumnWrapXXX(['', W.T.wrapForModal(header,body,'',true), ''],['w-x-6','w-x-12','w-x-6']);
  
  }
    return search;
},
     Wrap:function(name){
       var ch='<div class="block" data-nodeid="searchinnerWrap'+name+'" >'
       +'<div></div>'
       +'<div></div>'
       +'<div></div>'
       +'</div>';
       
    
          return ch;  
     },
     store:function(x){
         var ch='';
           for(var q in x){
               ch += W.T.C.C2_EntityCard(x[q]);  
            }

           
         return ch;
     },
     product:function(x,bypass){
         var ch='';
          for(var q in x ){
if( typeof x[q].pvL[0]!='undefined'){
    var setting={};
  setting={addButtonbuyer:false,hasShortListed:false,forceNormalLoad:true}; 
 ch+='<div class="block grid_gap bg_0" >'+W.T.C.C2_Prductcard(x[q],setting)+'</div>'; 
 }
    }

         


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
     market:function(x,bypass){
        var  ch='',link=[],LocationName;
        for(var q in x){

  LocationName=x[q].location.name+' '+x[q].state.name+' '+x[q].country.name;
     link.push({ItemType:'link',ItemData:{href:'market?id='+x[q].location.id,text:LocationName,icon:'place',attrStr:' '} }); 
    
 } 

     ch=W.U.CreateList(link);


     
     return ch;
     },
     category:function(x){
           var ch = ''; 
           if(W.U.count(x)>0){
              for(var q in x){
              ch+=S.storeCard(x[q]);   
            }   
           }else{
                ch= W.T.RNF_banner();
           }
          
         
    
            return ch; 
        
         },
storeCard:function(cdata){
         var URL=W.U.URL;

 var TranseData={
          
                ifo: { Afiatr: {}, Cfiatr: {}, Mfiatr: {},Sort:'',cid: cdata.cid},
                 name:'categoryListing'
            };

var Template= function(x){
     var ch = '';
      ch+='<div class="block  bg_0 bs-1" style="height: 350px;" >'+W.T.C.C2_Prductcard(x)+'</div>'; 
 return ch; 
}
   var autoUpdatelistData={
          
               name:'categoryListing',
               Template:Template,
               Pagingblock:function(){ return '<div class="block _bdy m_b5 m_t10"><div class="block " style="height: 250px;" ></div><a href="javascript:void(0);" class="btn   btn-block" data-paging="paging"  >Load More</a></div>';}
            };
  var setting={
      autoUpdatelistData:autoUpdatelistData,
      TranseData:TranseData,
      type:'autoupdate_list',
       name:'Whirlgig_category_'+cdata.cid,
       itemWidth:100,
       itemResponsive : false,
       control : true,
       pagination : false,
 controlTemplatebtn : ['<a class="left slider-control-btn " href="javascript:void(0);" role="button" > <span  class="icon-prev" aria-hidden="true">'+W.T.SVG('backarrow',16,'#fff')+'</span>  </a>', '<a class="right slider-control-btn" href="javascript:void(0);" role="button" > <span class="icon-next"  aria-hidden="true">'+W.T.SVG('nextarrow',16,'#fff')+'</span>  </a>'],
      cssClass:{0:'bg_0 fg_4',1:'',2:''}
  };



var Jid=W.U.J(function(){    W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();  },setting);


       var ch='<div class="block  m_b10 "><div class="block bs-1"><div class="block _bdy bg_7"><a class="block " href="'+URL('')+cdata.slug+'"> <span class="fw-b">'+cdata.cN+'</span> </a></div><div class="block bg_0"><div data-junction="'+Jid+'"></div></div></div></div>';
       return ch;  
    },
     paging:function(tab){
        var ch='';
        ch+='<div class="block _bdy m_b5 m_t10"><button type="button" class="btn   btn-block" data-paging="'+tab+'" >Load More</button></div>';
        return ch;

    }   
   };


/*
*/


W.T.Search=S;

})(wowrol);