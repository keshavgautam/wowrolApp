/*
KK component 
*/
;(function(W){
var braketMatch=/{(.*?)}/g;  
var EventArr=['kk-click','kk-input']; 
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function() {
          target.detachEvent(eventType, callback);
        }
      };
    }
  },

  /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  capture: function(target, eventType, callback) {
    if (!target.addEventListener) {
         console.error(
          'Attempted to listen to events during the capture phase on a ' +
          'browser that does not support the capture phase. Your application ' +
          'will not receive some events.'
        );
      return {
        remove: W.U.noop
      };
    } else {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function() {
          target.removeEventListener(eventType, callback, true);
        }
      };
    }
  }
};
/**/
var U={
   createDataMap:function(x,map,keystr){
      if(!W.U.isOK(map)) map={};
     if(!W.U.isOK(keystr)) keystr='';
     
       for(var q in x){
   
   
       var backstr=((keystr!='')?(keystr+'.'+q):q);
           if(W.U.isObject(x[q])){
           
           U.createDataMap(x[q],map,backstr);     
               
                
           }else if(W.U.isArray(x[q])){
      
         U.createDataMap(x[q],map,backstr);      
           }else{
              
           map[backstr]={value:x[q],mapId:[]};    
           }
       }

       return map;
   } ,
   ChangedDataMap:{},
   NewDataMap:{},
   RemoveDataMap:{},
   MeasureChanges:function(){

          for(var i in this.datamap){

         if(W.U.isOK(this.PreviousDataMap[i])){
            if(this.datamap[i].value!=this.PreviousDataMap[i].value){
               this.ChangedDataMap[i]=this.datamap[i];
          }   
          }else{
              this.NewDataMap[i]=this.datamap[i];
          }    
         
         
          
      }



    for(var i in this.PreviousDataMap){
       
          if(!W.U.isOK(this.datamap[i])){
              this.RemoveDataMap[i]=this.PreviousDataMap[i];
          }    
         
          
      }
   },
   UpdateChanges:function(){
      var _this=this;
      this.ChangedDataMap={}; 
      this.RemoveDataMap={};
      this.MeasureChanges();

      for(var q in this.RemoveDataMap){
          
      }
      for(var q in this.ChangedDataMap){
          
      }
     
   },
   ReplaceDataInText:function(Node){
      var _this=this;
 var  text=Node.textContent,kkid=Node.kkid;
 text = text.replace(braketMatch, function (match) {  
         
            var val=match; 

          match= match.substring(1, (match.length-1));
          var matchList=match.split('.');
 //find (matchList,_this); 
        if(W.U.isOK(_this.datamap[match])){
            val=_this.datamap[match].value;
            _this.datamap[match].mapId.push(kkid);
        }
         return val; });

function find (arr,obj){
     var val=''; 
     for(var q in arr){

     if(W.U.isOK(obj[arr[q]])){
        obj=obj[arr[q]];
           
     }

     }
     

     if(W.U.isString(obj)){
       val=  obj;
     }
    return  val;
}
      return text;  
   }
};

/**/
function FindfunctionInValue(value){
    var fn=W.U.noop;
    var _this=this;
     var func=_this[value];
     if(W.U.isOK(func)){
       if(W.U.isFunction(func)){
         fn=func.bind(_this); 
     }
     }
   

    return fn; 
}

/*
@des parse
*/

function Parse(Node,id){
     var _this=this;

    if(W.U.isOK(Node)){
       for (var i = 0; i < Node.length; i++) {
  var   dataAttrsToDelete = [];
             id=(W.U.isOK(id))?id+'.'+i:'0';
          
            this.map[id] =Node[i];
            Node[i]['kkid']=id;


          var   dataAttrs =Node[i].attributes;
          //------------
             if(W.U.isOK(dataAttrs)){
              for (var a=0; a<dataAttrs.length; a++) {

                 if(W.U.isOK(dataAttrs[a])){
          if( W.U.iskeyInArray(dataAttrs[a].name,EventArr)){
               
               var valueFunction=this.FindfunctionInValue(dataAttrs[a].value);
               switch(dataAttrs[a].name){
                   case 'kk-click':
                   EventListener.listen(Node[i],'click',valueFunction);
                   break;
                   case 'kk-input':
                   EventListener.listen(Node[i],'input',valueFunction);
                   break;
               }


               dataAttrsToDelete.push(dataAttrs[a].name);
          }           
                 }  

              }     
             }

     for(var q in dataAttrsToDelete){
    
       if(Node[i].nodeType!=3){

          Node[i].removeAttribute(dataAttrsToDelete[q]);   
       }
   
     }        
          //---------
          if(Node[i].nodeType == 3){
            
             Node[i].textContent=this.ReplaceDataInText(Node[i]);
          }
           

       //--work on nodename
     if (Node[i].childNodes.length>0) {
            this.Parse(Node[i].childNodes,id);
            }       
       
              
       }    
    }


      
             
         return Node;   

}
/*
*/
function Update(){
  var   _this=this;
  _this.PreviousDataMap=_this.datamap;
  _this.datamap= _this.createDataMap(_this.data);
  _this.IsUpdate=true;
 
 var func=_this.constructor;
  InsertComponent(_this.root,func,'replaceWith');
}


/**/

function DefaultClassSpecification(){
    var data={name:W.U.uId(),
              W:W,
              data:{},
              map:{},
              datamap:{},
              IsUpdate:false,
              PreviousDataMap:{},
              root:null,
              onBeforeInsert:W.U.noop,
              onAfterInsert:W.U.noop,
              Update:Update,
              onUpdate:W.U.noop,
              onAfterUpdate:W.U.noop,
              template:'<div></div>',
              SafeCopytemplate:'<div></div>',
              Parse:Parse,
              render:W.U.noop,
              FindfunctionInValue:FindfunctionInValue
             };
         W.U.extend(data,U);
    return W.U.clone(data);
}
 /*
@param Constructor
*/   
    function createClass (spec){
  var  Constructor=function(){};
 Constructor.prototype.constructor = Constructor;       
 spec=W.U.extend(DefaultClassSpecification(),spec);
 for(var methodName in spec){
      Constructor.prototype[methodName]=spec[methodName];
 }

 return Constructor;
    }

/*
@param Constructor
*/
    function renderComponent (func){
    
     func.prototype.template=func.prototype.render();
  var template=func.prototype.template;
    
      func.prototype.datamap= func.prototype.createDataMap(func.prototype.data);


        var Nodes=func.prototype.Parse(W.U.Rander(template));
     
        func.prototype.root=func.prototype.map['0'];
    


     return Nodes;
 
    }

   
/**



*/

function InsertComponent(Node,func,type){
    if(!func.prototype.IsUpdate){
    func.prototype.onBeforeInsert();
    func.prototype.root=Node;
      W.U.Setview(Node,renderComponent (func),type);
   
    }else{
     
      
      W.U.Setview(Node,renderComponent (func),type);  
        
    }



  func.prototype.onAfterUpdate();
}

    W.KK={
      createClass: createClass,
      renderComponent:renderComponent,
      InsertComponent:InsertComponent 
    }
})(wowrol);