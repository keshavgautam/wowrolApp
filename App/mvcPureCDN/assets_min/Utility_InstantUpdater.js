; (function(W){
   "use strict";
/* 
@des used in   AddEventInUpdater
@call 
*/

function EventUniquePush(eventlist,event){
    var onematch=0;
    for( var q in eventlist){
        if(eventlist[q].type==event.type){
            onematch=1; 
        }
    }
   
    if( onematch==0){
       eventlist.push(event); 
    }
    return eventlist;
}






/*
* 
* @call W.U.IU.EditObjectPropertyInUpdater(rail,name,data);
*/
function EditObjectPropertyInUpdater(rail,data){

  var _this= W.U.intentdata.get('rail.'+rail);  
 

      if(W.U.isOK(_this)){
    
       

      for(var q in _this.gl){
          var _thisgl=_this.gl[q];
          switch(_thisgl.data.name){
   case 'convarstionlist':
           case 'convarstionlistevent':
        if(_thisgl.data.init.cid==data.cid){
       W.U.extend( _thisgl.data.init,data);

          } 
           break;   
          }

       
      }

   
 


                  }




}





/*
* 
* @call W.U.IU.AddEventInUpdater(rail,name,data);
*/
function AddEventInUpdater(rail,data){
    if(W.U.isInteger(rail)){
          var _this= W.U.intentdata.get('rail.eventIU'+rail); 
    }else{
      
          var _this= W.U.intentdata.get('rail.'+rail);  
    }
 

      if(W.U.isOK(_this)){
    
       

      for(var q in _this.gl){
          var _thisgl=_this.gl[q];
          switch(_thisgl.data.name){
   case 'convarstionlist':
           case 'convarstionlistevent':
        if(_thisgl.data.init.cid==data.cid){
           if(W.U.isOK(_thisgl.data.init.event)){
        
          _thisgl.data.init.event=  EventUniquePush( _thisgl.data.init.event,data.event);  
           }   
          } 
           break;   
          }

       
      }

          if(W.U.isInteger(rail)){     W.U.Updater.FireManuallyRail('eventIU'+rail);}
 


                  }




}



/*
* @des   we need to add object in to instant updater
* @call  W.U.IU.AddObjectIninstantUpdaterRail()
* @param [objData]  {mixed object} any object data 
*/
function  AddObjectIninstantUpdaterRail(iuc,sendedArgs){
       

     W.U.Updater.AddInRail('IU'+iuc,sendedArgs);
 




      
}

/*
* @des   we need to add object in to instant updater
* @call  W.U.IU.AddObjectIninstantUpdaterRail()
* @param [objData]  {mixed object} any object data 
*/
function  AddObjectIninstantUpdaterEventRail(iuc,sendedArgs){
    
  sendedArgs.data.name=sendedArgs.data.name+'event';
     W.U.Updater.AddInRail('eventIU'+iuc,sendedArgs);
  var ____this= W.U.intentdata.get('rail.eventIU'+iuc);

}





/*
*@call W.U.IU.setRail();
*/
function  setRail(){
    var allserver=W.C.Setting.UpdaterURL;
    for(var q in allserver){
     W.U.Updater.CreteRail({ name:'IU'+q,time:1000,url:allserver[q]});//W.A.page.refresh  
     W.U.Updater.CreteRail({ name:'eventIU'+q,time:1000,url:allserver[q],
        isautomatic:false});//W.A.page.refresh      


          W.U.ccbk.Add('viewloaded',function(){   W.U.Updater.DeleteRail('IU'+q) ;  W.U.Updater.DeleteRail('eventIU'+q) ; });
    }
   
    
}




/*
*/
function HeaderRefresh(){
   var _this=this; 
   var svg =$(this).find('svg');
   svg.addClass('spin');
   W.U.Updater.FireManuallyRail('activityIU');

   setTimeout(function(){
     svg.removeClass('spin'); 

   },3000);
}


   W.U.IU={
      setRail: setRail,
      AddEventInUpdater:AddEventInUpdater,
      AddObjectIninstantUpdaterRail:AddObjectIninstantUpdaterRail,
      AddObjectIninstantUpdaterEventRail:AddObjectIninstantUpdaterEventRail,
      HeaderRefresh:HeaderRefresh

   };




    W.U.ccbk.Add('beforepageloaded',function(){
        //W.I.entity_id;
   
 // W.U.Updater.CreteRail({ name:'activityIU',time:W.A.page.refresh,url:W.C.Setting.ActivityUpdaterURL[W.C.Setting.ausc]}); 
  W.U.Updater.CreteRail({ name:'activityIU',time:(W.A.page.refresh*10)}); 
   



    W.U.Junction('refresh',function(){
   
    this.Node.onclick=HeaderRefresh;
},{});




    });

     W.U.ccbk.Add('pageloaded',function(){    setTimeout(function(){W.U.Updater.FireManuallyRail('activityIU');  },100)});

   })(wowrol);