/*
* 
*/
; (function(W){
   "use strict";

//--header
function storeheader(SBData){
    var ch='';
    var space='<div class="di-td "><span class="hidden">sd</span></div >';
    var buttonClass=(W.I.wf=='mob')?'header-link-btn':'header-cell';

var backbutton='<div class="di-td  vl-t "><a href="javascript:void(0);" class="block '+buttonClass+'" data-closebtn="mainpage" data-pagerbtn="mainpage:blockFront" >'+W.T.SVG('left',24,'#f1f5fc')+'</a></div >';




var y=W.U.Browsing.CheckInDescrition(SBData);

   var title='<div class="di-td vl-t   w212 "><div class=" block header-cell"><span >Members of checkin</span></div></div >';
   var avatar='<div class="di-td _bdy">  <a href="javascript:void(0);"> <img class=" round x35" alt="64x64" src="'+y.avatar+'"  > </a></div>';
   if(W.I.wf=='mob'){
     ch+='<div class="block bg_1 fg_6">'  ;
    ch+=backbutton;
  
    ch+=title;
     ch+='</div >' ;
   }
   if(W.I.wf=='web'){
     ch+='<div class="block bs-1 bg_0">'  ;
   
   ch+=title;
  ch+=space;
     ch+='</div >' ; 
   }

return ch;
}
    var t={
fixMember:function(x){
    var ch='<div class="block  ul bg_0 bs-1">';
    ch+='<div class="block li bg_7 _bdy al-c"><span class="fw-b ">Store</span></div>';
    ch+='<div class="block li  ">'+t.entitystrip(x.Ed[0],x.role,0)+'</div>';
    ch+='<div class="block li bg_7 _bdy al-c"><span class="fw-b ">Buyer</span></div>';
     ch+='<div class="block li  ">'+t.entitystrip(x.Ed[1],x.role,1)+'</div>';

    ch+='</div>';


    return ch;
},
friendsMember:function(x){
    var ch='<div class="block  ul bg_0 bs-1">';
    ch+='<div class="block li bg_7 _bdy al-c"><span class="fw-b ">Buyer Friends</span></div>';
      if(x.role==1){
     var token = ''; var suggestion = {
                    name: 'buyerfriend',
                    fireAfter: 4,
                    type: '1',
                    token: 'chips',
                    placeholder: 'Friend Name',
                    hover: false
                };
   if(x.Ed.length>2){
        
   for(var i=2;i<x.Ed.length;i++){
 token+='<div class="li hide"><div class="token"> <span>   rohit @rohit  </span> <span class="sclose s_tclose" data-suggestionclose="{}"></span> <input class="tokenh_input" type="hidden" name="buyerfriend" value="{&quot;id&quot;:&quot;'+x.Ed[i].eid+'&quot;}"> </div></div>';    
    }
   
    }
  
          ch += '<div class="block li  _bdy"><div class="form-piece"> <label class="block al-c _bdy fw-b">Add Your friend</label> <div class="form-token block" data-junction="spreadfrombuyerfriend" > <div class="block bd"><div class="block ul ul-menu">' + token + '<div class="li"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.placeholder + '"  autocomplete="off"   ></div></div><div class="block d po-ab collapse in"> </div></div></div></div></div> ';   
    }

    
  

 

    if(x.Ed.length>2){
        
   for(var i=2;i<x.Ed.length;i++){
 ch+='<div class="block li  ">'+t.entitystrip(x.Ed[i],x.role,i)+'</div>';    
    }
   
    }

    ch+='</div>';


    return ch;
},
entitystrip:function(x,role,index){
var linkblock='';
var btncss='hide';

if((role>1)&&index>1&&(index==role)){
linkblock='<div class="block _bdy bs-0"> <div class="right"><div class="btn-group" role="group"><a href="javascript:void(0);" class="btn btn-link" data-btnremovemember="'+index+'"  >Leave </a></div></div></div>';
 btncss='';
}

if(role==1&&index>1){
linkblock='<div class="block _bdy bs-0"> <div class="right"><div class="btn-group" role="group"><a href="javascript:void(0);" class="btn btn-link" data-btnremovemember="'+index+'" >Remove</a></div></div></div>';
 btncss='';
}


var ch='<div class="block " data-collapse="checkinmember" ><div class="block m_b5 b_gtl"><div class="w10 _bdy">'+W.T.C.C2_EntityStrip(x,{})+'</div><div class="w2"> <div class="right '+btncss+'"> <a href="javascript:void(0);" class="btn btn-link btn-xs"  data-collapsebtn="checkinmember">' + W.T.SVG('menuHori', 18, '#1274c0') + ' </a> </div></div></div>';
ch+='<div class="block "  data-collapseblock="checkinmember" style="display:none;"> '+linkblock+'</div>';
ch+='</div>';


 return ch;
 
} 
}; 


function Layout(block){
 var header='',mid='',foot='',ch='';
 var SBData=block.objectdata,margintop=0;  
   header=storeheader(SBData);

 //mid+='<div class="block"  data-nodeid="checkinPlatformMenu'+SBData.checkIn_id+'"></div>';
 mid+='<div class="block"  data-nodeid="checkinPlatformMembersWalkway'+SBData.checkIn_id+'"><div ></div><div ></div><div ></div><div ></div></div>';

  switch(W.I.initType){
     case 0:
     
ch+='<div class="block  bs-1"   >'+W.T.BottomFixWrap(header,mid,foot,'checkinPlatforShortList'+SBData.checkIn_id,margintop)+'</div>'; 
     break;  
     case 1:
  ch+='<div class="block  bs-1"   >'+W.T.BottomFixWrap(header,mid,foot,'checkinPlatformShortList'+SBData.checkIn_id,margintop)+'</div>';    
     break; 
     case 2:
  if(W.I.wf=='web'){margintop=58; }
ch+='<div class="block  bs-1"   >'+W.T.BottomFixWrap(header,mid,foot,'checkinPlatformShortList'+SBData.checkIn_id,margintop)+'</div>'; 
     break;
     case 3:
     
     break;       
   }


    return  ch; 
}
 
W.T.CheckinMembers= {
    Layout:Layout,  
    t:t
};

})(wowrol);