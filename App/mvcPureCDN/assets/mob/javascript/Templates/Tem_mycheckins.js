/*
* 
*/
; (function(W){
   "use strict";

   var t ={
    Layout:function( ){
        var ch='<div class="block"  ><div class="block" data-junction="mycheckintab" ></div><div class="block" data-nodeid="mycheckinwalkwayMain" ><div class="block"  ></div><div class="block"  ></div><div class="block"  ></div><div class="block"  ></div></div></div>';


        return ch;
    },  
    heading:function(ActiveTab){
        var ch='';
        var Name='';
        switch(ActiveTab){
         case 0:
         Name='CheckIn of you';
         break;
        case 1:
         Name='CheckIn of friends';
         break; 
         case 2:
          Name='Archive checkins';
         break;      
        }
   ch+='<div class="block bg_0 b_gll b_grl"><div class="block _bdy al-c fw-b">'+Name+'</div></div>';
        return ch;

    } ,  
    TabView:function(x,ActiveTab){
         var URL=W.U.URL;


   var checkinNav='<div class="block"><nav class="block ul hover bg_0  ">';
  for(var i=0;i<x.length;i++){
    checkinNav+='<div class="li _B-gray _bdy"><a class="block " href="'+URL('checkins')+'?id='+x[i].checkIn_id+'"    > <span class="fw-b ">Checkin of '+x[i].Ed[1].entityName+' at '+x[i].Ed[0].entityName+' :</span> <span class="vl-sp right">'+W.T.SVG('nextarrow',18,'#1274c0')+'</span></a><span class="di-in  fg_4 fs-italic fs11"></span></div>'; 

  


  }
   
  checkinNav+='</nav></div>';
  return checkinNav;
    },
    paging:function(ActiveTab){
        var ch='';
        ch+='<div class="block _bdy m_b5 m_t10"><button type="button" class="btn   btn-block" data-paging="'+ActiveTab+'" >Load More</button></div>';
        return ch;

    } 

   };
   


     W.T.mycheckins = {t:t};
})(wowrol);