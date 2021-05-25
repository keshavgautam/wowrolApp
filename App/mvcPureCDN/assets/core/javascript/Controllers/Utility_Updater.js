/*

*/
; (function(W){
   "use strict";
 var time=W.A.page.refresh;

 /*
   data-updater="1474905674CF7OS:onsended"
    data-updater="[update_id]:[update_class]:[ccbk callback]:[railname]"

 @spilited args
     1 - update_id   => link to  data asssosiate with this update id. this is an intent name of data intent
     2 - update_class =>gives information how this data will update and template function
     3 - ccbk callback name 
     4 -  the name of rail on which this data ask to update
 */


 /*
 @param   { name:'main',time:time,}
 @ call     W.U.Updater.CreteRail()
 */
 function CreteRail(x){
     function Handler(data){
         data = W.U.extend( Handlerdefaults(), data);
         this.name=data.name;
          this.isautomatic=data.isautomatic;
         this.time=data.time;
         this.url=data.url;
         this.gl=[];
        this.pageInitID = W.I.pageInitID;
    if(this.isautomatic){
      this.InterVal_id= setInterval(this.init.bind(this),this.time); 
      }
  
 W.U.intentdata.add('rail.'+this.name,this);
     }

   function  Handlerdefaults(){
       var data={
        name:'main',
        time:100000000000000000,
        url:W.U.URL('') + 'ajax/f0/p0',
        isautomatic:true

    };

    return W.U.clone(data);

   };  
  Handler.prototype.init=function(){
      var _this=this;  var payload = [], list_id = [],p=0;
      //W.U.console('rail is running');

      //W.U.console( this.gl);
      
       for(var q in this.gl){
      if(W.U.IselementInViewport(this.gl[q].Node)||this.gl[q].essential){
      payload.push(this.gl[q].data); 
      list_id[p]=q;p++;
    }  
       }
W.U.ccbk.Run('beforeload_'+ _this.name ); 
   //debugger;
   //W.U.console( payload);
   if(payload.length>0){
     var loadingId= W.F.Load('glRail',JSON.stringify(payload),this.url);
     W.U.ccbk.Add('progress'+loadingId ,function(){     clearInterval(_this.InterVal_id);      });
     W.U.ccbk.Add('complete'+loadingId ,function(){       });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){      //W.U.console(data);
     
     for(var q in  list_id){
         if(W.U.isOK(data[q])&&W.U.isOK(_this.gl[list_id[q]])){
             var forIt=data[q],glOptions=_this.gl[list_id[q]];

             if(forIt['state']==200){
                 glOptions.onsucess(forIt['response'],glOptions.data,glOptions.Node);
             }
               if(forIt['state']==500){
               if(W.U.isOK(glOptions.onerror)){
             glOptions.onerror(forIt['response'],glOptions.data,glOptions.Node);
               }
             }

         }
     }
     

       if(_this.isautomatic&& _this.pageInitID== W.I.pageInitID){    _this.InterVal_id= setInterval(_this.init.bind(_this),_this.time); 
      } 

     
        });
     W.U.ccbk.Run('load'+loadingId );  
     }


     }

     



new Handler(x);

 }
 /*
 @param   {string} name  - the name of rail.
 @param   {object} sendedargs - {node :'',data:{},onsucess:W.U.noop }
 @param [sendedargs][Node]  {HTML Node} -the node id that is targeted to update over the time. 
 @param [sendedargs][data]   {object}   -  | {name:'',init:{}}
 @param [sendedargs][data][name]   {string }   - the name of update. 
 @param [sendedargs][data][init]   {object}   - any data set that is use full in update the view. 
 @param [sendedargs][onsucess]    {function}  - How the Node will updated describe here. 
 @param [sendedargs][essential]   {bool }   - is this update is required on every request. 

 @call     W.U.Updater.AddInRail(name,sendedArgs)
 @description  To update any view data . just add it in Rail as following way
   W.U.Updater.AddInRail("railname",{data:{},Node:null,onsucess:W.U.noop,essential:false});
 */
 function AddInRail(name,sendedargs){

     var defaultArgs=function(){ var data={data:{},Node:null,onsucess:W.U.noop,essential:false}; return W.U.clone(data);};
     var args=W.U.extend(defaultArgs(),sendedargs);
     var _this= W.U.intentdata.get('rail.'+name);

         if(W.U.isOK(_this)){

        _this.gl.push(W.U.clone(args));

                  }

 }
 //--
 /*
 *call W.U.Updater.FireManuallyRail(name);
 */
 function FireManuallyRail(name){
     var _this= W.U.intentdata.get('rail.'+name);

      if(W.U.isOK(_this)){
        _this.init();

                  }
 }


 //--
 /*
  @param   {string} name  - the name of rail.
  @call     W.U.Updater.DeleteRail(name)
  @description  To delete a rail
 */
 function DeleteRail(name){
   var _this= W.U.intentdata.get('rail.'+name);
   if(W.U.isOK(_this)){
 clearInterval(_this.InterVal_id); 
      W.U.intentdata.remove('rail.'+name);
      }
 }


