/*
* 
*/
;(function(W){
   "use strict";
function defaultStep(){
   var data={
     title:'',
     substitle:'',
     titleicon:'',
     bodyhtml:'',
     objectdata:{},
     onbodyhtmlRander:W.U.noop,
     onback:function(){return true;},
     onskip:function(){return true;},
     oncontinue:function(){ return true;},
     onTabclick:function(){return true;},
     isSkipbutton:true,
     iscontinuebutton:true,
     isbackbutton:true,
     Textcontinuebutton:'continue'
   };


 return W.U.clone(data);   
}
function defaultSetting(){
   var data={
       name:W.U.uId(),
       horizotalTabWidth:100,
       orientation:'auto',
       pager:'mainpage',
       backblock:'blockFront',
       isPage:false
   };


 return W.U.clone(data);   
}





function Handler(Node,options,steps){
    this.Node=Node;
    this.steps=[];
    for(var q in steps){
       this.steps.push(W.U.extend(defaultStep(),steps[q]));  


    }

    //for node cretion
   
     for(var q in  this.steps){
    this.steps[q].node=  document.createElement('div'); 
     this.steps[q].index=q;
this.Node.appendChild(this.steps[q].node);
 this.steps[q].TemplateNode=this.initStepTemplate(this.steps[q].node);


    }

    //--
    this.options=W.U.extend(defaultSetting(),options);
      

    this.activeIndex=0;
    this.totalIndex=this.steps.length;


    this.init();
  W.U.intentdata.add('Stepper.'+this.options.name, this);  
}

Handler.prototype.init=function(){
   this.orientation=this.getOrientation();
   this.SetComponentForVartical('initset');
  this.SetComponentForVartical('activeStep');
W.U.console(this);


}





Handler.prototype.initStepTemplate=function(node){
      var ch;
           ch='<div class="block ">';
        ch+='<div data-block="header" ></div>';
         ch+='<div data-block="content" ></div>';
          ch+='<div data-block="actionbutton" ></div>';
       

          ch+='</div>';
             var  mainBlock=W.U.Rander(ch);

    var TemplateNode={
     header:W.U('[data-block="header"]',mainBlock[0])[0],
     content:W.U('[data-block="content"]',mainBlock[0])[0],
     actionbutton:W.U('[data-block="actionbutton"]',mainBlock[0])[0]   
    }
    


       W.U.Setview(node,mainBlock,'html');

       return TemplateNode;

}

Handler.prototype.SetComponentForVartical=function(name){
  var _this=this;
    switch(name){
    case 'initset':
      for(var q in  this.steps){

 this.steps[q].TemplateNode=this.initStepTemplate(this.steps[q].node);

    W.U.AttachDom(this.steps[q].TemplateNode.header,W.T.Stepper.stepheader(this.steps[q],false, this.activeIndex),'html',function(){
              var mainBlock=this.mainBlock;
           W.U.attrclick('[data-ontabclick]',mainBlock[0],function(){
             var index=this['data-ontabclick'];
             _this.ontabclick(index);
         });
        
    });
    }

    
    break;
    case 'activeStep':
  
    var activeStep=this.steps[ this.activeIndex];
    if(W.U.isOK(activeStep)){
    var html=(W.U.isFunction(activeStep.bodyhtml))? activeStep.bodyhtml.call(this,activeStep):activeStep.bodyhtml;
     W.U.AttachDom(activeStep.TemplateNode.header,W.T.Stepper.stepheader(activeStep,true, this.activeIndex),'html',function(){
            
    });
     W.U.AttachDom(activeStep.TemplateNode.content,html,'html',function(){
        
    });
     W.U.AttachDom(activeStep.TemplateNode.actionbutton,W.T.Stepper.actionbutton(activeStep,true, this.activeIndex),'html',function(){
        var mainBlock=this.mainBlock;
         W.U.attrclick('[data-onskip]',mainBlock[0],function(){
             var index=this['data-onskip'];
             _this.onskip(index);
         });
         W.U.attrclick('[data-onback]',mainBlock[0],function(){
             var index=this['data-onback'];
             _this.onback(index);
         });
         W.U.attrclick('[data-oncontinue]',mainBlock[0],function(){
             var index=this['data-oncontinue'];
             _this.oncontinue(index);
         });
    });
    }
   

    break;
    
        
    }


}


Handler.prototype.getOrientation=function(){
var Orientation =1;//0 for horizontal 1=> vartical

return Orientation;
}

Handler.prototype.onskip=function(index){
  index=W.U.intval(index);
   var activeStep=this.steps[index];
   index++;
    var nextindex=( index>this.totalIndex)?this.totalIndex:index;
      this.activeIndex=nextindex;
      
     
 (activeStep.onskip())?this.init():'';
}
Handler.prototype.onback=function(index){
      index=W.U.intval(index);
   var activeStep=this.steps[index];
   index--;
    var nextindex=( index>0)?0:index;
      this.activeIndex=nextindex;

 (activeStep.onback())?this.init():'';
}

Handler.prototype.oncontinue=function(index){
      index=W.U.intval(index);
    var activeStep=this.steps[index];
   index++;
    var nextindex=( index>this.totalIndex)?this.totalIndex:index;
      this.activeIndex=nextindex;




 (activeStep.oncontinue.bind(this)())?this.init():'';
}

Handler.prototype.ontabclick=function(index){
      index=W.U.intval(index);
    var nextindex=( index>this.totalIndex)?this.totalIndex:index;
   
if(this.activeIndex>nextindex){
    var activeStep=this.steps[index];


       this.activeIndex=nextindex;
var ret=activeStep.onTabclick();
 (ret)?this.init():'';
}


}



/*
@des ragister  a stepper
@param {object} settings - 
@param {array} steps - 
*/

function   init(Node,settings,steps){


  return new Handler(Node,settings,steps);  ;
}
/*
@des switch the step
@call W.U.Stepper.goto()
@param {string} name - the name of stepper
@param {int} index  - id of step   
*/
function goto(name,index,data){
   var stepper=  W.U.intentdata.get('Stepper.'+name);  
      var nextindex=( index>stepper.totalIndex)?null:index;
      if(W.U.isOK(nextindex)){
    stepper.activeIndex=index;
   

    stepper.steps[stepper.activeIndex].objectdata=data;
  
    stepper.init();
    }else{
        console.warn('the supplied index = '+nextindex+' is not valid in '+name);
    }

}

W.U.Stepper={
    init:init,
    goto:goto

};


   })(wowrol);