// shri ganeshya nam
// jay shree hanuman
// jay shree ram
// jay keshavray ji maharaj

wowrol = {
    M:{},//Modules
    C:{},//Controllers
    A:{},//apps
    V:[],//VIEWS
    U:function(){},//UTILITY
    T:{},//template
    L:{},//language
    F:{}//froms
};
/*
* Basic Utility
*/
; (function(W){
   "use strict";
    
  
 W.U=function(selector,context){
      
      return new  W.U.fn.init(selector,context);
  }

  W.U.fn = W.U.prototype={
     Constructer: W.U,
     isFunction:function(obj) {return Object.prototype.toString.call(obj) === '[object Function]'; },
     isArray:function(obj){ return Object.prototype.toString.call(obj) === '[object Array]'; },
     isPlainObject:function(obj){ return Object.prototype.toString.call(obj) === '[object Object]' && !(browser.msie8 && obj && obj.item !== 'undefined' && obj.namedItem !== 'undefined'); },
     type: function( obj ) {
	
		return typeof obj;
	}


 }
 W.U.extend = W.U.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && ! W.U.fn.isFunction( target ) ) {
		target = {};
	}

	// extend U itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && (  W.U.fn.isPlainObject( copy ) ||
					( copyIsArray =  W.U.fn.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src &&  W.U.fn.isArray( src ) ? src : [];

					} else {
						clone = src &&  W.U.fn.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] =  W.U.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}
   
	// Return the modified object
	return target;
};

 //find

 W.U.find=function(Selecter,context){
var Context=( typeof (context)== "undefined")?document:context;
   var bro=W.U.browser;
   if(bro.msie6||bro.msie7||bro.msie8||bro.msie9||(! W.U.feature.querySelectorAll)){
   
       var select=Sizzle(Selecter,context);
  }else{
        
       var select=Context.querySelectorAll(Selecter);
  }
   
   
  
    return select;
}

 var root,init;
init =  W.U.fn.init =function(selector,context){
    var ret=this;
     	var match, elem;
   context=(typeof context==  "undefined")?document:context;
    ret.context = context;
	ret.selector = selector;
    var Nodes=W.U.find(selector,context);
    if(Nodes!=null){
       ret.length = Nodes.length;  
    }else{
         ret.length = 0;
    }
   
   
	   W.U.extend(ret,Nodes);
   
    return ret;
 }
 
 init.prototype= W.U.fn;



 W.U.fn.extend({
    html:function(Node){
     var elem = this[ 0 ] || {};

    
   
     if(Node !=''){
           elem.innerHTML='';
         if(typeof  Node !='string'){

     if(typeof  Node.length !='undefined'){
         for(var q=0;q<Node.length;q++){
          elem.appendChild(Node[q]); 
       }
     }else{
         elem.appendChild(Node);  
     }
      
      }else{
             elem.innerHTML=Node;
      } 
      }else{
          
          return elem.innerHTML;
      }
       
    },
    find: W.U.find,
    ParseHTML:function (html) {
 var doc = document.createElement("div");
        doc.innerHTML = html;
        return doc;

       
    }  ,
   lister:function(type,el, listener, useCapture) {
       if(typeof el != 'null'&&typeof el != 'undefined'){
                el.addEventListener ?
                el.addEventListener(type, listener, !!useCapture) :
                el.attachEvent && el.attachEvent('on' + type, listener, !!useCapture);
}else{
    console.warn(' Try to bind event of type '+type+' on ');
       console.log(el);
    console.warn('--------||-------');
}

            },
event:function (name,element,data){

     var ev;
     element= (typeof(element)=='undefined')?document:element;
      if ('CustomEvent' in window && typeof window.CustomEvent === 'function') {
        ev = new Event(name, {
          'bubbles': true, 'cancelable': false
        });
          ev.data=data;
      element.dispatchEvent(ev);
      } else {
           
            if (typeof document.createEvent!='undefined') {
               ev = document.createEvent('Events');
     
        ev.initEvent(name, true, false);    
          ev.data=data;
      element.dispatchEvent(ev);
            }else{
$(element).on(name,data);
           }  //form IE<9
           

  };
    
     
      }
      
      
      
    
});


 






 var  queue = {
        List: [],
        Add: function (x) {
            var getType = {};
          
            if (x && getType.toString.call(x) === '[object Function]') {

               W.U.queue.List.push(x);
            }


        },
        Run: function () {
            var  Control=   wowrol.Controllers;
          
            var len =W.U.queue.List.length,
    index = 0;
  
            for (; index < len; index++) {
      
              W.U.queue.List[index].call();
            }
           
       W.U.queue.List=[];
           
        }
    };

   //---------------------------------
 function defaultAppData(x) {
              var defaultdata={
            AppId:'',
            AppName:'',
            Junction:{},
            AppTitle:'',
            AppView:{},
            res:[]
            };
   
      
      W.U.extend(defaultdata,x);
            
            return  defaultdata; 
        }

 

 /*   W.U=  {
     defaultAppData:defaultAppData,
     Page:document.getElementById('page'),
     Parse:Parse,
     Insert:Insert,
     queue:queue
    };*/
 W.U.queue=queue;


  W.U.defaultAppData=defaultAppData;

})(wowrol);