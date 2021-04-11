 ;(function (W) {
     "use strict";





var t={
    t0:function(x){
  var ch= '<div class="block" data-nodeid="storecheckinListwalkway"><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div></div>';  
 return ch;

    },
    btn:function(x,name){
   var ch='';
   switch(x.mode){
    case 2:   
    ch= '<span>Self Store Browsing.</span><span class="hide" data-openbtn="'+name+'" data-btnid="CheckInList"></span>';
    break;
    case 3:   
    ch= '<span>Login required to checkin.</span><span class="hide" data-openbtn="'+name+'" data-btnid="CheckInList"></span>';
    break;
      case 4:   
    ch= '<span>Other Store Browsing.</span><span class="hide" data-openbtn="'+name+'" data-btnid="CheckInList"></span>';
    break;
    default:
    ch= '<button type="button" class="btn btn-primary btn-xs"    class="btn _fbtn btn-xs " data-openbtn="'+name+'" data-btnid="CheckInList" data-junction="initcheckinList" ><span>Check-In</span><span></span></button>';
      W.U.JunctionAdd(W.A.page.AppId, 'initcheckinList', function () {

      this.Node.onclick =W.U.StoreCheckInList.checkInListShown;
                    },{});
   }
   
    
        return ch;

    },
    list:function(x){
         var URL=W.U.URL;
   var checkinNav='<div class="block"><nav class="block ul hover bg_0 bs-2dp "><div class="li b_gll b_grl _Bdy"></div>';
  for(var i=0;i<x.length;i++){
    checkinNav+='<div class="li _B-gray _bdy"><a class="block " href="'+URL('checkins')+'?id='+x[i].checkIn_id+'"    > <span class="fw-b ">Checkin of '+x[i].Ed[1].entityName+' at '+x[i].Ed[0].entityName+' :</span> <span class="vl-sp right">'+W.T.SVG('nextarrow',18,'#1274c0')+'</span></a><span class="di-in  fg_4 fs-italic fs11"></span></div>'; 

  


  }
   
  checkinNav+='</nav></div>';
  return checkinNav;
    }


};



  


W.T.StoreCheckInList=t;
 })(wowrol);