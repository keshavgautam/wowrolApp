


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

/*
@des shorthand name
*/
var isOK = W.U.isOK,
    isFunction  =W.U.isFunction,
    isArray  =W.U.isArray,
    isObject = W.U.isObject,
    isString = W.U.isString,
    noop  = W.U.noop,
    isEmpty =W.U.isEmpty,
    intval  =W.U.intval,
    uId =W.U.uId,
    clone =W.U.clone,
    count= W.U.ObjectLength,
    iskeyInArray = W.U.iskeyInArray,
    isvalueInArray=W.U.isvalueInArray,
    trim  = W.U.trim,
    toString          = Object.prototype.toString,
    getPrototypeOf    = Object.getPrototypeOf;
var NODE_TYPE_ELEMENT = 1;
var NODE_TYPE_ATTRIBUTE = 2;
var NODE_TYPE_TEXT = 3;
var NODE_TYPE_COMMENT = 8;
var NODE_TYPE_DOCUMENT = 9;
var NODE_TYPE_DOCUMENT_FRAGMENT = 11;

/**
 * Determine if a value is an object with a null prototype
 *
 * @returns {boolean} True if `value` is an `Object` with a null prototype
 */
function isBlankObject(value) {
  return value !== null && typeof value === 'object' && !getPrototypeOf(value);
}
var lowercase = function(string) {return isString(string) ? string.toLowerCase() : string;};
/**/

function DefaultClassSpecification(){
    var data={name:W.U.uId(),
             controller:W.U.noop,
             data:{},
             old_data:{},
             root:null,
             scope_depth:0,
             is_updatelooprunning:false,
             update_source:'',
             To_updateList:[],
             UpdateView:UpdateView,
             directive:[],
             onBeforeInsert:W.U.noop,
             onAfterUpdate:W.U.noop,
             IsUpdate:false,
             listenccbk:[],
             render:W.U.noop
             };
       //  W.U.extend(data,U);
    return W.U.clone(data);
}
 /*
@param Constructor
*/   
    function createModule ( method){
  var  Constructor=function(){};
 Constructor.prototype.constructor = Constructor;       
 spec=DefaultClassSpecification();
 
 W.U.extend(spec,method);

 for(var methodName in spec){
      Constructor.prototype[methodName]=spec[methodName];
 }
 //------Directive extend will in future

 




 return Constructor;
    }

/*
@param Constructor
*/
    function renderComponent (func){ 
 
 
   func.prototype.controller.apply(func.prototype.data);
   WrapInTrackFunction(func.prototype.data,TrackFunction.bind(func.prototype) , func.prototype.data);
 

   //func.prototype.directive
   if(count(func.prototype.directive)>0){
      for(var q in func.prototype.directive){
      if(isOK(q['name'])&&q['fn']){
          RagisterDirective(q['name'], q['fn']);
      }
    
 }  
   }


     func.prototype.template=func.prototype.render();
     var template=func.prototype.template;
 
    var er =W.U.Rander(template);
  var Nodes=Parse(er,func.prototype);

    return Nodes;
    }
/*
@
*/
function InsertComponent(Node,func,type){
       if(!func.prototype.IsUpdate){
    func.prototype.onBeforeInsert();
    func.prototype.root=Node;
 
      W.U.Setview(Node,renderComponent (func),type);
      func.prototype.IsUpdate = true;
      if(func.prototype.update_source==''){
          func.prototype.UpdateView();  

      }
    
      //listing callback
      try{
     if(W.U.count(func.prototype.listenccbk)>0){
         var listenccbk= func.prototype.listenccbk;
      
         for(var q in listenccbk){
             W.U.ccbk.Add(W.U.Page, listenccbk[q][0], function (data) {
             
                 if(listenccbk[q][1](data)){
                      func.prototype.update_source = 'KK_outer_update';
                        func.prototype.controller.apply(func.prototype.data);
                       func.prototype.UpdateView();  
                 };
             });
         }
     }
     }catch(e){
     debugger;
     }
    }else{
      if(func.prototype.update_source==''){
          func.prototype.UpdateView();  
      }
      
    
        
    }



    if(func.prototype.update_source==''){
      copy(func.prototype.data,func.prototype.old_data);

      //W.U.ccbk.Run(W.U.Page,'KK_update_`sdsdf`', data);
      W.U.ccbk.Add('KK_update_' + func.prototype.name, function (data) {
      
          func.prototype.update_source = 'KK_outer_update';
          func.prototype.controller.apply(func.prototype.data);
          func.prototype.UpdateView();


      });
   //W.U.ccbk.Run(W.U.Page,'KK_update_data_`sdsdf`', data);
         W.U.ccbk.Add('KK_update_data_' + func.prototype.name, function (data) {
             
      
             W.U.extend(func.prototype.data, data);
             func.prototype.update_source = 'KK_outer_update_data';
             func.prototype.UpdateView();


         });
         AddInIntent(func.prototype);
      }



}
/*
@
*/
function AddInIntent(_this) {
    W.U.intentdata.add(_this.name,_this.data);
}
