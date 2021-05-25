/*
* 
*/
; (function(W){
   "use strict";
   /*
   @type =>  `help`|`ad`|'profilecomplete'
   @spot_id=>  unique location of spot id
   @ doc_id =>  in case  of help the document id whick is loaded from server
    
   <div data-dynamicspotmanager="`@type`:`@spot_id`:`@doc_id`" ><div>

   
   */
//---------------------------------------------------




function init(Node,value){
  function Handler(Node,value){
     this.Node=Node;
     var args=value.split(':');
     this.argsData=args;
     if(args.length==2){
        this.type=args[0];
        this.spot_id=args[1];
        this.doc_id='';
     }
      if(args.length==3){
        this.type=args[0];
        this.spot_id=args[1];
        this.doc_id=args[2];
     }
       if(args.length>3){
        this.type=args[0];
        this.spot_id=args[1];
        this.doc_id=args[2];
        this.argsData=args;
     }

       this.init();
  }  


  Handler.prototype={
      init:function(){
           switch(this.type){
      case 'help':
      this.load();
      break;
      case 'profilecomplete':
      if(W.U.isOK(W.U.ProfileCheckWizard)){
         W.U.ProfileCheckWizard.init(this.Node); 
      }
      break;    
    }

   
      },
      load:function(){
      var LoadData=this.GetLoadData();
      var _this=this;
       W.U.ajax({
                url:LoadData.url,
                data: LoadData.data,
                context: this,
                type: 'POST',
                beforeSend: function () {
           W.U.AddDom(_this.Node,'<div class="block al-c">'+W.U.loading_svg(30,30,10)+'</div>','html');
              
                  
                },
                success: function (data) {
              LoadData.sucess(data);

                }

            });
           
      },
      GetLoadData:function(){
       var _this=this;
             var Data ={
        url:W.U.URL('ajax/f0/p0'),
        data:{form:'loadblockdata',f_value:{type:_this.type,spot_id:_this.spot_id,doc_id:_this.doc_id}},
   sucess:function(pagerdata,data){    
   
   }
 
    }
          var _this=this;
    switch(this.type){
      case 'help':
       Data.url=W.C.Setting.docHELP;
       Data.data={
           wg:W.A.page.AcessData.visit_data.wg,
           AppId:_this.doc_id
       };
        Data.sucess=function(data){         W.U.AddDom(_this.Node,data,'html');        }
      break;  
    }
      

   return Data;

      }


  };



new Handler(Node,value);
}



   //DynamicSpotManager
   W.U.DSM={
    init:init
   };

})(wowrol);