/*
* 
*/
; (function(W){
   "use strict";
var t={
t0:function(x){
    var ch='';
  if(x.length>0){
    ch+=t.t00(x);  
  }else{
         ch+='<div class="block _bdy al-c fw-b bg_0 _B-gray">You have not any notification. </div>';  
  }
        
    return ch;
},
t00:function(x){
    var ch='<div class="block ul hover bg_0">';
  for (var q in x) {
     var moredata=[];
       moredata.push('<span class="span fg_4 ff_2"> <time class="timeago" datetime="'+x[q].time+'" title="'+x[q].time+'"></time> </span>');           
     moredata.push('<br><span class="span fg_4 ff_2 fs12">  '+x[q].msg+'</span>');     
          
          
               
var card=W.T.C.C2_EntityStrip(x[q].ESd,{link:false,moredata:moredata});

 ch += '<div class="li _B-gray _bdy" ><a href="'+x[q].link+'" class="block"   >' + card + '</a></div>';
       
                }  
ch+='</div>';
    return ch;
}    

};



var S={
 
 heading:function(ActiveTab){
        var ch='';
        var Name='';
      
   ch+='<div class="block bg_0 b_gll b_grl"><div class="block _bdy al-c fw-b">Notification</div></div>';
        return ch;

    } ,  
Layout:function(){
  var ch='';
 ch+='<div class="block"><div class="block" data-junction="notificationtab" ></div><div class="block" data-nodeid="NotificationViewerWrap" ><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div></div></div>';
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