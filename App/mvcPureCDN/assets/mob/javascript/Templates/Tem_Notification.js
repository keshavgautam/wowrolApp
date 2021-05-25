/*
* 
*/
; (function(W){
   "use strict";


function MakeDateGroup(x){
var groupDate='';var NotiDate='';
var ret=[];var i=0;

  for(var i=0,q=0;q<x.length;q++){
      NotiDate=x[q].daydate;   ret[i]={};
    x[q].rowType=ret[i].rowType=0;
   
      if(groupDate!=NotiDate){
         ret[i].rowType=1;  
         groupDate=NotiDate;

      }
      if(ret[i].rowType==1){
        ret[i].daydate=groupDate;     i++;
      }
       ret[i]=x[q];  
    i++;
    }
    return ret;
}

var t={
t0:function(x){
    var ch='';
  if(x.length>0){
    ch+=t.t00(MakeDateGroup(x));  
  }else{
         ch+='<div class="block _bdy al-c fw-b bg_0 _B-gray">You have not any notification. </div>';  
  }
        
    return ch;
},
t00:function(x){
    var ch='<div class="block ul hover bg_0">';
 
  for (var q in x) {

     if(x[q].rowType==0){
          var moredata=[];
       moredata.push('<span class="span fg_4 ff_2 fs11"> '+W.U.DateDay(x[q].time)+'</span>');           
     moredata.push('<br><span class="span fg_4 ff_2 fs12">  '+x[q].msg+'</span>');     
          
          
               
var card=W.T.C.C2_EntityStrip(x[q].ESd,{link:false,moredata:moredata});

 ch += '<div class="li _B-gray _bdy" ><a href="'+x[q].link+'" class="block"   >' + card + '</a></div>';   
     }else{
      ch += '<div class="li _B-gray " ><div class="block  al-c"><span class="di-ib _bdy bg_5 fg_4 ff_1">'+W.U.DateDay(x[q].daydate)+'</span></div></div>';       
     }
 
       
                }  
ch+='</div>';
    return ch;
}    

};



var S={
 
 heading:function(ActiveTab){
        var ch='';
        var Name='';
      
   ch+='<div class="block bg_0 b_gll b_grl b_gtl"><div class="block _bdy al-c fw-b">Notification</div></div>';
        return ch;

    } ,  
Layout:function(){
  var ch='';
 ch+='<div class="block"><div class="block"  ></div><div class="block" data-nodeid="NotificationViewerWrap" ><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div></div></div>';
  return ch;  
},
Loading:'<div class="block  sr-bgC _bdy m_b5 al-c">'+ W.U.loading_svg(40,40)+'</div>',
paging:function(tab){
        var ch='';
        ch+='<div class="block _bdy m_b5 m_t10"><button type="button" class="btn   btn-block" data-paging="'+tab+'" >Load More</button></div>';
        return ch;

    }, 
t:t
};


 W.T.Notifications = S;

})(wowrol);