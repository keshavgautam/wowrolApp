/*
* 
*/
; (function(W){
   "use strict";
     

W.T.CheckinMembers=(function(){

var t={
fixMember:function(x){
    var ch='<div class="block  ul bg_0 _B-gray">';
    ch+='<div class="block li bg_7 _bdy al-c"><span class="fw-b ">Store</span></div>';
    ch+='<div class="block li  _bdy">'+t.entitystrip(x.Ed[0],x.role)+'</div>';
    ch+='<div class="block li bg_7 _bdy al-c"><span class="fw-b ">Buyer</span></div>';
     ch+='<div class="block li  _bdy">'+t.entitystrip(x.Ed[1],x.role)+'</div>';

    ch+='</div>';


    return ch;
},
friendsMember:function(x){
    var ch='<div class="block  ul bg_0 _B-gray">';
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
 ch+='<div class="block li  _bdy">'+t.entitystrip(x.Ed[i],x.role)+'</div>';    
    }
   
    }

    ch+='</div>';


    return ch;
},
entitystrip:function(x,role){

if(role!=0&&role!=1){

}else{
    
}
var ch='<div class="block " data-collapse="checkinmember" ><div class="block "><div class="w10">'+W.T.C.C2_EntityStrip(x,{})+'</div><div class="w2"> <div class="right"> <a href="javascript:void(0);" class="btn btn-link btn-xs"  data-collapsebtn="checkinmember">' + W.T.SVG('menuHori', 18, '#1274c0') + ' </a> </div></div></div>';
ch+='<div class="block "  data-collapseblock="checkinmember" style="display:none;"> <div class="block _bdy"> <div class="right"><div class="btn-group" role="group"><a href="javascript:void(0);" class="btn btn-link" data-spreaddelete="67:r">Remove</a></div></div></div></div>';
ch+='</div>';


 return ch;
 
}   
 
};

 
 function ContentMembers(SBData){

 var URL=W.U.URL;
  var mid =  '<div class="block   " data-nodeid="checkinmembercon" >';
   mid +='<div class="block "></div>';
   mid +='<div class="block" ></div>';
   mid +='<div class="block" ></div>';
   mid +='<div class="block" ></div>';
   mid +='</div>';

     var foot = '';
    var header= W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="checkin" >'+W.T.SVG('checkIn',24,'#f1f5fc')+'</a>',
    Title:'<a href="/" class="left"><span class="title" >Checkin Members</span><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    });
 

  return  W.T.wrap(header,mid,foot);
 }  
  
    
return {
ContentMembers:ContentMembers,
t:t
};
})();

 


})(wowrol);