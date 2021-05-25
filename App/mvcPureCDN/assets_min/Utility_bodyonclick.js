/*
* 
*/

; (function(W){
   "use strict";
   var List= [];


   function Add(x){
        var getType = {};
          
            if (x && getType.toString.call(x) === '[object Function]') {

            List.push(x);
            } 
   }


   function Run(e){
          var len =List.length,
    index = 0;

            for (; index < len; index++) {
      
             List[index].call(this,e);
            }
      
   }

   
 var TimeoutId=0;

W.U.Page.onclick=Run;
 

   W.U.bodyonclick={
      Add:Add,
      List:List,
      Run:Run
       
   };

 


})(wowrol);
; (function(W){
   "use strict";
   var List= [];


   function Add(x){
        var getType = {};
          
            if (x && getType.toString.call(x) === '[object Function]') {

            List.push(x);
            } 
   }


   function Run(x){
          var len =List.length,
    index = 0;

            for (; index < len; index++) {
      
             List[index].call(this,x);
            }

   }

   

   var timeoutID = '';
 window.onresize=function(){
     if(timeoutID!=''){
         clearTimeout(timeoutID);
     }
  //  timeoutID= setTimeout(Run,1);
  Run();
 };


   W.U.windowresize={
      Add:Add,
      List:List,
      Run:Run
       
   };

 


})(wowrol);

// Data Toggle function applying
 (function(W){
   "use strict";
  
   function toggle(Node,Name){

       switch(Name){
         case 'dropdown':
         W.U.DropDown(Node,{});
         break;  
   case 'title':
         W.U.DropDown(Node,{type:'title', trigger: 'hover'});
         break; 
        case 'dropdownUP'://fileupload select button
         W.U.DropDown(Node,{placement:'top',height:135});
         break;   
         case 'checkbox':
         W.U.checkbox(Node);
         break;
          case 'radio':
         W.U.radio(Node);
         break;
         case 'selectmodify':
         W.U.selectmodify(Node);
         break;
      
       }

   }

   W.U.toggle=toggle;


})(wowrol);


 ;(function(W){
   "use strict";
   /*
   @structure 
   bank[(objectname).(objectId)]={[data]}
   @ abbr of different objects  ref to db
             'shippingclass'=>'spg',
             'dashboard_categories'=>'dc',
             'storecollection'=>'sco',
             'storeprodcut'=>'sp',
             'storespecification'=>'spf',
             'storeorder'=>'so',
             'storeprodcutvarient'=>'spv',
             'spread'=>'s',
             'spreadcomment'=>'scmt',
              'learnmore'=>'learnmore',
              'store browsering data'=>'SBdata',
            'suggestion'=>'suggestion',
              'customcallbackreferenveId'=>'ccbkid',
                'message'=>'message',
'entitycarddata'=>'entitycarddata',
            'updater'=>'updater',
   */
  var bank={};
 function Add(Name,data){
     bank[Name]=data; 
  

 }

 function AddP(Name,data){
     var id=W.U.uId();
     $('#newdom').append('<div class="hide" id="'+id+'">'+JSON.stringify(data)+'</div>')
     bank[Name]=JSON.parse( $('#'+id).html());
 // $('#'+id).remove();

 }
 function Get(Name){
          var data=null;
//W.U.console(bank);
  if(W.U.isOK(bank[Name])){
     data=  bank[Name] ;
  }


  return data;
 }

 function remove(Name){
       if(W.U.isOK(bank[Name])){
     delete( bank[Name]) ;
  }
 }
/*
@ W.U.intentdata.getIntentName()
*/
 function getIntentName(AppId){

     var list={
           'shippingclass':'spg',
             'dashboard_categories':'dc',
             'storecollection':'sco',
             'storeprodcut':'sp',
             'storespecification':'spf',
             'storeorder':'so',
             'storeprodcutvarient':'spv',
             'spread':'s',
             'spreadcomment':'scmt',
              'learnmore':'learnmore',
              'store browsering data':'SBdata',
            'suggestion':'suggestion',
              'customcallbackreferenveId':'ccbkid',
                'message':'message',
'entitycarddata':'entitycarddata',
            'updater':'updater'  
     };
     var intentName=W.U.isOK(list[AppId])?list[AppId]:AppId;


     return intentName;
 }



 // intentdata is live store for different objects
 // it hold unique value for every objectId in every object
 // this unique value  must be store before block page randering  
 W.U.intentdata={
     bank:bank,
      add:Add,
      AddP:AddP,
      get:Get,
      getIntentName:getIntentName,
      remove:remove
       
   };

})(wowrol);