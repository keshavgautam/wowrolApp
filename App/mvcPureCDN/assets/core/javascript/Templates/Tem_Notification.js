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
         ch+='<div class="block _bdy al-c fw-b bg_0 _B-gray">help_20</div>';  
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

 ch += '<div class="li bs-1 _bdy" ><a href="'+x[q].link+'" class="block"   >' + card + '</a></div>';   
     }else{
      ch += '<div class="li bs-1 " ><div class="block  al-c"><span class="di-ib _bdy bg_5 fg_4 ff_1">'+W.U.DateDay(x[q].daydate)+'</span></div></div>';       
     }
 
       
                }  
ch+='</div>';
    return ch;
}    

};


function Layout(){


    var JId=W.U.J(function(){
           var PagingData=   W.U.Notifications.PagingData;

   PagingData.Node=  this.Node;     
   W.U.paging.init(PagingData);
    },{});


    var ch='<div class="block">';
  ch+='<div class="block _Bdy bg_6 bs-1-bottom "><h3>notifications</h3></div>';
    ch+='<div class="block" data-junction="'+JId+'"></div>';

    ch+='</div>';
    return ch;
}


 W.T.Notifications = {
  Layout:Layout,
  t:t   
 };
   })(wowrol);