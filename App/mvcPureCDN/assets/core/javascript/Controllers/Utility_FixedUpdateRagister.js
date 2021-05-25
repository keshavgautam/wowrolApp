;(function (W) {
     "use strict";
     

     //responce setter function
W.I.ActionBarAlert=0;
// we have to show message notification by by pass current systne when we are at checkin page or message page
W.I.BypassMessageCount=0;

/////////----------

function FixedUpdateRagister(Node,objname){
    
    function Handler(){
       this.Node=Node;
       this.objname=objname;
       this.init(); 

    }
    Handler.prototype.init=function(){

  var updaterData={data:{name:"",init:{}},
  Node: this.Node,
  onsucess:W.U.noop,
  essential:false
  };

        switch(this.objname){
       case 'notialert':
       updaterData.data= {name:"notialert",init:{wait:0}};
       updaterData.essential=true;
       updaterData.onsucess= function(data){ 
      this.data.init.wait=60;  
      W.I.ActionBarAlert+=W.U.intval(data);
      var ret=(data<0)?'':data; 
      W.U.AddDom(this.Node,ret,'html');
          };
    
       break;
       case 'checkinalert':
       updaterData.data= {name:"checkinalert",init:{wait:0}};
       updaterData.essential=true;
   updaterData.onsucess= function(data){
            this.data.init.wait=60;  
         W.I.ActionBarAlert+=W.U.intval(data);           
    var ret=(data<0)?'':data; 
      W.U.AddDom(this.Node,ret,'html');    };
       break;
       case 'reqalert':
       updaterData.data= {name:"reqalert",init:{wait:0}};
       updaterData.essential=true;
   updaterData.onsucess= function(data){
            this.data.init.wait=60; 
         W.I.ActionBarAlert+=W.U.intval(data);            
    var ret=(data<0)?'':data; 
      W.U.AddDom(this.Node,ret,'html');    };

       break;
         case 'orderalert':
       updaterData.data= {name:"orderalert",init:{wait:0}};
       updaterData.essential=true;
       updaterData.onsucess= function(data){ 
            this.data.init.wait=60; 
           W.I.ActionBarAlert+=W.U.intval(data);         
    var ret=(data<0)?'':data; 
      W.U.AddDom(this.Node,ret,'html');    };

       break;
        case 'msgalert':
       updaterData.data= {name:"msgalert",init:{wait:0}};
       updaterData.essential=true;
   updaterData.onsucess= function(data){   
      this.data.init.wait=60;  
   
      W.I.ActionBarAlert+=W.U.intval(data);
    var ret=(data<0)?'':data; 
      W.U.AddDom(this.Node,ret,'html');  
   

      
         };

       break;
      
         case 'ActionBarAlert':
       updaterData.data= {name:"ActionBarAlert",init:{wait:0}};
       updaterData.essential=true;
      updaterData.onsucess= function(data){ 
      var _this=this;
   setTimeout(function(){    
   data =W.I.ActionBarAlert;
    var ret=(data<0)?'':data; 
      W.U.AddDom(_this.Node,ret,'html'); W.I.ActionBarAlert=0;  },100);
   
       };
       break;

        }
      


 W.U.ccbk.Add('pageloaded',function(){
    // Always call inside from function 
    W.U.Updater.AddInRail('main',updaterData);
    W.U.Updater.AddInRail('activityIU',updaterData);
    });


    }




    new Handler(Node,objname)
}

     

W.U.FixedUpdateRagister= FixedUpdateRagister;

        } )(wowrol);