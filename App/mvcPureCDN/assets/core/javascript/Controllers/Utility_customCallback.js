/*
*ccbk=customcallback
* 
*/
/*
* @reserved name
*  updater ccbk => updateView
*
*/
; (function(W){
   "use strict";
     var Bank= [];
   //   W.U.ccbk.Add('pageloaded' );
 function Add(){
// W.U.console(  arguments);

 var uId=W.U.uId();

 if(arguments.length==3){
     var Node=arguments[0],
     Name=arguments[1],
     callback=arguments[2];
 }
  if(arguments.length==2){
         var  Node=W.U.Page,
     Name=arguments[0],
     callback=arguments[1];
 }
 // Setting Node ccbkId Property arr
 if( typeof(Node['ccbkId'])=='undefined'||typeof(Node['ccbkId'])==null){
     Node['ccbkId']=[];
   
 }
 //--

    var FullEventName=Name+'-'+uId
       Node['ccbkId'].push(FullEventName);
 //--

  if(arguments.length>=2){

      Bank[uId]=callback;  
     

 }
 //W.U.console(arguments); W.U.console(Bank);
  return uId;
 }

  
 //   W.U.ccbk.Run('pageloaded' );
 function Run(){
   //W.U.console(arguments); W.U.console(Bank);
      if(arguments.length==3){
     var  Node=arguments[0],
     Name=arguments[1],
     data=arguments[2];
 }
 if(arguments.length==2){
     var  Node=arguments[0],
     Name=arguments[1],
     data={};
 }
 
 if(arguments.length==1){
     var  Node=W.U.Page,
     Name=arguments[0],
     data={};
 }
 if(typeof(Node)!='undefined'&&Node!=null){
   if( typeof(Node['ccbkId'])!='undefined'&&typeof(Node['ccbkId'])!=null){
 
      var ccbkList= Node['ccbkId'];

      for(var q in ccbkList){
           var Datastr=(ccbkList[q]).split("-"); 
          // W.U.console(Datastr);
           if(Datastr[0]==Name){
              
             var  uId= Datastr[1];
              if(typeof  Bank[uId] != 'undefined'){
                        Bank[uId].call(this,data);
              }

           }
      }
   

   
 }   
 }else{
     console.warn('Node is Not defined for '+Name);
 }

 

/* 
 if(typeof  Bank[Name] != 'undefined'){
         // W.U.console(Bank[Name]);
             if(W.U.isArray(Bank[Name])){
                 var List=Bank[Name];
        var len =List.length, index = 0;

            for (; index < len; index++) {
      
             List[index].call(this);
            }
          
             }
         }

*/

       

   }



//W.U.ccbk.Clear('pageloaded' );
function Clear(){
  
     if(arguments.length==2){
     var  Node=arguments[0],
     Name=arguments[1],
     data={};
 }
 
 if(arguments.length==1){
     var  Node=W.U.Page,
     Name=arguments[0],
     data={};
 }


   if(W.U.isOK(Node['ccbkId'])){
 
      var ccbkList= Node['ccbkId'];

      for(var q in ccbkList){
           var Datastr=(ccbkList[q]).split("-"); 
         
           if(Datastr[0]==Name){
              
             var  uId= Datastr[1];
              if(typeof  Bank[uId] != 'undefined'){
                      delete(Bank[uId]);
              }

           }
      }
   

   
 }
}
//W.U.ccbk.Clear('pageloaded',function(){} );
function ClearOnly(){
  
     if(arguments.length==3){
     var  Node=arguments[0],
     Name=arguments[1],
    callback_id=arguments[2];
 }
 
 if(arguments.length==2){
     var  Node=W.U.Page,
     Name=arguments[0],
  callback_id=arguments[1];
 }

  if(arguments.length>=2){
      if(W.U.isOK(Node)){
         if(W.U.isOK(Node['ccbkId'])){
 
      var ccbkList= Node['ccbkId'];

      for(var q in ccbkList){
         var Datastr=(ccbkList[q]).split("-"); 
           if(Datastr[0]==Name){
              
             var  uId= Datastr[1];
              if(W.U.isOK(Bank[uId])){
        //       W.U.console((uId ==  callback_id));
    // W.U.console((uId+'=='+  callback_id));
                  if(uId ==  callback_id){
                      delete(Bank[uId]);  
                  }
                    
              }

           }
      }
   

   
 }
 }
 }
}

   W.U.ccbk={
    ClearOnly:  ClearOnly,
     Clear:Clear,
     Add:Add,
     Run:Run
   }
  

})(wowrol);
/* CLEARING CALBACK

W.U.ccbk.ClearOnly(W.U.Page,'locallocationbycountrySelect',  W.U.intentdata.get('ccbkid.shippinglocationselect'));


W.U.intentdata.add('ccbkid.shippinglocationselect',W.U.ccbk.Add(W.U.Page,'locallocationbycountrySelect',function(data){
      W.U.console('callback receved');
        W.U.console(data);
  }));

*/