//----------------------------------------------------
  /*
 @param   { data:{},tempate:W.U.noop,intentname:''}
 @return update id
 @ call     W.U.Updater.RagisterTask()
 */
 function RagisterTask (x){
     var uId=W.U.uId();
      W.U.intentdata.add('updater.'+uId,x);

      return uId;
 }
   /*
 * @private   This function mostaly called from  W.U.GetUpdateId('');
 @param   { data:{},tempate:W.U.noop,intentname:''}
 @return 
 @ call     W.U.Updater.UpdateView()
 */
 function UpdateView(updaterId,sendedargs){
      //W.U.console('In the update view');
  
      var defaultArgs={data:{},template:W.U.noop,scrollInView:false};
      var args=W.U.extend(defaultArgs,sendedargs);

      var ViewIntentName = W.U.intentdata.get('updater.'+updaterId);
      var data=args.data;
      var template=args.template;
        var Datastr=(ViewIntentName).split("."); 
   if(W.U.isOK(data.id)){
      var IntentName=Datastr[0]+'.'+data.id;
      data.updater_id=updaterId;
           W.U.intentdata.add(IntentName,data);
          // W.U.console(data);
      $('[data-point="'+updaterId+'"]' ).html( W.U.Rander(template(data)));    

      if(args.scrollInView){
        W.U('[data-point="'+updaterId+'"]')[0].scrollIntoView();
      }

   }
     // W.U.console(Task); W.U.console(data);
 
 }
  /*

@param {string} intentname  Any unique string in intent list.
 @return update id
 @ call     W.U.Updater.GetUpdateId()
 @description   This function return a unique id ,which can be use to update any view.for this we have to use a [data-point="-----"] attribute on element.and over the time when we have a new view than we call  W.U.ccbk.Run() with these arguments.
 W.U.ccbk.Run( W.U.Page,
 "updateName",
 {data:{},template:W.U.noop});

 @Note 1 - the data sended to update must have " id " property
       2 - when call for update, add string in intent name   like   "updateView_" +intent name ;
                   
 */
 function GetUpdateId(x){
// getting previously saved intent if any
 var uId;
       var previouslySaved = W.U.intentdata.get(x);
       if(W.U.isOK(previouslySaved)){
       if(W.U.isOK(previouslySaved.updater_id)){
           uId=previouslySaved.updater_id;     
           }else{
             uId=W.U.uId();    
           }
               
       }else{
         uId=W.U.uId();
       }

     
      W.U.intentdata.add('updater.'+uId,x);
    // W.U.console('updater.'+uId);    W.U.console('updateView_'+x);

    W.U.ccbk.Add(W.U.Page,'updateView_'+x,function(data){
      

       // W.U.console('updater.'+uId);  W.U.console(ViewIntentName);
        UpdateView(uId,data);

    }); 
    
    W.U.ccbk.Add(W.U.Page,'updateView_custom_'+x,function(data){
      

       // W.U.console('updater.'+uId);  W.U.console(ViewIntentName);
       UpdateView_custom(uId,data);

    });  
    
         
      return uId;
 }

    /*
    @
 * @des the function perform basic saving of update id and run a call back
 @param   { data:{},callback:W.U.noop,intentname:''}
 @return 
 @ call     W.U.Updater.UpdateView_custom();
 */
 function UpdateView_custom(updaterId,sendedargs){
      //W.U.console('In the update view');

      var defaultArgs={data:{},callback:W.U.noop,scrollInView:false};
      var args=W.U.extend(defaultArgs,sendedargs);

      var ViewIntentName = W.U.intentdata.get('updater.'+updaterId);
      var data=args.data;
      var callback=args.callback;
      if(W.U.isOK(ViewIntentName )){
        var Datastr=ViewIntentName.split("."); 
   if(W.U.isOK(data.id)){
      var IntentName=Datastr[0]+'.'+data.id;
      data.updater_id=updaterId;
           W.U.intentdata.add(IntentName,data);
          // W.U.console(data);
        
    callback(updaterId,data);

      if(args.scrollInView){
        W.U('[data-point="'+updaterId+'"]')[0].scrollIntoView();
      }

   }
     // W.U.console(Task); W.U.console(data);
 }
 }


 W.U.Updater={
    CreteRail: CreteRail,
    DeleteRail: DeleteRail,
    RagisterTask:RagisterTask,
    UpdateView:UpdateView,
    UpdateView_custom:UpdateView_custom,
    GetUpdateId:GetUpdateId,
    AddInRail:AddInRail ,
    FireManuallyRail:FireManuallyRail
 };
   

})(wowrol);
/*
Element  =>    view,view data,  Node Id   ,view data intent name , updater_class ,ccbk name, rail name
Known => view
 Type
 1 -paging update
 2 -node update


Required behavior
 1- we run  update[intent name]  and view update to current view data
 2- in paging paging automatical update




 /// brief
 Node update
 Required for updateing a node
 1- Node Id  
 2 -Template function 
 3- intent name of view data
 4 call to ccbk


 //--
 The Node update behavior 
 1 - Replce type node - the time node view replced by the [data-point="~~"] 
 2 - Reborn type node - the time node view first removed by the [data-point="~~"] and append or prepend in the parent view 

*/

